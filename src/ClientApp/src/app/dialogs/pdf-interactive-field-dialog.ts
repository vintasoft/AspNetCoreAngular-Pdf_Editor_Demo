import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'pdf-interactive-field-dialog-content',
  templateUrl: './pdf-interactive-field-dialog.html'
})
export class PdfInteractiveFieldDialogContent {

  public field: Vintasoft.Imaging.Pdf.WebPdfInteractiveFormFieldJS | null = null;
  public objShortName: string = '';
  public objFullName: string = '';
  public blackList: Array<string> = new Array<string>();


  constructor(public activeModal: NgbActiveModal) {
  }


  /**
   OnInit event occurs.
  */
  ngOnInit() {
    if (this.field == null)
      return;

    // create WebPropertyGridJS object for PDF interactive field
    let propertyGrid: Vintasoft.Shared.WebPropertyGridJS = new Vintasoft.Shared.WebPropertyGridJS(this.field, this.objShortName, this.objFullName, this.blackList);


    // create PropertyGridControlJS
    let propertyGridControl: PropertyGridControlJS = new PropertyGridControlJS(propertyGrid, "interactiveFieldPropertyGrid", { hideNestedElements: false, showReadOnlyElements: false });
    propertyGridControl.createMarkup();

  }

  /**
   Closes the dialog.
  */
  closeDialog() {
    this.activeModal.close();
  }

}


@Component({
  selector: 'pdf-interactive-field-dialog',
  templateUrl: './pdf-interactive-field-dialog.html'
})
export class PdfInteractiveFieldDialog {

  public field: Vintasoft.Imaging.Pdf.WebPdfInteractiveFormFieldJS | null = null;
  public objShortName: string = '';
  public objFullName: string = '';
  public blackList: Array<string> | null = null;
  private _modalReference: NgbModalRef | null = null;


  constructor(private modalService: NgbModal) {
  }


  public open() {
    this._modalReference = this.modalService.open(PdfInteractiveFieldDialogContent);
    this._modalReference.componentInstance.field = this.field;
    this._modalReference.componentInstance.objShortName = this.objShortName;
    this._modalReference.componentInstance.objFullName = this.objFullName;
    this._modalReference.componentInstance.blackList = this.blackList;
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
