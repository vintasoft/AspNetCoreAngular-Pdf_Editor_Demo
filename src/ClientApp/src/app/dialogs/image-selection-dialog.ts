import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'image-selection-dialog-content',
  templateUrl: './image-selection-dialog.html'
})
export class ImageSelectionDialogContent {

  public docViewer: Vintasoft.Imaging.DocumentViewer.WebDocumentViewerJS | null = null;
  private _imageSelectiondPanel: Vintasoft.Imaging.DocumentViewer.Panels.WebUiImageSelectionPanelJS | null = null;


  constructor(public activeModal: NgbActiveModal) {
  }


  /**
   OnInit event occurs.
   */
  ngOnInit() {
    if (this.docViewer == null)
      return;

    // create the document password panel
    this._imageSelectiondPanel = new Vintasoft.Imaging.DocumentViewer.Panels.WebUiImageSelectionPanelJS({ cssClass: "vsui-dialogContent" });
    // add document password panel to the document viewer
    this.docViewer.get_Items().addItem(this._imageSelectiondPanel);

    // render the document password panel
    let passwordPanelElement: HTMLElement = this._imageSelectiondPanel.render() as HTMLElement;

    // get div-element that should contain the document password panel
    let documentPasswordPanelDiv: HTMLDivElement = document.getElementById("imageSelectionPanelDiv") as HTMLDivElement;
    // append the document password panel to the dialog
    documentPasswordPanelDiv.appendChild(passwordPanelElement);
  }

  /**
   "OK" button is clicked.
  */
  public okButtonClicked() {
    if (this.docViewer == null)
      return;

    // берем изображения, к-е выбрали в диалоге
    let selectedImages: Vintasoft.Shared.WebImageJS[] | null = this.getSelectedImages();

    // если их удалось взять то
    if (selectedImages != null) {
      // берем инструмент
      let pdfRemoveContentTool: Vintasoft.Imaging.Pdf.UI.VisualTools.WebPdfRemoveContentToolJS =
        this.docViewer.getVisualToolById("PdfRemoveContentTool") as Vintasoft.Imaging.Pdf.UI.VisualTools.WebPdfRemoveContentToolJS;
      // ставим его активным
      this.docViewer.set_CurrentVisualTool(pdfRemoveContentTool);
      for (let i: number = 0; i < selectedImages.length; i++) {
        let selectedImage: Vintasoft.Shared.WebImageJS = selectedImages[i];
        let pageMark: Vintasoft.Imaging.Pdf.WebPdfPageRedactionMarkJS = new Vintasoft.Imaging.Pdf.WebPdfPageRedactionMarkJS(selectedImage);
        // добавляем созданную метку на изображение
        pdfRemoveContentTool.add(pageMark, selectedImage);
      }
    }

    // close this dialog
    this.activeModal.close();
  }

  /**
   Returns the selected images.
   @returns {object} Array of selected images OR null if error occured.
 */
  public getSelectedImages(): Vintasoft.Shared.WebImageJS[] | null {
    if (this._imageSelectiondPanel == null)
      return null;

    return this._imageSelectiondPanel.getSelectedImages();
  }

  /**
   "Cancel" button is clicked.
  */
  public cancelButtonClicked() {
    // close this dialog
    this.activeModal.close();
  }

}


@Component({
  selector: 'image-selection-dialog',
  templateUrl: './image-selection-dialog.html'
})
export class ImageSelectionDialog {

  public docViewer: Vintasoft.Imaging.DocumentViewer.WebDocumentViewerJS | null = null;
  private _modalReference: NgbModalRef | null = null;


  constructor(private modalService: NgbModal) {
  }


  open() {
    this._modalReference = this.modalService.open(ImageSelectionDialogContent);
    this._modalReference.componentInstance.docViewer = this.docViewer;
  }

  /**
   "OK" button is clicked.
  */
  public okButtonClicked() {
    if (this._modalReference == null)
      return;

    this._modalReference.componentInstance.okButtonClicked();
  }

  /**
   "Cancel" button is clicked.
  */
  public cancelButtonClicked() {
    if (this._modalReference == null)
      return;

    this._modalReference.componentInstance.cancelButtonClicked();
  }

}
