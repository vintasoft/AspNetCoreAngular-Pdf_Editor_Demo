import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentPasswordDialog } from '../dialogs/document-password-dialog';

/**
 * A helper that helps to open PDF file.
 */
export class OpenPdfFileHelper {

  _docViewer: Vintasoft.Imaging.DocumentViewer.WebDocumentViewerJS;
  _showErrorMessageFunc: Function;

  // Opened PDF document.
  _pdfDocument: Vintasoft.Imaging.Pdf.WebPdfDocumentJS | null = null;



  constructor(private modalService: NgbModal, docViewer: Vintasoft.Imaging.DocumentViewer.WebDocumentViewerJS, showErrorMessageFunc: Function) {
    this._docViewer = docViewer;
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
      that.openPdfDocument(data.fileId, "");
    }

    /**
     Default PDF file is NOT copied to the default session folder.
     @param {object} data Information about error.
    */
    function __copyDefaultPdfFileToSessionFolder_error(data: any) {
      that._showErrorMessageFunc(data);
    }

    /**
     PDF document is opened successfully.
    */
    function __openPdfDocument_success(data: any) {
      // save reference to opened PDF document
      that._pdfDocument = data.pdfDocument;
      if (that._pdfDocument == null)
        return;

      // get images associated with PDF page
      var newImages: Vintasoft.Shared.WebImageJS[] = Vintasoft.Imaging.Pdf.WebPdfDocumentControllerJS.getImagesAssociatedWithPdfPages(that._pdfDocument);

      // get image collection of image viewer
      var images = that._docViewer.get_ImageViewer().get_Images();
      // clear image collection of image viewer
      images.clear();

      // add images, which are associated with PDF pages, to the image collection of image viewer
      images.addRange(newImages);
    }


    // open uploaded file in image viewer
    Vintasoft.Imaging.Pdf.WebPdfDocumentControllerJS.openPdfDocument("VintasoftImagingDemo.pdf", "", __openPdfDocument_success, __openDefaultPdfFileFromSessionFolder_error);
  }

  /**
   * Opens the PDF file in image viewer.
   * @param fileId The identifier of PDF file.
   */
  openPdfFile(fileId: string) {
    // if demo has previosly opened PDF document
    if (this._pdfDocument != null) {
      // close previously opened PDF document
      Vintasoft.Imaging.Pdf.WebPdfDocumentControllerJS.closeDocument(this._pdfDocument);
      this._pdfDocument = null;
    }

    var that = this;


    /**
     PDF document is opened successfully.
    */
    function __openPdfDocument_success(data: any) {
      // save reference to opened PDF document
      that._pdfDocument = data.pdfDocument;
      if (that._pdfDocument == null)
        return;

      // get images associated with PDF page
      var newImages: Vintasoft.Shared.WebImageJS[] = Vintasoft.Imaging.Pdf.WebPdfDocumentControllerJS.getImagesAssociatedWithPdfPages(that._pdfDocument);

      // get image collection of image viewer
      var images = that._docViewer.get_ImageViewer().get_Images();
      // clear image collection of image viewer
      images.clear();

      // add images, which are associated with PDF pages, to the image collection of image viewer
      images.addRange(newImages);
    }

    /**
     PDF file is NOT opened with empty password.
     @param {object} data Information about error.
    */
    function __openPdfFile_error(data: any) {
      that.showPasswordDialog(fileId);
    }


    // open uploaded file in image viewer
    Vintasoft.Imaging.Pdf.WebPdfDocumentControllerJS.openPdfDocument(fileId, "", __openPdfDocument_success, __openPdfFile_error);
  }

  /**
   * Opens the PDF document in image viewer.
   */
  openPdfDocument(fileId: string, filePassword: string) {
    // if demo has previosly opened PDF document
    if (this._pdfDocument != null) {
      // close previously opened PDF document
      Vintasoft.Imaging.Pdf.WebPdfDocumentControllerJS.closeDocument(this._pdfDocument);
      this._pdfDocument = null;
    }

    var that = this;


    /**
     PDF document is opened successfully.
    */
    function __openPdfDocument_success(data: any) {
      // save reference to opened PDF document
      that._pdfDocument = data.pdfDocument;
      if (that._pdfDocument == null)
        return;

      // get images associated with PDF page
      var newImages: Vintasoft.Shared.WebImageJS[] = Vintasoft.Imaging.Pdf.WebPdfDocumentControllerJS.getImagesAssociatedWithPdfPages(that._pdfDocument);

      // get image collection of image viewer
      var images = that._docViewer.get_ImageViewer().get_Images();
      // clear image collection of image viewer
      images.clear();

      // add images, which are associated with PDF pages, to the image collection of image viewer
      images.addRange(newImages);
    }

    /**
     PDF document is not opened.
    */
    function __openPdfDocument_error(data: any) {
      that._showErrorMessageFunc(data);
    }


    // open uploaded file in image viewer
    Vintasoft.Imaging.Pdf.WebPdfDocumentControllerJS.openPdfDocument(fileId, filePassword, __openPdfDocument_success, __openPdfDocument_error);

  }

  /**
   Creates a modal dialog for entering the password and shows the dialog.
  */
  showPasswordDialog(fileId: string) {
    // create the document password dialog
    let dlg: DocumentPasswordDialog = new DocumentPasswordDialog(this.modalService);
    dlg.docViewer = this._docViewer;
    dlg.fileId = fileId;
    // open the document password dialog
    dlg.open();
  }

}
