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

  // PDF document editor.
  _pdfDocumentEditor: Vintasoft.Imaging.Pdf.UI.WebPdfDocumentEditorControlJS | null = null;

  // Helps to open PDF file.
  _openPdfFileHelper: OpenPdfFileHelper | null = null;

  // Dialog that allows to block UI.
  _blockUiDialog: BlockUiDialog | null = null;

  _pdfImageResourceDialog: Vintasoft.Imaging.Pdf.UI.Dialogs.WebUiPdfImageResourceDialogJS | null = null;



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

      // specify web services, which should be used by Vintasoft Web PDF Document Editor
      Vintasoft.Shared.WebServiceJS.defaultFileService = new Vintasoft.Shared.WebServiceControllerJS("vintasoft/api/MyVintasoftFileApi");
      Vintasoft.Shared.WebServiceJS.defaultImageCollectionService = new Vintasoft.Shared.WebServiceControllerJS("vintasoft/api/MyVintasoftImageCollectionApi");
      Vintasoft.Shared.WebServiceJS.defaultImageService = new Vintasoft.Shared.WebServiceControllerJS("vintasoft/api/MyVintasoftImageApi");
      Vintasoft.Shared.WebServiceJS.defaultPdfService = new Vintasoft.Shared.WebServiceControllerJS("vintasoft/api/MyVintasoftPdfApi");

      // create the PDF document editor settings
      let pdfDocumentEditorSettings: Vintasoft.Imaging.Pdf.UI.WebPdfDocumentEditorControlSettingsJS = new Vintasoft.Imaging.Pdf.UI.WebPdfDocumentEditorControlSettingsJS("pdfDocumentEditorContainer", "pdfDocumentEditor");

      // initialize side panel of PDF document editor
      this.__initSidePanel(pdfDocumentEditorSettings);

      // create the PDF document editor
      this._pdfDocumentEditor = new Vintasoft.Imaging.Pdf.UI.WebPdfDocumentEditorControlJS(pdfDocumentEditorSettings);

      // subscribe to the "warningOccured" event of PDF document editor
      Vintasoft.Shared.subscribeToEvent(this._pdfDocumentEditor, "warningOccured", this.__pdfDocumentEditor_warningOccured);
      // subscribe to the asyncOperationStarted event of PDF document editor
      Vintasoft.Shared.subscribeToEvent(this._pdfDocumentEditor, "asyncOperationStarted", this.__pdfDocumentEditor_asyncOperationStarted);
      // subscribe to the asyncOperationFinished event of PDF document editor
      Vintasoft.Shared.subscribeToEvent(this._pdfDocumentEditor, "asyncOperationFinished", this.__pdfDocumentEditor_asyncOperationFinished);
      // subscribe to the asyncOperationFailed event of PDF document editor
      Vintasoft.Shared.subscribeToEvent(this._pdfDocumentEditor, "asyncOperationFailed", this.__pdfDocumentEditor_asyncOperationFailed);
      // subscribe to the "imageDataReceived"" event of PDF document editor
      Vintasoft.Shared.subscribeToEvent(this._pdfDocumentEditor, "imageDataReceived", this.__pdfDocumentEditor_imageDataReceived);

      this.__initializeVisualTools(this._pdfDocumentEditor);

      // get the image viewer of PDF document editor
      let imageViewer1: Vintasoft.Imaging.UI.WebImageViewerJS = this._pdfDocumentEditor.get_ImageViewer();
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
      let visualTool: Vintasoft.Imaging.UI.VisualTools.WebVisualToolJS = this._pdfDocumentEditor.getVisualToolById("DocumentNavigationTool,TextSelectionTool,PanTool,ZoomTool");
      // set the visual tool as active visual tool in image viewer
      this._pdfDocumentEditor.set_CurrentVisualTool(visualTool);

      // copy the default file to the uploaded image files directory and open the file
      this._openPdfFileHelper = new OpenPdfFileHelper(this.modalService, this._pdfDocumentEditor, this.__showErrorMessage);
      this._openPdfFileHelper.openDefaultPdfFile();
    });
  }



  // === Init UI ===

  /**
 * Initializes side panel of document viewer.
 * @param pdfDocumentEditorSettings Settings of PDF document editor.
 */
  __initSidePanel(pdfDocumentEditorSettings: Vintasoft.Imaging.Pdf.UI.WebPdfDocumentEditorControlSettingsJS) {
    // get items of document viewer
    let items: Vintasoft.Imaging.UI.UIElements.WebUiElementCollectionJS = pdfDocumentEditorSettings.get_Items();

    // get the thumbnail viewer panel of document viewer
    let thumbnailViewerPanel: Vintasoft.Imaging.UI.Panels.WebUiThumbnailViewerPanelJS = items.getItemByRegisteredId("thumbnailViewerPanel") as Vintasoft.Imaging.UI.Panels.WebUiThumbnailViewerPanelJS;
    // if panel is found
    if (thumbnailViewerPanel != null)
      // subscribe to the "actived" event of the thumbnail viewer panel of document viewer
      Vintasoft.Shared.subscribeToEvent(thumbnailViewerPanel, "activated", _pdfEditorDemoComponent.__thumbnailsPanelActivated);
  }

  /**
   * Image data is received by PDF image-resource extraction panel.
   */
  __pdfDocumentEditor_imageDataReceived(event: any, contentImage: Vintasoft.Imaging.Pdf.WebContentImageJS) {
    if (_pdfEditorDemoComponent._pdfDocumentEditor == null)
      return;

    // if previous image processing dialog exists
    if (_pdfEditorDemoComponent._pdfImageResourceDialog != null) {
      // remove dialog from web PDF document editor
      _pdfEditorDemoComponent._pdfDocumentEditor.get_Items().removeItem(_pdfEditorDemoComponent._pdfImageResourceDialog);
      // clear link to dialog
      _pdfEditorDemoComponent._pdfImageResourceDialog = null;
    }

    // create dialog to view the PDF image resource info
    _pdfEditorDemoComponent._pdfImageResourceDialog = new Vintasoft.Imaging.Pdf.UI.Dialogs.WebUiPdfImageResourceDialogJS(contentImage);
    // add dialog to the PDF document editor
    _pdfEditorDemoComponent._pdfDocumentEditor.get_Items().addItem(_pdfEditorDemoComponent._pdfImageResourceDialog);
    // show dialog
    _pdfEditorDemoComponent._pdfImageResourceDialog.show();
  }

  /**
   * Thumbnail viewer panel of PDF document editor is activated.
   */
  __thumbnailsPanelActivated(event: any, eventArgs: any) {
    let uiElement: Vintasoft.Imaging.UI.UIElements.WebUiElementJS = event.target;
    let pdfDocumentEditorControl: Vintasoft.Imaging.Pdf.UI.WebPdfDocumentEditorControlJS = uiElement.get_RootControl() as Vintasoft.Imaging.Pdf.UI.WebPdfDocumentEditorControlJS;
    let thumbnailViewer: Vintasoft.Imaging.UI.WebThumbnailViewerJS = pdfDocumentEditorControl.get_ThumbnailViewer();
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
   * @param pdfDocumentEditor The PDF document editor.
   */
  __initializeVisualTools(pdfDocumentEditor: Vintasoft.Imaging.Pdf.UI.WebPdfDocumentEditorControlJS) {
    // get navigation tool
    let documentNavigationTool: Vintasoft.Imaging.UI.VisualTools.WebDocumentNavigationToolJS = pdfDocumentEditor.getVisualToolById("DocumentNavigationTool") as Vintasoft.Imaging.UI.VisualTools.WebDocumentNavigationToolJS;
    // create navigation action executor
    let nagivationActionExecutor: Vintasoft.Imaging.WebNavigationActionExecutorJS = new Vintasoft.Imaging.WebNavigationActionExecutorJS();
    // create URI action executor
    let uriActionExecutor: WebUriActionExecutor = new WebUriActionExecutor();
    // create composite action executor
    let compositeActionExecutor: Vintasoft.Imaging.WebPageContentActionCompositeExecutorJS = new Vintasoft.Imaging.WebPageContentActionCompositeExecutorJS([uriActionExecutor, nagivationActionExecutor]);

    // use composite action executer in document navigation tool
    documentNavigationTool.set_ActionExecutor(compositeActionExecutor);
  }



  // === PDF document editor events ===

  /**
   * Warning is occured in PDF document editor.
   */
  __pdfDocumentEditor_warningOccured(event: any, eventArgs: any) {
    _pdfEditorDemoComponent.__showErrorMessage(eventArgs.message);
  };

  /**
   * Asynchronous operation is started in PDF document editor.
   */
  __pdfDocumentEditor_asyncOperationStarted(event: any, data: any) {
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
   * Asynchronous operation is finished in PDF document editor.
   */
  __pdfDocumentEditor_asyncOperationFinished(event: any, data: any) {
    // unblock UI
    _pdfEditorDemoComponent.__unblockUI();
  }

  /**
   * Asynchronous operation is failed in PDF document editor.
   */
  __pdfDocumentEditor_asyncOperationFailed(event: any, data: any) {
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
