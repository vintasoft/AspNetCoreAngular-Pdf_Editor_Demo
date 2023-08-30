import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


let _documentPasswordDialogContent: DocumentPasswordDialogContent;


@Component({
  selector: 'document-password-dialog-content',
  templateUrl: './document-password-dialog.html'
})
export class DocumentPasswordDialogContent {

  public docViewer: Vintasoft.Imaging.DocumentViewer.WebDocumentViewerJS | null = null;
  public fileId: string = '';
  private _passwordPanel: Vintasoft.Imaging.DocumentViewer.Panels.WebUiDocumentPasswordPanelJS | null = null;


  constructor(public activeModal: NgbActiveModal) {
    _documentPasswordDialogContent = this;
  }


  /**
   OnInit event occurs.
   */
  ngOnInit() {
    if (this.docViewer == null)
      return;

    // create the document password panel
    this._passwordPanel = new Vintasoft.Imaging.DocumentViewer.Panels.WebUiDocumentPasswordPanelJS({ cssClass: "vsui-dialogContent" }, this.fileId);
    // add document password panel to the document viewer
    this.docViewer.get_Items().addItem(this._passwordPanel);
    // subscribe to the "authenticationSucceeded" of document password panel
    Vintasoft.Shared.subscribeToEvent(this._passwordPanel, "authenticationSucceeded", this._passwordPanel_authenticationSucceeded);

    // render the document password panel
    let passwordPanelElement: HTMLElement = this._passwordPanel.render() as HTMLElement;

    // get div-element that should contain the document password panel
    let documentPasswordPanelDiv: HTMLDivElement = document.getElementById("documentPasswordPanelDiv") as HTMLDivElement;
    // append the document password panel to the dialog
    documentPasswordPanelDiv.appendChild(passwordPanelElement);
  }

  /**
   File authentication is succeeded.
  */
  private _passwordPanel_authenticationSucceeded() {
    if (_documentPasswordDialogContent._passwordPanel == null || _documentPasswordDialogContent.docViewer == null)
      return;

    // close this dialog
    _documentPasswordDialogContent.activeModal.close();

    // create file info object with file identifier and password
    let fileInfo: Vintasoft.Shared.WebFileInfoJS = new Vintasoft.Shared.WebFileInfoJS(_documentPasswordDialogContent.fileId, _documentPasswordDialogContent._passwordPanel.getPassword());
    // open file in document viewer
    _documentPasswordDialogContent.docViewer.openFile(fileInfo);
  }

  /**
   "OK" button is clicked.
  */
  public okButtonClicked() {
    if (this._passwordPanel == null)
      return;

    // authenticate file using entered password
    this._passwordPanel.authenticateFile();
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
  selector: 'document-password-dialog',
  templateUrl: './document-password-dialog.html'
})
export class DocumentPasswordDialog {

  public docViewer: Vintasoft.Imaging.DocumentViewer.WebDocumentViewerJS | null = null;
  public fileId: string = '';
  private _modalReference: NgbModalRef | null = null;


  constructor(private modalService: NgbModal) {
  }


  public open() {
    this._modalReference = this.modalService.open(DocumentPasswordDialogContent);
    this._modalReference.componentInstance.docViewer = this.docViewer;
    this._modalReference.componentInstance.fileId = this.fileId;
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
