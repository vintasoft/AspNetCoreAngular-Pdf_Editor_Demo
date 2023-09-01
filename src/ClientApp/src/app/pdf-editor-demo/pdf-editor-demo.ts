import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { BlockUiDialog } from "../dialogs/block-ui-dialog";
import { PreviouslyUploadedFilesDialog } from '../dialogs/previously-uploaded-files-dialog';
import { ImageViewerSettingsDialog } from '../dialogs/image-viewer-settings-dialog';
import { ThumbnailViewerSettingsDialog } from '../dialogs/thumbnail-viewer-settings-dialog';
import { ErrorMessageDialog } from '../dialogs/error-message-dialog';
import { PdfInteractiveFieldDialog } from '../dialogs/pdf-interactive-field-dialog';
import { PdfRedactionMarkSettingsDialog } from '../dialogs/pdf-redaction-mark-settings-dialog';
import { PdfImageResourceDialog } from '../dialogs/pdf-image-resource-dialog';
import { ImageSelectionDialog } from '../dialogs/image-selection-dialog';
import { PdfRedactionMarkAppearanceDialog } from '../dialogs/pdf-redaction-mark-appearance-dialog';
import { OpenPdfFileHelper } from './open-pdf-file-helper';
import { PrintImagesHelper } from './print-images-helper';
import { UpdateInteractiveFormAndDownloadPdfDocumentHelper } from './update-interactive-form-and-download-pdf-document-helper';
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

  // Dialog that allows to view and change settings of image viewer.
  _imageViewerSettingsDialog: ImageViewerSettingsDialog | null = null;

  // Dialog that allows to block UI.
  _blockUiDialog: BlockUiDialog | null = null;



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



  // === "File" toolbar, "Previously uploaded files" button ===

  /**
   * Creates UI button for showing the list with previously uploaded files.
   */
  __createPreviousUploadFilesButton() {
    // create the button that allows to show a dialog with previously uploaded image files and select image file
    let button: Vintasoft.Imaging.UI.UIElements.WebUiButtonJS = new Vintasoft.Imaging.UI.UIElements.WebUiButtonJS({
      cssClass: "uploadedFilesList",
      title: "Previously uploaded files",
      localizationId: "previousUploadFilesButton",
      onClick: _pdfEditorDemoComponent.__previousUploadFilesButton_clicked
    });
    return button;
  }

  /**
   * "Previously uploaded files" button is clicked.
   */
  __previousUploadFilesButton_clicked(event: any, uiElement: any) {
    let docViewer: Vintasoft.Imaging.DocumentViewer.WebDocumentViewerJS = uiElement.get_RootControl() as Vintasoft.Imaging.DocumentViewer.WebDocumentViewerJS;
    if (docViewer != null) {
      let dlg: PreviouslyUploadedFilesDialog = new PreviouslyUploadedFilesDialog(_pdfEditorDemoComponent.modalService);
      dlg.open();
      dlg.okButtonClickedEvent.subscribe(receivedEntry => {
        if (receivedEntry.fileId != null && receivedEntry.fileId != '') {
          try {
            if (_pdfEditorDemoComponent._openPdfFileHelper != null) {
              // open PDF file
              _pdfEditorDemoComponent._openPdfFileHelper.openPdfFile(receivedEntry.fileId);
            }
          }
          catch (ex: any) {
            _pdfEditorDemoComponent.__showErrorMessage(ex.message);
          }
        }
      });
    }
  }



  // === "View" toolbar ===

  /**
   * Creates UI button for showing image viewer settings dialog.
   */
  __createImageViewerSettingsButton() {
    // create the button that allows to show a dialog with image viewer settings
    return new Vintasoft.Imaging.UI.UIElements.WebUiButtonJS({
      cssClass: "vsdv-imageViewerSettingsButton",
      title: "Show Image Viewer Settings",
      localizationId: "imageViewerSettingsButton",
      onClick: _pdfEditorDemoComponent.__imageViewerSettingsButton_clicked
    });
  }

  /**
   * "Show Image Viewer Settings" button is clicked.
   */
  __imageViewerSettingsButton_clicked(event: any, uiElement: any) {
    let docViewer: Vintasoft.Imaging.DocumentViewer.WebDocumentViewerJS = uiElement.get_RootControl() as Vintasoft.Imaging.DocumentViewer.WebDocumentViewerJS;
    if (docViewer != null) {
      let imageViewer: Vintasoft.Imaging.UI.WebImageViewerJS = docViewer.get_ImageViewer();
      if (imageViewer != null) {
        if (_pdfEditorDemoComponent._imageViewerSettingsDialog == null) {
          _pdfEditorDemoComponent._imageViewerSettingsDialog = new ImageViewerSettingsDialog(_pdfEditorDemoComponent.modalService);
          _pdfEditorDemoComponent._imageViewerSettingsDialog.imageViewer = imageViewer;
        }
        _pdfEditorDemoComponent._imageViewerSettingsDialog.open();
      }
    }
  }


  /**
   * Creates UI button for showing thumbnail viewer settings dialog.
   */
  __createThumbnailViewerSettingsButton() {
    // create the button that allows to show a dialog with image viewer settings
    return new Vintasoft.Imaging.UI.UIElements.WebUiButtonJS({
      cssClass: "vsui-thumbnailViewerSettingsButton",
      title: "Show Thumbnail Viewer Settings",
      localizationId: "thumbnailViewerSettingsButton",
      onClick: _pdfEditorDemoComponent.__thumbnailViewerSettingsButton_clicked
    });
  }

  /**
   * "Show Thumbnail Viewer Settings" button is clicked.
   */
  __thumbnailViewerSettingsButton_clicked(event: object, uiElement: Vintasoft.Imaging.UI.UIElements.WebUiElementJS) {
    let docViewer: Vintasoft.Imaging.DocumentViewer.WebDocumentViewerJS = uiElement.get_RootControl() as Vintasoft.Imaging.DocumentViewer.WebDocumentViewerJS;
    if (docViewer != null) {
      let thumbnailViewer: Vintasoft.Imaging.UI.WebThumbnailViewerJS = docViewer.get_ThumbnailViewer();
      if (thumbnailViewer != null) {
        let dlg: ThumbnailViewerSettingsDialog = new ThumbnailViewerSettingsDialog(_pdfEditorDemoComponent.modalService);
        dlg.thumbnailViewer = thumbnailViewer;
        dlg.open();
      }
    }
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



  // === "Redaction" toolbar ===

  /**
   * Creates UI button that allows to show "Mark full pages for redaction" dialog.
   */
  __createPdfPageRedactionMarkButton() {
    // create the button that allows to show a dialog with previously uploaded image files and select image file
    let button: Vintasoft.Imaging.UI.UIElements.WebUiButtonJS = new Vintasoft.Imaging.UI.UIElements.WebUiButtonJS({
      cssClass: "vsdv-pdfPageRedactionMarkButton",
      title: "Mark full pages for redaction",
      localizationId: "pdfPageRedactionMarkButton",
      onClick: _pdfEditorDemoComponent.__pdfPageRedactionMarkButton_clicked
    });
    return button;
  }

  /**
   * "Mark full pages for redaction" button is clicked.
   */
  __pdfPageRedactionMarkButton_clicked(event: any, uiElement: any) {
    let docViewer: Vintasoft.Imaging.DocumentViewer.WebDocumentViewerJS = uiElement.get_RootControl() as Vintasoft.Imaging.DocumentViewer.WebDocumentViewerJS;
    if (docViewer != null) {
      let dlg: ImageSelectionDialog = new ImageSelectionDialog(_pdfEditorDemoComponent.modalService);
      dlg.docViewer = docViewer;
      dlg.open();
    }
  }


  /**
   * Creates UI button that allows to show "PDF redaction mark appearance" dialog.
   */
  __createPdfRedactionMarkAppearanceButton() {
    // create the button that allows to show a dialog with previously uploaded image files and select image file
    let button: Vintasoft.Imaging.UI.UIElements.WebUiButtonJS = new Vintasoft.Imaging.UI.UIElements.WebUiButtonJS({
      cssClass: "vsdv-pdfRedactionMarkAppearanceButton",
      title: "PDF redaction mark appearance",
      localizationId: "pdfRedactionMarkAppearanceButton",
      onClick: _pdfEditorDemoComponent.__pdfRedactionMarkAppearanceButton_clicked
    });
    return button;
  }

  /**
   * "PDF redaction mark appearance" button is clicked.
   */
  __pdfRedactionMarkAppearanceButton_clicked(event: any, uiElement: any) {
    let docViewer: Vintasoft.Imaging.DocumentViewer.WebDocumentViewerJS = uiElement.get_RootControl() as Vintasoft.Imaging.DocumentViewer.WebDocumentViewerJS;
    if (docViewer != null) {
      let dlg: PdfRedactionMarkAppearanceDialog = new PdfRedactionMarkAppearanceDialog(_pdfEditorDemoComponent.modalService);
      dlg.docViewer = docViewer;
      dlg.open();
    }
  }



  // === Init UI ===

  /**
   * Registers custom UI elements in "WebUiElementsFactoryJS".
   */
  __registerNewUiElements() {
    let printImagesHelper: PrintImagesHelper = new PrintImagesHelper(this.modalService);
    let updateInteractiveFormAndDownloadPdfDocumentHelper: UpdateInteractiveFormAndDownloadPdfDocumentHelper =
      new UpdateInteractiveFormAndDownloadPdfDocumentHelper(this.__showErrorMessage);

    // register the "Previously uploaded files" button in web UI elements factory
    Vintasoft.Imaging.UI.UIElements.WebUiElementsFactoryJS.registerElement("previousUploadFilesButton", this.__createPreviousUploadFilesButton);
    // override the "Download image" button in web UI elements factory
    Vintasoft.Imaging.UI.UIElements.WebUiElementsFactoryJS.registerElement("downloadFileButton", updateInteractiveFormAndDownloadPdfDocumentHelper.createDownloadPdfFileWithFilledFieldsButton);
    // override the "Print images" button in web UI elements factory
    Vintasoft.Imaging.UI.UIElements.WebUiElementsFactoryJS.registerElement("printImagesButton", printImagesHelper.createPrintImagesButton);

    // register the "Image viewer settings" button in web UI elements factory
    Vintasoft.Imaging.UI.UIElements.WebUiElementsFactoryJS.registerElement("imageViewerSettingsButton", this.__createImageViewerSettingsButton);

    // register the "Thumbnail viewer settings" button in web UI elements factory
    Vintasoft.Imaging.UI.UIElements.WebUiElementsFactoryJS.registerElement("thumbnailViewerSettingsButton", this.__createThumbnailViewerSettingsButton);

    // register the "TextSelectionTool" button in web UI elements factory
    Vintasoft.Imaging.UI.UIElements.WebUiElementsFactoryJS.registerElement("textSelectionToolButton", this.__createNavigationAndTextSelectionToolButton);

    // register the "Mark full pages for redaction" button in web UI elements factory
    Vintasoft.Imaging.UI.UIElements.WebUiElementsFactoryJS.registerElement("pdfPageRedactionMarkButton", this.__createPdfPageRedactionMarkButton);
    // register the "PDF redaction mark appearance" button in web UI elements factory
    Vintasoft.Imaging.UI.UIElements.WebUiElementsFactoryJS.registerElement("pdfRedactionMarkAppearanceButton", this.__createPdfRedactionMarkAppearanceButton);
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

      // add the "Previous uploaded files" button to the menu panel
      fileMenuPanelItems.insertItem(1, "previousUploadFilesButton");
    }

    // get the "View" menu panel
    let viewMenuPanel: Vintasoft.Imaging.UI.Panels.WebUiPanelJS = items.getItemByRegisteredId("viewMenuPanel") as Vintasoft.Imaging.UI.Panels.WebUiPanelJS;
    // if menu panel is found
    if (viewMenuPanel != null) {
      // get items of menu panel
      let viewMenuPanelItems: Vintasoft.Imaging.UI.UIElements.WebUiElementCollectionJS = viewMenuPanel.get_Items();
      // add the "Image viewer settings" button to the menu panel
      viewMenuPanelItems.insertItem(viewMenuPanelItems.get_Count() - 1, "imageViewerSettingsButton");
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
      textSearchPanel.set_CreatePageResultHeaderContentCallback(_pdfEditorDemoComponent.__createPageSearchResultHeaderContent);
      Vintasoft.Shared.subscribeToEvent(textSearchPanel, "stateChanged", _pdfEditorDemoComponent.__textSearchPanel_stateChanged);
      sidePanelItems.addItem(textSearchPanel);


      let pdfImageResourceExtractionPanel: Vintasoft.Imaging.DocumentViewer.Panels.WebUiPdfImageResourceExtractionPanelJS = Vintasoft.Imaging.UI.UIElements.WebUiElementsFactoryJS.createElementById("pdfImageResourceExtractionPanel") as Vintasoft.Imaging.DocumentViewer.Panels.WebUiPdfImageResourceExtractionPanelJS;
      pdfImageResourceExtractionPanel.set_ContentImageDescriptionCallback(_pdfEditorDemoComponent.__getDescriptionForContentImage);
      Vintasoft.Shared.subscribeToEvent(pdfImageResourceExtractionPanel, "imageDataReceived", _pdfEditorDemoComponent.__pdfImageResourceExtractionPanel_imageDataReceived);
      Vintasoft.Shared.subscribeToEvent(pdfImageResourceExtractionPanel, "stateChanged", _pdfEditorDemoComponent.__pdfImageResourceExtractionPanel_stateChanged);
      sidePanelItems.addItem(pdfImageResourceExtractionPanel);


      let pdfInteractiveFormFieldsPanel: Vintasoft.Imaging.DocumentViewer.Panels.WebUiPdfInteractiveFormFieldsPanelJS = Vintasoft.Imaging.UI.UIElements.WebUiElementsFactoryJS.createElementById("pdfInteractiveFormFieldsPanel") as Vintasoft.Imaging.DocumentViewer.Panels.WebUiPdfInteractiveFormFieldsPanelJS;
      pdfInteractiveFormFieldsPanel.set_CreateInteractionFieldContentCallback(_pdfEditorDemoComponent.__createInteractionFieldContent);
      pdfInteractiveFormFieldsPanel.set_CreatePageFieldsHeaderContentCallback(_pdfEditorDemoComponent.__createPageFieldsHeaderContent);
      Vintasoft.Shared.subscribeToEvent(pdfInteractiveFormFieldsPanel, "stateChanged", _pdfEditorDemoComponent.__pdfInteractiveFormFieldsPanel_stateChanged);
      sidePanelItems.addItem(pdfInteractiveFormFieldsPanel);


      let pdfRedactionMarksPanel: Vintasoft.Imaging.DocumentViewer.Panels.WebUiPdfRedactionMarkListPanelJS = Vintasoft.Imaging.UI.UIElements.WebUiElementsFactoryJS.createElementById("pdfRedactionMarkListPanel") as Vintasoft.Imaging.DocumentViewer.Panels.WebUiPdfRedactionMarkListPanelJS;
      // set the callback for creating record for redaction mark
      pdfRedactionMarksPanel.set_CreateRedactionMarkContentCallback(_pdfEditorDemoComponent.__createContentForRedactionMarkRecord);
      pdfRedactionMarksPanel.set_CreateCollectionHeaderContentCallback(_pdfEditorDemoComponent.__createContentForRedactionMarksCollectionHeader);
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

  /**
   * Returns UI elements, which display information about image page search result.
   * @param image Image, where text was searched.
   * @param imageIndex The zero-based index of the image in the collection.
   * @param searchResults Search result.
   */
  __createPageSearchResultHeaderContent(image: HTMLImageElement, imageIndex: number, searchResults: any) {
    return [new Vintasoft.Imaging.UI.UIElements.WebUiLabelElementJS({ text: "Page # " + (imageIndex + 1), css: { cursor: "pointer" } })];
  }



  // === Init UI, PDF image-resource extraction panel ===

  /**
   * Image data is received by PDF image-resource extraction panel.
   */
  __pdfImageResourceExtractionPanel_imageDataReceived(event: any, contentImage: Vintasoft.Imaging.Pdf.WebContentImageJS) {
    let dlg: PdfImageResourceDialog = new PdfImageResourceDialog(_pdfEditorDemoComponent.modalService);
    dlg.image = contentImage;
    dlg.open();
  }

  /**
   * PDF image-resource extraction panel state is changed.
   */
  __pdfImageResourceExtractionPanel_stateChanged(event: any, eventArgs: any) {
    _pdfEditorDemoComponent.__activateToolWhenPanelBecomeActive(this, eventArgs.newState, "PdfImageExtractorTool");
  }

  /**
   * Returns description for specified content image.
   * @param contentImage Content image.
   * @returns Description.
  */
  __getDescriptionForContentImage(contentImage: Vintasoft.Imaging.Pdf.WebContentImageJS) {
    // get image resource
    let resource: Vintasoft.Imaging.Pdf.WebPdfImageResourceJS = contentImage.get_Resource();
    // get image size
    let imageSize: any = resource.get_Size();
    // create text
    let text: string = "#" + resource.get_ObjectNumber() + ", " + imageSize.width + "x" + imageSize.height + "px, ";
    text += "Compression=" + resource.get_Compression() + ", " + resource.get_Length() + " bytes";
    // return text
    return text;
  }



  // === Init UI, PDF interactive form fields panel ===

  /**
   * State of PDF interactive form fields panel is changed.
   */
  __pdfInteractiveFormFieldsPanel_stateChanged(event: any, eventArgs: any) {
    _pdfEditorDemoComponent.__activateToolWhenPanelBecomeActive(this, eventArgs.newState, "PdfInteractiveFormTool");
  }

  /**
   * Returns UI elements, which display information about PDF interactive field.
   * @param field PDF interactive field.
   */
  __createInteractionFieldContent(field: Vintasoft.Imaging.Pdf.WebPdfInteractiveFormFieldJS) {
    let name: string = field.get_PartialName();
    if (name === "")
      name = field.get_Type();

    let label: Vintasoft.Imaging.UI.UIElements.WebUiLabelElementJS = new Vintasoft.Imaging.UI.UIElements.WebUiLabelElementJS({ text: name });

    // create annotation properties button
    let settingsButton: Vintasoft.Imaging.UI.UIElements.WebUiButtonJS = new Vintasoft.Imaging.UI.UIElements.WebUiButtonJS({
      cssClass: "fieldSettingsButton",
      title: "Interactive field properties",
      onClick: function () {
        _pdfEditorDemoComponent.__showInteractiveFieldPropertyGrid(field);
      }
    });

    return [label, settingsButton];
  }

  /**
   * Returns UI elements, which display information about page header when information about interactive fields is grouped by pages.
   * @param image Image, where text was searched.
   * @param imageIndex The zero-based index of the image in the collection.
   */
  __createPageFieldsHeaderContent(image: HTMLImageElement, imageIndex: number) {
    return [new Vintasoft.Imaging.UI.UIElements.WebUiLabelElementJS({ text: "Page # " + (imageIndex + 1), css: { cursor: "pointer" } })];
  }

  /**
   * Shows the property grid dialog with information about interactive field.
   * @param field The interactive field, which should be shown in property grid dialog.
   */
  __showInteractiveFieldPropertyGrid(field: Vintasoft.Imaging.Pdf.WebPdfInteractiveFormFieldJS) {
    let blackList: Array<string> = ["get_Parent", "get_PdfDocument", "get_ObjectNumber"];
    // create the property grid with information about interactive field properties

    let dlg: PdfInteractiveFieldDialog = new PdfInteractiveFieldDialog(_pdfEditorDemoComponent.modalService);
    dlg.field = field;
    dlg.objShortName = "";
    dlg.objFullName = "";
    dlg.blackList = blackList;
    dlg.open();
  }



  // === Init UI, PDF redaction marks panel ===

  /**
   * State of PDF redaction marks panel is changed.
   */
  __pdfRedactionMarksPanel_stateChanged(event: object, eventArgs: any) {
    _pdfEditorDemoComponent.__activateToolWhenPanelBecomeActive(this, eventArgs.newState, "PdfRemoveContentTool");
  }

  /**
   * Returns UI elements, which will display information about redaction mark.
   * @param redactionMark Redaction mark.
   * @param collection Collection of redaction marks.
   */
  __createContentForRedactionMarkRecord(redactionMark: Vintasoft.Imaging.Pdf.WebPdfPageRedactionMarkJS, collection: Vintasoft.Imaging.Pdf.WebPdfRedactionMarkCollectionJS) {
    // get mark type
    let markName: object = redactionMark.get_MarkType();
    // create label
    let nameLabel: Vintasoft.Imaging.UI.UIElements.WebUiLabelElementJS = new Vintasoft.Imaging.UI.UIElements.WebUiLabelElementJS({ text: markName.toString(), cssClass: "mark-type" });
    // create redaction mark properties button
    let redactionMarkSettingsButton: Vintasoft.Imaging.UI.UIElements.WebUiButtonJS = new Vintasoft.Imaging.UI.UIElements.WebUiButtonJS({
      cssClass: "redactionMarkSettingsButton",
      title: "Redaction mark properties",
      onClick: function () {
        _pdfEditorDemoComponent.__showRedactionMarkPropertyGrid(redactionMark);
      }
    });

    // return elements
    return [nameLabel, redactionMarkSettingsButton];
  }

  /**
   * Returns UI elements, which will display information about redaction marks collection.
   * @param collection Redaction marks collection.
   * @param index Zero-based index of redaction marks collection.
   */
  __createContentForRedactionMarksCollectionHeader(collection: Vintasoft.Imaging.Pdf.WebPdfRedactionMarkCollectionJS, index: number) {
    let text: string = "Page #" + (index + 1) + " [" + collection.get_Count() + "]";
    return [new Vintasoft.Imaging.UI.UIElements.WebUiLabelElementJS({ text: text })];
  }

  /**
   * Shows the property grid dialog with information about redaction mark.
   * @param redactionMark Redaction mark, which should be shown in property grid dialog.
   */
  __showRedactionMarkPropertyGrid(redactionMark: Vintasoft.Imaging.Pdf.WebPdfPageRedactionMarkJS) {
    // create the property grid with information about annotation properties
    let dlg: PdfRedactionMarkSettingsDialog = new PdfRedactionMarkSettingsDialog(_pdfEditorDemoComponent.modalService);
    dlg.field = redactionMark;
    dlg.open();
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
    let panTool: Vintasoft.Imaging.UI.VisualTools.WebPanToolJS = docViewer.getVisualToolById("PanTool");
    let panCursor: string = "url('Content/Cursors/CloseHand.cur'), auto";

    panTool.set_Cursor("pointer");
    panTool.set_ActionCursor(panCursor);

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
