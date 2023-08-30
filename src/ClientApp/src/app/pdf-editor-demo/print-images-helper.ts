import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrintImagesDialog } from '../dialogs/print-images-dialog';

let _printImagesHelper: PrintImagesHelper;

/**
 * A helper that helps to print images.
 */
export class PrintImagesHelper {

  constructor(private modalService: NgbModal) {
    _printImagesHelper = this;
  }



  /**
   * Creates UI button for image printing.
   */
  createPrintImagesButton() {
    /**
     * "Print images" button is clicked.
     */
    function __printImagesButton_clicked(event: object, uiElement: Vintasoft.Imaging.UI.UIElements.WebUiElementJS) {
      let docViewer: Vintasoft.Imaging.DocumentViewer.WebDocumentViewerJS = uiElement.get_RootControl() as Vintasoft.Imaging.DocumentViewer.WebDocumentViewerJS;
      if (docViewer != null) {
        let dlg: PrintImagesDialog = new PrintImagesDialog(_printImagesHelper.modalService);
        dlg.docViewer = docViewer;
        dlg.open();
      }
    }


    // create the button that allows to show a dialog with previously uploaded image files and select image file
    let button: Vintasoft.Imaging.UI.UIElements.WebUiButtonJS = new Vintasoft.Imaging.UI.UIElements.WebUiButtonJS({
      cssClass: "vsui-printImagesButton",
      title: "Print images",
      localizationId: "printImagesButton",
      onClick: __printImagesButton_clicked
    });

    Vintasoft.Shared.subscribeToEventOnce(button, "activated", function (event: any, eventArgs: any) {
      var uiElement = event.target;
      var docViewer = uiElement.get_RootControl() as Vintasoft.Imaging.DocumentViewer.WebDocumentViewerJS;
      var viewer = docViewer.get_ImageViewer();
      var images = viewer.get_Images();


      function __updateButtonState() {
        var isEnabled = images.get_Count() > 0;
        uiElement.set_IsEnabled(isEnabled);
      }

      function __destroyed(event: object) {
        Vintasoft.Shared.unsubscribeFromEvent(images, "changed", __updateButtonState);
      }


      Vintasoft.Shared.subscribeToEvent(images, "changed", __updateButtonState);
      Vintasoft.Shared.subscribeToEventOnce(uiElement, "destroyed", __destroyed);

      __updateButtonState();
    });

    return button;
  }

}
