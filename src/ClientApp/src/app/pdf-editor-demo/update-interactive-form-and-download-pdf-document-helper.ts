let _updateInteractiveFormAndDownloadPdfDocumentHelper: UpdateInteractiveFormAndDownloadPdfDocumentHelper;

declare global {
  interface Navigator {
    msSaveBlob: (blob: Blob, fileName: string) => boolean
  }
}

/**
 * A helper that helps to print images.
 */
export class UpdateInteractiveFormAndDownloadPdfDocumentHelper {

  _showErrorMessageFunc: Function;

  _docViewer: Vintasoft.Imaging.DocumentViewer.WebDocumentViewerJS | null = null;



  constructor(showErrorMessageFunc: Function) {
    _updateInteractiveFormAndDownloadPdfDocumentHelper = this;

    this._showErrorMessageFunc = showErrorMessageFunc;
  }



  /**
   * Creates UI button that allows to download a PDF file with filled interactive fields.
   */
  createDownloadPdfFileWithFilledFieldsButton() {
    // create button that allows to download a PDF file with filled interactive fields
    let element: Vintasoft.Imaging.UI.UIElements.WebUiButtonJS = new Vintasoft.Imaging.UI.UIElements.WebUiButtonJS({
      cssClass: "vsui-downloadImageFileButton",
      title: "Download image file",
      localizationId: "downloadFileButton",
      onClick: _updateInteractiveFormAndDownloadPdfDocumentHelper.__downloadImageFileButton_clicked
    });
    return element;
  }

  /**
   * "Download image file" button is clicked.
   */
  __downloadImageFileButton_clicked(event: any, uiElement: any) {
    _updateInteractiveFormAndDownloadPdfDocumentHelper._docViewer = uiElement.get_RootControl() as Vintasoft.Imaging.DocumentViewer.WebDocumentViewerJS;

    if (_updateInteractiveFormAndDownloadPdfDocumentHelper._docViewer == null)
      return;

    // get image viewer
    let imageViewer: Vintasoft.Imaging.UI.WebImageViewerJS = _updateInteractiveFormAndDownloadPdfDocumentHelper._docViewer.get_ImageViewer();
    // get focused image
    let focusedImage: Vintasoft.Shared.WebImageJS = imageViewer.get_FocusedImage();
    // if image exists
    if (focusedImage != null) {
      // get the image file identifier
      let fileId: string = focusedImage.get_ImageId();
      // get PDF page, which is associated with image
      let focusedPage: Vintasoft.Imaging.Pdf.WebPdfPageJS = Vintasoft.Imaging.Pdf.WebPdfDocumentControllerJS.getPageAssociatedWithImage(focusedImage) as Vintasoft.Imaging.Pdf.WebPdfPageJS;
      // if image is associated with PDF page
      if (focusedPage != null) {
        // get PDF document
        let doc: Vintasoft.Imaging.Pdf.WebPdfDocumentJS = focusedPage.get_Document();
        // if PDF document has interactive form
        if (doc.isInteractiveFormReceived() && doc.getInteractiveForm() != null) {
          // send the asynchronous request for updating the interactive form
          doc.updateInteractiveForm(_updateInteractiveFormAndDownloadPdfDocumentHelper.__onCommitInteractiveFormChanges_success, _updateInteractiveFormAndDownloadPdfDocumentHelper.__downloadImageOperation_error);
        }
        // if PDF document does NOT have interactive form
        else {
          // send the asynchronous request for downloading an image file from server
          Vintasoft.Imaging.VintasoftFileAPI.downloadImageFile(fileId, _updateInteractiveFormAndDownloadPdfDocumentHelper.__onDownloadFile_success, _updateInteractiveFormAndDownloadPdfDocumentHelper.__downloadImageOperation_error);
        }
      }
      // if image is NOT associated with PDF page
      else {
        // send the asynchronous request for downloading an image file from server
        Vintasoft.Imaging.VintasoftFileAPI.downloadImageFile(fileId, _updateInteractiveFormAndDownloadPdfDocumentHelper.__onDownloadFile_success, _updateInteractiveFormAndDownloadPdfDocumentHelper.__downloadImageOperation_error);
      }
      // start the asynchronous operation in document viewer
      _updateInteractiveFormAndDownloadPdfDocumentHelper._docViewer.startAsyncOperation("Download file");
    }
  }

  /**
   * Saves blob to a file.
   * @param blob Blob.
   * @param filename File name.
   */
  __saveBlobToFile(blob: any, filename: string): any {
    // if blob is defined
    if (blob != null) {
      // if web browser can save blobs
      if (navigator.msSaveBlob) {
        // save the blob using web browser functionality
        return navigator.msSaveBlob(blob, filename);
      }
      // if web browser CANNOT save blobs
      else {
        // create an object URL
        let url: string = window.URL.createObjectURL(blob);
        // if object URL is created
        if (url != null) {
          // create an "A" element
          let a: HTMLAnchorElement = document.createElement("a");
          a.style.display = "none";

          let bodyElement: HTMLElement | null = document.getElementById('body');
          if (bodyElement != null) {
            // if "A" element supports the "download" attribute
            if ("download" in a) {
              // create "A" element with "download" attribute for saving a file in browser
              a.setAttribute("href", url);
              a.setAttribute("download", filename);
              bodyElement.appendChild(a);

              setTimeout(function () {
                a.click();
                a.remove();
                setTimeout(function () { window.URL.revokeObjectURL(url); }, 250);
              }, 66);
            }
            // if "A" element does NOT support the "download" attribute
            else {
              // create iframe for saving a file in browser
              let frame: any = document.createElement("iframe");
              bodyElement.appendChild(a);
              frame[0].src = url;
              setTimeout(function () { frame.remove(); }, 333);
            }
          }
        }
        // if object URL is NOT created
        else {
          // show the alert if warning occured
          _updateInteractiveFormAndDownloadPdfDocumentHelper._showErrorMessageFunc("Error: Object URL is not created.");
        }
      }
    }
    // if blob is NOT created
    else {
      // show the alert if warning occured
      _updateInteractiveFormAndDownloadPdfDocumentHelper._showErrorMessageFunc("Error: Blob is not created.");
    }
  }

  /**
   * The request for downloading image file from server is executed successfully.
   */
  __onDownloadFile_success(data: any) {
    // get a blob, which contains data of downloading file
    let blob: any = data.blob;
    // get name of downloading file
    let filename: string = data.filename;
    _updateInteractiveFormAndDownloadPdfDocumentHelper.__saveBlobToFile(blob, filename);

    if (_updateInteractiveFormAndDownloadPdfDocumentHelper._docViewer == null)
      return;

    // stop the asynchronous operation in document viewer
    _updateInteractiveFormAndDownloadPdfDocumentHelper._docViewer.finishAsyncOperation("Download file", data);
  }

  /**
   * The request for commiting changes in interactive form of PDF document is executed successfully.
   */
  __onCommitInteractiveFormChanges_success(data: any) {
    if (_updateInteractiveFormAndDownloadPdfDocumentHelper._docViewer == null)
      return;

    // get image viewer
    let imageViewer: Vintasoft.Imaging.UI.WebImageViewerJS = _updateInteractiveFormAndDownloadPdfDocumentHelper._docViewer.get_ImageViewer();
    // get focused image
    let focusedImage: Vintasoft.Shared.WebImageJS = imageViewer.get_FocusedImage();

    // get the image file ID
    let fileId: string = focusedImage.get_ImageId();
    if (fileId != null) {
      // send the asynchronous request for downloading an image file from server
      Vintasoft.Imaging.VintasoftFileAPI.downloadImageFile(fileId, _updateInteractiveFormAndDownloadPdfDocumentHelper.__onDownloadFile_success, _updateInteractiveFormAndDownloadPdfDocumentHelper.__downloadImageOperation_error);
    }
  }

  /**
   * Download file operation is failed.
   */
  __downloadImageOperation_error(data: any) {
    if (_updateInteractiveFormAndDownloadPdfDocumentHelper._docViewer == null)
      return;

    // stop the asynchronous operation in document viewer
    _updateInteractiveFormAndDownloadPdfDocumentHelper._docViewer.failAsyncOperation("Download file", data);
  }

}
