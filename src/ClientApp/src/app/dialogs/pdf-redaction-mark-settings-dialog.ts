import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'pdf-redaction-mark-settings-dialog-content',
  templateUrl: './pdf-redaction-mark-settings-dialog.html'
})
export class PdfRedactionMarkSettingsDialogContent {

  public field: Vintasoft.Imaging.Pdf.WebPdfPageRedactionMarkJS | null = null;


  constructor(public activeModal: NgbActiveModal) {
  }


  /**
   OnInit event occurs.
  */
  ngOnInit() {
    if (this.field == null)
      return;

    let propertyGrid: Vintasoft.Shared.WebPropertyGridJS = new Vintasoft.Shared.WebPropertyGridJS(this.field);

    // create PropertyGridControlJS
    let propertyGridControl: PropertyGridControlJS = new PropertyGridControlJS(propertyGrid, "redactionMarkSettingsPropertyGrid", { hideNestedElements: false, showReadOnlyElements: false });
    propertyGridControl.createMarkup();
  }

  /**
   Closes the dialog.
  */
  public closeDialog() {
    this.activeModal.close();
  }

}


@Component({
  selector: 'pdf-redaction-mark-settings-dialog',
  templateUrl: './pdf-redaction-mark-settings-dialog.html'
})
export class PdfRedactionMarkSettingsDialog {

  public field: Vintasoft.Imaging.Pdf.WebPdfPageRedactionMarkJS | null = null;
  private _modalReference: NgbModalRef | null = null;


  constructor(private modalService: NgbModal) {
  }


  public open() {
    this._modalReference = this.modalService.open(PdfRedactionMarkSettingsDialogContent);
    this._modalReference.componentInstance.field = this.field;
  }

  /**
   Closes the dialog.
  */
  public closeDialog() {
    if (this._modalReference == null)
      return;

    this._modalReference.componentInstance.closeDialog();
  }

}
