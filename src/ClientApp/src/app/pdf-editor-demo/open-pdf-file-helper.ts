import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * A helper that helps to open PDF file.
 */
export class OpenPdfFileHelper {

  _pdfDocumentEditorControl: Vintasoft.Imaging.Pdf.UI.WebPdfDocumentEditorControlJS;
  _showErrorMessageFunc: Function;



  constructor(private modalService: NgbModal, pdfDocumentEditorControl: Vintasoft.Imaging.Pdf.UI.WebPdfDocumentEditorControlJS, showErrorMessageFunc: Function) {
    this._pdfDocumentEditorControl = pdfDocumentEditorControl;
    this._showErrorMessageFunc = showErrorMessageFunc;
  }



  /**
   * Opens the default PDF file in image viewer.
   */
  openDefaultPdfFile() {
    var that = this;

    /**
     Default PDF file is NOT opened from default session folder.
     @param {object} data Information about error.
    */
    function __openDefaultPdfFileFromSessionFolder_error(data: any) {
      // copy the default PDF document from global folder to the session folder
      Vintasoft.Imaging.VintasoftFileAPI.copyFile("UploadedImageFiles/VintasoftImagingDemo.pdf", __copyDefaultPdfFileToSessionFolder_success, __copyDefaultPdfFileToSessionFolder_error);
    }

    /**
     Default PDF file is copied to the default session folder.
     @param {object} data Information about copied file.
    */
    function __copyDefaultPdfFileToSessionFolder_success(data: any) {
      // open PDF document
      that._pdfDocumentEditorControl.openFileWithAuthentication(data.fileId, __openPdfDocument_success, __openFile_error);
    }

    /**
     Default PDF file is NOT copied to the default session folder.
     @param {object} data Information about error.
    */
    function __copyDefaultPdfFileToSessionFolder_error(data: any) {
      that._showErrorMessageFunc(data);
    }

    /**
     Default PDF file is NOT copied to the default session folder.
     @param {object} data Information about error.
    */
    function __openFile_error(data: any) {
      that._showErrorMessageFunc(data);
    }

    /**
     PDF document is opened successfully.
    */
    function __openPdfDocument_success(data: any) {
    }

    // open uploaded file in image viewer
    this._pdfDocumentEditorControl.openFile("VintasoftImagingDemo.pdf", __openPdfDocument_success, __openDefaultPdfFileFromSessionFolder_error);
  }

}
