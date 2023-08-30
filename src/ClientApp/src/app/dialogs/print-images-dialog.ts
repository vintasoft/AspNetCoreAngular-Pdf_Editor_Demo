import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


let _printImagesDialogContent: PrintImagesDialogContent;


@Component({
  selector: 'print-images-dialog-content',
  templateUrl: './print-images-dialog.html'
})
export class PrintImagesDialogContent {

  public docViewer: Vintasoft.Imaging.DocumentViewer.WebDocumentViewerJS | null = null;
  private _printImagesSettingsPanel: Vintasoft.Imaging.DocumentViewer.Panels.WebUiPrintImagesSettingsPanelJS | null = null;


  constructor(public activeModal: NgbActiveModal) {
    _printImagesDialogContent = this;
  }


  /**
   OnInit event occurs.
   */
  ngOnInit() {
    if (this.docViewer == null)
      return;

    // create the document password panel
    this._printImagesSettingsPanel = new Vintasoft.Imaging.DocumentViewer.Panels.WebUiPrintImagesSettingsPanelJS({ cssClass: "vsui-dialogContent" });
    // add document password panel to the document viewer
    this.docViewer.get_Items().addItem(this._printImagesSettingsPanel);
    // subscribe to the "authenticationSucceeded" of document password panel
    Vintasoft.Shared.subscribeToEvent(this._printImagesSettingsPanel, "beginPrint", this._printImagesSettingsPanel_beginPrint);
    Vintasoft.Shared.subscribeToEvent(this._printImagesSettingsPanel, "imagesPreparationFailed", this._printImagesSettingsPanel_imagesPreparationFailed);

    // render the print images settings panel
    let printImagesSettingsElement: HTMLElement = this._printImagesSettingsPanel.render() as HTMLElement;

    // get div-element that should contain the print images settings panel
    let documentPasswordPanelDiv: HTMLDivElement = document.getElementById("printImageSettingsPanelDiv") as HTMLDivElement;
    // append the print images settings panel to the dialog
    documentPasswordPanelDiv.appendChild(printImagesSettingsElement);
  }

  /**
   File authentication is succeeded.
  */
  private _printImagesSettingsPanel_beginPrint() {
    // close this dialog
    _printImagesDialogContent.activeModal.close();
  }

  private _printImagesSettingsPanel_imagesPreparationFailed() {
    // close this dialog
    _printImagesDialogContent.activeModal.close();
  }

  /**
   "OK" button is clicked.
  */
  public okButtonClicked() {
    if (_printImagesDialogContent._printImagesSettingsPanel == null)
      return;

    _printImagesDialogContent._printImagesSettingsPanel.print();
  }

  /**
   "Cancel" button is clicked.
  */
  public cancelButtonClicked() {
    if (_printImagesDialogContent._printImagesSettingsPanel == null)
      return;

    _printImagesDialogContent._printImagesSettingsPanel.abort();
    // close this dialog
    this.activeModal.close();
  }

}


@Component({
  selector: 'print-images-dialog',
  templateUrl: './print-images-dialog.html'
})
export class PrintImagesDialog {

  public docViewer: Vintasoft.Imaging.DocumentViewer.WebDocumentViewerJS | null = null;
  private _modalReference: NgbModalRef | null = null;


  constructor(private modalService: NgbModal) {
  }


  public open() {
    this._modalReference = this.modalService.open(PrintImagesDialogContent);
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
