import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { BlockUiDialog } from "../dialogs/block-ui-dialog";
import { ErrorMessageDialog } from '../dialogs/error-message-dialog';
import { OpenPdfFileHelper } from './open-pdf-file-helper';
import { WebUriActionExecutor } from './web-uri-action-executor';


var _pdfEditorDemoComponent: PdfEditorDemoComponent;


@Component({
  selector: 'pdf-editor-demo',
  templateUrl: './pdf-editor-demo.html',
})
export class PdfEditorDemoComponent {

  // Document viewer.
  _docViewer: Vintasoft.Imaging.DocumentViewer.WebDocumentViewerJS | null = null;

  // Helps to open PDF file.
  _openPdfFileHelper: OpenPdfFileHelper | null = null;

  // Dialog that allows to block UI.
  _blockUiDialog: BlockUiDialog | null = null;

  _pdfImageResourceDialog: Vintasoft.Imaging.DocumentViewer.Dialogs.WebUiPdfImageResourceDialogJS | null = null;



  constructor(public modalService: NgbModal, private httpClient: HttpClient) {
    _pdfEditorDemoComponent = this;
  }



  /**
   * Component is initializing.
   */
  ngOnInit() {
    // get identifier of current HTTP session
    this.httpClient.get<any>('api/Session/GetSessionId').subscribe(data => {
      // set the session identifier
      Vintasoft.Shared.WebImagingEnviromentJS.set_SessionId(data.sessionId);

      // specify web services, which should be used by Vintasoft Web Document Viewer
      Vintasoft.Shared.WebServiceJS.defaultFileService = new Vintasoft.Shared.WebServiceControllerJS("vintasoft/api/MyVintasoftFileApi");
      Vintasoft.Shared.WebServiceJS.defaultImageCollectionService = new Vintasoft.Shared.WebServiceControllerJS("vintasoft/api/MyVintasoftImageCollectionApi");
      Vintasoft.Shared.WebServiceJS.defaultImageService = new Vintasoft.Shared.WebServiceControllerJS("vintasoft/api/MyVintasoftImageApi");
      Vintasoft.Shared.WebServiceJS.defaultPdfService = new Vintasoft.Shared.WebServiceControllerJS("vintasoft/api/MyVintasoftPdfApi");

      this.__registerNewUiElements();

      // create the document viewer settings
      let docViewerSettings: Vintasoft.Imaging.DocumentViewer.WebDocumentViewerSettingsJS = new Vintasoft.Imaging.DocumentViewer.WebDocumentViewerSettingsJS("documentViewerContainer", "documentViewer");

      // specify that document viewer should show "Export and download file" button instead of "Download file" button
      docViewerSettings.set_CanExportAndDownloadFile(true);
      docViewerSettings.set_CanDownloadFile(false);

      // initialize main menu of document viewer
      this.__initMenu(docViewerSettings);

      // initialize side panel of document viewer
      this.__initSidePanel(docViewerSettings);

      // create the document viewer
      this._docViewer = new Vintasoft.Imaging.DocumentViewer.WebDocumentViewerJS(docViewerSettings);

      // subscribe to the fileAuthenticationRequest event of document viewer
      Vintasoft.Shared.subscribeToEvent(this._docViewer, "fileAuthenticationRequest", this.__docViewer_fileAuthenticationRequest);
      // subscribe to the fileAuthenticationRequest event of document viewer
      Vintasoft.Shared.subscribeToEvent(this._docViewer, "fileOpened", this.__docViewer_fileOpened);
      // subscribe to the "warningOccured" event of document viewer
      Vintasoft.Shared.subscribeToEvent(this._docViewer, "warningOccured", this.__docViewer_warningOccured);
      // subscribe to the asyncOperationStarted event of document viewer
      Vintasoft.Shared.subscribeToEvent(this._docViewer, "asyncOperationStarted", this.__docViewer_asyncOperationStarted);
      // subscribe to the asyncOperationFinished event of document viewer
      Vintasoft.Shared.subscribeToEvent(this._docViewer, "asyncOperationFinished", this.__docViewer_asyncOperationFinished);
      // subscribe to the asyncOperationFailed event of document viewer
      Vintasoft.Shared.subscribeToEvent(this._docViewer, "asyncOperationFailed", this.__docViewer_asyncOperationFailed);

      this.__initializeVisualTools(this._docViewer);

      // get the image viewer of document viewer
      let imageViewer1: Vintasoft.Imaging.UI.WebImageViewerJS = this._docViewer.get_ImageViewer();
      // specify that image viewer must show images in the single continuous column mode
      imageViewer1.set_DisplayMode(new Vintasoft.Imaging.WebImageViewerDisplayModeEnumJS("SingleContinuousColumn"));
      // specify that image viewer must show images in the fit width mode
      imageViewer1.set_ImageSizeMode(new Vintasoft.Imaging.WebImageSizeModeEnumJS("FitToWidth"));

      // create the progress image
      let progressImage: HTMLImageElement = new Image();
      progressImage.src = window.location + "Images/fileUploadProgress.gif";
      // specify that the image viewer must use the progress image for indicating the image loading progress
      imageViewer1.set_ProgressImage(progressImage);

      // get the visual tool, which allows to select text
      let visualTool: Vintasoft.Imaging.UI.VisualTools.WebVisualToolJS = this._docViewer.getVisualToolById("DocumentNavigationTool,TextSelectionTool");
      // set the visual tool as active visual tool in image viewer
      this._docViewer.set_CurrentVisualTool(visualTool);

      // copy the default file to the uploaded image files directory and open the file
      this._openPdfFileHelper = new OpenPdfFileHelper(this.modalService, this._docViewer, this.__showErrorMessage);
      this._openPdfFileHelper.openDefaultPdfFile();
    });
  }



  // === "Tools" toolbar ===

  /**
   * Creates UI button for activating the visual tool, which allows to navigate and select text in image viewer.
   */
  __createNavigationAndTextSelectionToolButton() {
    return new Vintasoft.Imaging.DocumentViewer.UIElements.WebUiVisualToolButtonJS({
      cssClass: "vsdv-tools-textSelectionToolButton",
      title: "Text Selection",
      localizationId: "textSelectionToolButton"
    }, "DocumentNavigationTool,TextSelectionTool");
  }



  // === Init UI ===

  /**
   * Registers custom UI elements in "WebUiElementsFactoryJS".
   */
  __registerNewUiElements() {
    // register the "TextSelectionTool" button in web UI elements factory
    Vintasoft.Imaging.UI.UIElements.WebUiElementsFactoryJS.registerElement("textSelectionToolButton", this.__createNavigationAndTextSelectionToolButton);
  }

  /**
   * Initializes main menu of document viewer.
   * @param docViewerSettings Settings of document viewer.
   */
  __initMenu(docViewerSettings: Vintasoft.Imaging.DocumentViewer.WebDocumentViewerSettingsJS) {
    // get items of document viewer
    let items: Vintasoft.Imaging.UI.UIElements.WebUiElementCollectionJS = docViewerSettings.get_Items();

    let uploadFileButton: Vintasoft.Imaging.UI.UIElements.WebUiUploadFileButtonJS = items.getItemByRegisteredId("uploadFileButton") as Vintasoft.Imaging.UI.UIElements.WebUiUploadFileButtonJS;
    if (uploadFileButton != null)
      uploadFileButton.set_FileExtensionFilter(".pdf");

    // get the main menu of document viewer
    let mainMenu: Vintasoft.Imaging.UI.Panels.WebUiPanelContainerJS = items.getItemByRegisteredId("mainMenu") as Vintasoft.Imaging.UI.Panels.WebUiPanelContainerJS;
    // if main menu is found
    if (mainMenu != null) {
      // get items of main menu
      let mainMenuItems: Vintasoft.Imaging.UI.UIElements.WebUiElementCollectionJS = mainMenu.get_Items();

      // get the "Visual tools" menu panel
      let toolsSubmenu: Vintasoft.Imaging.UI.Panels.WebUiPanelJS = mainMenuItems.getItemByRegisteredId("toolsMenuPanel") as Vintasoft.Imaging.UI.Panels.WebUiPanelJS;
      // if menu panel is found
      if (toolsSubmenu != null) {
        let toolsSubmenuItems: Vintasoft.Imaging.UI.UIElements.WebUiElementCollectionJS = toolsSubmenu.get_Items() as Vintasoft.Imaging.UI.UIElements.WebUiElementCollectionJS;

        toolsSubmenuItems.clearItems();

        toolsSubmenuItems.addItem("panToolButton");
        toolsSubmenuItems.addItem("textSelectionToolButton");
        toolsSubmenuItems.addItem("pdfImageExtractorToolButton");
        toolsSubmenuItems.addItem("pdfInteractiveFormToolButton");
      }

      // add "PdfRedactionMarks" menu panel
      mainMenuItems.addItem("pdfRedactionMenuPanel");
    }

    // get the "File" menu panel
    let fileMenuPanel: Vintasoft.Imaging.DocumentViewer.Panels.WebUiFileToolbarPanelJS = items.getItemByRegisteredId("fileToolbarPanel") as Vintasoft.Imaging.DocumentViewer.Panels.WebUiFileToolbarPanelJS;
    // if menu panel is found
    if (fileMenuPanel != null) {
      // get items of file menu panel
      let fileMenuPanelItems: Vintasoft.Imaging.UI.UIElements.WebUiElementCollectionJS = fileMenuPanel.get_Items();

      // get the "Upload file" button
      let uploadFileButton: Vintasoft.Imaging.UI.UIElements.WebUiUploadFileButtonJS = fileMenuPanelItems.getItem(0) as Vintasoft.Imaging.UI.UIElements.WebUiUploadFileButtonJS;
      // specify that file must be uploaded but not opened when "Upload file" button is clicked, file will be opened later
      uploadFileButton.set_OpenFile(false);
    }
  }

  /**
   * Initializes side panel of document viewer.
   * @param docViewerSettings Settings of document viewer.
   */
  __initSidePanel(docViewerSettings: Vintasoft.Imaging.DocumentViewer.WebDocumentViewerSettingsJS) {
    // get items of document viewer
    let items: Vintasoft.Imaging.UI.UIElements.WebUiElementCollectionJS = docViewerSettings.get_Items();

    let sidePanel: Vintasoft.Imaging.UI.Panels.WebUiSidePanelJS = items.getItemByRegisteredId("sidePanel") as Vintasoft.Imaging.UI.Panels.WebUiSidePanelJS;
    if (sidePanel != null) {
      let sidePanelItems: Vintasoft.Imaging.UI.UIElements.WebUiElementCollectionJS = sidePanel.get_PanelsCollection();
      sidePanelItems.addItem("pdfBookmarksPanel");


      let textSelectionPanel = Vintasoft.Imaging.UI.UIElements.WebUiElementsFactoryJS.createElementById("textSelectionPanel");
      Vintasoft.Shared.subscribeToEvent(textSelectionPanel, "stateChanged", _pdfEditorDemoComponent.__textSelectionPanel_stateChanged);
      sidePanelItems.addItem(textSelectionPanel);


      let textSearchPanel: Vintasoft.Imaging.DocumentViewer.Panels.WebUiTextSearchPanelJS = Vintasoft.Imaging.UI.UIElements.WebUiElementsFactoryJS.createElementById("textSearchPanel") as Vintasoft.Imaging.DocumentViewer.Panels.WebUiTextSearchPanelJS;
      Vintasoft.Shared.subscribeToEvent(textSearchPanel, "stateChanged", _pdfEditorDemoComponent.__textSearchPanel_stateChanged);
      sidePanelItems.addItem(textSearchPanel);


      let pdfImageResourceExtractionPanel: Vintasoft.Imaging.DocumentViewer.Panels.WebUiPdfImageResourceExtractionPanelJS = Vintasoft.Imaging.UI.UIElements.WebUiElementsFactoryJS.createElementById("pdfImageResourceExtractionPanel") as Vintasoft.Imaging.DocumentViewer.Panels.WebUiPdfImageResourceExtractionPanelJS;
      Vintasoft.Shared.subscribeToEvent(pdfImageResourceExtractionPanel, "imageDataReceived", _pdfEditorDemoComponent.__pdfImageResourceExtractionPanel_imageDataReceived);
      Vintasoft.Shared.subscribeToEvent(pdfImageResourceExtractionPanel, "stateChanged", _pdfEditorDemoComponent.__pdfImageResourceExtractionPanel_stateChanged);
      sidePanelItems.addItem(pdfImageResourceExtractionPanel);


      let pdfInteractiveFormFieldsPanel: Vintasoft.Imaging.DocumentViewer.Panels.WebUiPdfInteractiveFormFieldsPanelJS = Vintasoft.Imaging.UI.UIElements.WebUiElementsFactoryJS.createElementById("pdfInteractiveFormFieldsPanel") as Vintasoft.Imaging.DocumentViewer.Panels.WebUiPdfInteractiveFormFieldsPanelJS;
      Vintasoft.Shared.subscribeToEvent(pdfInteractiveFormFieldsPanel, "stateChanged", _pdfEditorDemoComponent.__pdfInteractiveFormFieldsPanel_stateChanged);
      sidePanelItems.addItem(pdfInteractiveFormFieldsPanel);


      let pdfRedactionMarksPanel: Vintasoft.Imaging.DocumentViewer.Panels.WebUiPdfRedactionMarkListPanelJS = Vintasoft.Imaging.UI.UIElements.WebUiElementsFactoryJS.createElementById("pdfRedactionMarkListPanel") as Vintasoft.Imaging.DocumentViewer.Panels.WebUiPdfRedactionMarkListPanelJS;
      // set the callback for creating record for redaction mark
      Vintasoft.Shared.subscribeToEvent(pdfRedactionMarksPanel, "stateChanged", _pdfEditorDemoComponent.__pdfRedactionMarksPanel_stateChanged);
      sidePanelItems.addItem(pdfRedactionMarksPanel);
    }

    // get the thumbnail viewer panel of document viewer
    let thumbnailViewerPanel: Vintasoft.Imaging.DocumentViewer.Panels.WebUiThumbnailViewerPanelJS = items.getItemByRegisteredId("thumbnailViewerPanel") as Vintasoft.Imaging.DocumentViewer.Panels.WebUiThumbnailViewerPanelJS;
    // if panel is found
    if (thumbnailViewerPanel != null)
      // subscribe to the "actived" event of the thumbnail viewer panel of document viewer
      Vintasoft.Shared.subscribeToEvent(thumbnailViewerPanel, "activated", _pdfEditorDemoComponent.__thumbnailsPanelActivated);
  }

  /**
   * Activates the visual tool when panel becomes active.
   * @param panel UI panel.
   * @param panelState Panel state.
   * @param toolId ID of visual tool.
   */
  __activateToolWhenPanelBecomeActive(panel: any, panelState: any, toolId: string) {
    if (panelState.get_Name() === "active") {
      let docViewer: Vintasoft.Imaging.DocumentViewer.WebDocumentViewerJS = panel.get_RootControl() as Vintasoft.Imaging.DocumentViewer.WebDocumentViewerJS;
      let tool: Vintasoft.Imaging.UI.VisualTools.WebVisualToolJS = docViewer.getVisualToolById(toolId);
      docViewer.set_CurrentVisualTool(tool);
    }
  }



  // === Init UI, Text selection panel ===

  /**
   * Text selection panel state is changed.
   */
  __textSelectionPanel_stateChanged(event: any, eventArgs: any) {
    _pdfEditorDemoComponent.__activateToolWhenPanelBecomeActive(this, eventArgs.newState, "DocumentNavigationTool,TextSelectionTool");
  }



  // === Init UI, Text search panel ===

  /**
   * Text search panel state is changed.
   */
  __textSearchPanel_stateChanged(event: any, eventArgs: any) {
    _pdfEditorDemoComponent.__activateToolWhenPanelBecomeActive(this, eventArgs.newState, "DocumentNavigationTool,TextSelectionTool");
  }



  // === Init UI, PDF image-resource extraction panel ===

  /**
   * Image data is received by PDF image-resource extraction panel.
   */
  __pdfImageResourceExtractionPanel_imageDataReceived(event: any, contentImage: Vintasoft.Imaging.Pdf.WebContentImageJS) {
    if (_pdfEditorDemoComponent._docViewer == null)
      return;

    // if previous image processing dialog exists
    if (_pdfEditorDemoComponent._pdfImageResourceDialog != null) {
      // remove dialog from web document viewer
      _pdfEditorDemoComponent._docViewer.get_Items().removeItem(_pdfEditorDemoComponent._pdfImageResourceDialog);
      // clear link to dialog
      _pdfEditorDemoComponent._pdfImageResourceDialog = null;
    }

    // create dialog to view the PDF image resource info
    _pdfEditorDemoComponent._pdfImageResourceDialog = new Vintasoft.Imaging.DocumentViewer.Dialogs.WebUiPdfImageResourceDialogJS(contentImage);
    // add dialog to the document viewer
    _pdfEditorDemoComponent._docViewer.get_Items().addItem(_pdfEditorDemoComponent._pdfImageResourceDialog);
    // show dialog
    _pdfEditorDemoComponent._pdfImageResourceDialog.show();
  }

  /**
   * PDF image-resource extraction panel state is changed.
   */
  __pdfImageResourceExtractionPanel_stateChanged(event: any, eventArgs: any) {
    _pdfEditorDemoComponent.__activateToolWhenPanelBecomeActive(this, eventArgs.newState, "PdfImageExtractorTool");
  }



  // === Init UI, PDF interactive form fields panel ===

  /**
   * State of PDF interactive form fields panel is changed.
   */
  __pdfInteractiveFormFieldsPanel_stateChanged(event: any, eventArgs: any) {
    _pdfEditorDemoComponent.__activateToolWhenPanelBecomeActive(this, eventArgs.newState, "PdfInteractiveFormTool");
  }



  // === Init UI, PDF redaction marks panel ===

  /**
   * State of PDF redaction marks panel is changed.
   */
  __pdfRedactionMarksPanel_stateChanged(event: object, eventArgs: any) {
    _pdfEditorDemoComponent.__activateToolWhenPanelBecomeActive(this, eventArgs.newState, "PdfRemoveContentTool");
  }



  // Init UI, thumbnails panel

  /**
   * Thumbnail viewer panel of document viewer is activated.
   */
  __thumbnailsPanelActivated(event: any, eventArgs: any) {
    let uiElement: Vintasoft.Imaging.UI.UIElements.WebUiElementJS = event.target;
    let docViewer: Vintasoft.Imaging.DocumentViewer.WebDocumentViewerJS = uiElement.get_RootControl() as Vintasoft.Imaging.DocumentViewer.WebDocumentViewerJS;
    let thumbnailViewer: Vintasoft.Imaging.UI.WebThumbnailViewerJS = docViewer.get_ThumbnailViewer();
    if (thumbnailViewer != null) {
      // create the progress image
      let progressImage: HTMLImageElement = new Image();
      progressImage.src = window.location + "Images/fileUploadProgress.gif";
      // specify that the thumbnail viewer must use the progress image for indicating the thumbnail loading progress
      thumbnailViewer.set_ProgressImage(progressImage);

      // additional bottom space for text with page number under thumbnail
      let textCaptionHeight: number = 18;
      let padding: any = thumbnailViewer.get_ThumbnailPadding();
      padding[2] += textCaptionHeight
      thumbnailViewer.set_ThumbnailPadding(padding);
      thumbnailViewer.set_DisplayThumbnailCaption(true);
    }
  }



  // === Visual Tools ===

  /**
   * Initializes visual tools.
   * @param docViewer The document viewer.
   */
  __initializeVisualTools(docViewer: Vintasoft.Imaging.DocumentViewer.WebDocumentViewerJS) {
    // get navigation tool
    let documentNavigationTool: Vintasoft.Imaging.UI.VisualTools.WebDocumentNavigationToolJS = docViewer.getVisualToolById("DocumentNavigationTool") as Vintasoft.Imaging.UI.VisualTools.WebDocumentNavigationToolJS;
    // create navigation action executor
    let nagivationActionExecutor: Vintasoft.Imaging.WebNavigationActionExecutorJS = new Vintasoft.Imaging.WebNavigationActionExecutorJS();
    // create URI action executor
    let uriActionExecutor: WebUriActionExecutor = new WebUriActionExecutor();
    // create composite action executor
    let compositeActionExecutor: Vintasoft.Imaging.WebPageContentActionCompositeExecutorJS = new Vintasoft.Imaging.WebPageContentActionCompositeExecutorJS([uriActionExecutor, nagivationActionExecutor]);

    // use composite action executer in document navigation tool
    documentNavigationTool.set_ActionExecutor(compositeActionExecutor);
  }



  // === Document viewer events ===

  /**
   * Warning is occured in document viewer.
   */
  __docViewer_warningOccured(event: any, eventArgs: any) {
    _pdfEditorDemoComponent.__showErrorMessage(eventArgs.message);
  };

  /**
   * Asynchronous operation is started in document viewer.
   */
  __docViewer_asyncOperationStarted(event: any, data: any) {
    // get description of asynchronous operation
    let description: string = data.description;
    // for current operations
    if (description === "Image prepared to print" || description === "Get text region"
      || description === "Get PDF bookmarks" || description === "Get links"
      || description === "Get content images" || description === "Get interactive form") {
      // do not block UI
    }
    else {
      // block UI
      _pdfEditorDemoComponent.__blockUI(data.description);
    }
  }

  /**
   * Asynchronous operation is finished in document viewer.
   */
  __docViewer_asyncOperationFinished(event: any, data: any) {
    // unblock UI
    _pdfEditorDemoComponent.__unblockUI();
  }

  /**
   * Asynchronous operation is failed in document viewer.
   */
  __docViewer_asyncOperationFailed(event: any, data: any) {
    // get description of asynchronous operation
    let description: string = data.description;
    // get additional information about asynchronous operation
    let additionalInfo: any = data.data;
    // if additional information exists
    if (additionalInfo != null)
      _pdfEditorDemoComponent.__showErrorMessage(additionalInfo);
    // if additional information does NOT exist
    else
      _pdfEditorDemoComponent.__showErrorMessage(description + ": unknown error.");
  }

  /**
   * Document viewer sends a request for file authentication.
   */
  __docViewer_fileAuthenticationRequest(event: object, eventArgs: any) {
    if (_pdfEditorDemoComponent._openPdfFileHelper == null)
      return;

    // specify that processed the event and web document viewer does not need to show standard password dialog
    eventArgs.handled = true;

    // open document password dialog
    _pdfEditorDemoComponent._openPdfFileHelper.showPasswordDialog(eventArgs.fileId);
  }

  /**
   * File is opened in document viewer.
   */
  __docViewer_fileOpened(event: object, data: any) {
    if (_pdfEditorDemoComponent._openPdfFileHelper == null)
      return;

    // open the PDF document in image viewer
    _pdfEditorDemoComponent._openPdfFileHelper.openPdfDocument(data.fileId, data.filePassword);
  }



  // === Utils ===

  /**
   * Blocks the UI. 
   * @param text Message that describes why UI is blocked.
   */
  __blockUI(text: string) {
    _pdfEditorDemoComponent._blockUiDialog = new BlockUiDialog(_pdfEditorDemoComponent.modalService);
    _pdfEditorDemoComponent._blockUiDialog.message = text;
    _pdfEditorDemoComponent._blockUiDialog.open();
  }

  /**
   Unblocks the UI.
  */
  __unblockUI() {
    if (_pdfEditorDemoComponent._blockUiDialog != null && _pdfEditorDemoComponent._blockUiDialog !== undefined)
      _pdfEditorDemoComponent._blockUiDialog.close();
  }

  /**
   * Shows an error message.
   * @param data Information about error.
   */
  __showErrorMessage(data: any) {
    _pdfEditorDemoComponent.__unblockUI();

    let dlg: ErrorMessageDialog = new ErrorMessageDialog(_pdfEditorDemoComponent.modalService);
    dlg.errorData = data;
    dlg.open();
  }

}
