import { Component, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'previously-uploaded-files-dialog-content',
  templateUrl: './previously-uploaded-files-dialog.html'
})
export class PreviouslyUploadedFilesDialogContent {

  public okButtonClickedEvent: EventEmitter<any> = new EventEmitter();
  private _fileList: string[] | null = null;


  constructor(public activeModal: NgbActiveModal) {
  }


  /**
   OnInit event occurs.
  */
  ngOnInit() {
    // save reference to this instance
    var that = this;

    // create a request for getting information about previously uploaded files
    let fileWebServiceRequest = new Vintasoft.Shared.WebRequestJS(
      "GetUploadedFilesUrl",
      function (data: any) {
        that._fileList = data.files;

        if (that._fileList != null) {

          let markup: string = "";
          // if there is NO previously uploaded files
          if (that._fileList.length === 0) {
            // add label with text "No uploaded files." to the dialog items
            markup = markup + '<label>No uploaded files.</label><br />';
          }
          // if there are previously uploaded files
          else {
            // for each previously uploaded file
            for (var i = 0; i < that._fileList.length; i++) {
              // add label with file information to the dialog items
              markup = markup + '<input id="uploadedFileList_item' + i.toString() + '" type="radio" value="' + that._fileList[i] + '" name="fileList"> <label for="' + i.toString() + '">' + that._fileList[i] + '</label><br />';
            }
          }


          let uploadedFileListElement: HTMLElement | null = document.getElementById('uploadedFileList');
          if (uploadedFileListElement != null)
            uploadedFileListElement.innerHTML = markup;
        }
      },
      function (data: any) { },
      { type: 'POST' });

    // send the request
    let fileWebService: Vintasoft.Shared.WebServiceControllerJS = new Vintasoft.Shared.WebServiceControllerJS("vintasoft/api/MyVintasoftFileApi");
    fileWebService.sendRequest(fileWebServiceRequest);
  }

  /**
   "Open" button is clicked.
  */
  public openButtonClicked() {
    let fileId = '';

    if (this._fileList != null) {
      for (var i = 0; i < this._fileList.length; i++) {
        let radioButton: HTMLInputElement = document.getElementById("uploadedFileList_item" + i.toString()) as HTMLInputElement;
        if (radioButton.checked) {
          fileId = this._fileList[i];
          break;
        }
      }
    }

    this.okButtonClickedEvent.emit({ fileId: fileId });
    this.activeModal.close();
  }

  /**
   "Cancel" button is clicked.
  */
  public cancelButtonClicked() {
    this.activeModal.close();
  }

}


@Component({
  selector: 'previously-uploaded-files-dialog',
  templateUrl: './previously-uploaded-files-dialog.html'
})
export class PreviouslyUploadedFilesDialog {

  public okButtonClickedEvent: EventEmitter<any> = new EventEmitter();
  private _modalReference: NgbModalRef | null = null;


  constructor(private modalService: NgbModal) {
  }


  public open() {
    this._modalReference = this.modalService.open(PreviouslyUploadedFilesDialogContent);
    this._modalReference.componentInstance.okButtonClickedEvent.subscribe((receivedEntry: any) => {
      this.okButtonClickedEvent.emit({ fileId: receivedEntry.fileId });
    });
  }

  /**
   "Open" button is clicked.
  */
  public openButtonClicked() {
    if (this._modalReference == null)
      return;

    this._modalReference.componentInstance.openButtonClicked();
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
