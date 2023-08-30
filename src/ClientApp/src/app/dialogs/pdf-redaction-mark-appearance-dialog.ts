import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'pdf-redaction-mark-appearance-dialog-content',
  templateUrl: './pdf-redaction-mark-appearance-dialog.html'
})
export class PdfRedactionMarkAppearanceDialogContent {

  public docViewer: Vintasoft.Imaging.DocumentViewer.WebDocumentViewerJS | null = null;
  private _pdfRedactionMarkAppearancePanel: Vintasoft.Imaging.DocumentViewer.Panels.WebUiPdfRedactionMarkAppearancePanelJS | null = null;


  constructor(public activeModal: NgbActiveModal) {
  }


  /**
   OnInit event occurs.
   */
  ngOnInit() {
    if (this.docViewer == null)
      return;

    // create the document password panel
    this._pdfRedactionMarkAppearancePanel = new Vintasoft.Imaging.DocumentViewer.Panels.WebUiPdfRedactionMarkAppearancePanelJS({ cssClass: "vsui-dialogContent" });
    // add document password panel to the document viewer
    this.docViewer.get_Items().addItem(this._pdfRedactionMarkAppearancePanel);

    // render the document password panel
    let passwordPanelElement: HTMLElement = this._pdfRedactionMarkAppearancePanel.render() as HTMLElement;

    // get div-element that should contain the document password panel
    let documentPasswordPanelDiv: HTMLDivElement = document.getElementById("pdfRedactionMarkAppearancePanelDiv") as HTMLDivElement;
    // append the document password panel to the dialog
    documentPasswordPanelDiv.appendChild(passwordPanelElement);
  }

  /**
   "OK" button is clicked.
  */
  public okButtonClicked() {
    // close this dialog
    this.activeModal.close();
  }

}


@Component({
  selector: 'pdf-redaction-mark-appearance-dialog',
  templateUrl: './pdf-redaction-mark-appearance-dialog.html'
})
export class PdfRedactionMarkAppearanceDialog {

  public docViewer: Vintasoft.Imaging.DocumentViewer.WebDocumentViewerJS | null = null;
  private _modalReference: NgbModalRef | null = null;


  constructor(private modalService: NgbModal) {
  }


  public open() {
    this._modalReference = this.modalService.open(PdfRedactionMarkAppearanceDialogContent);
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

}
