import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'pdf-image-resource-dialog-content',
  templateUrl: './pdf-image-resource-dialog.html'
})
export class PdfImageResourceDialogContent {

  public image: Vintasoft.Imaging.Pdf.WebContentImageJS | null = null;


  constructor(public activeModal: NgbActiveModal) {
  }


  /**
   OnInit event occurs.
  */
  ngOnInit() {
    if (this.image == null)
      return;

    // get resoure of content image
    let resource: Vintasoft.Imaging.Pdf.WebPdfImageResourceJS = this.image.get_Resource();

    // get image input
    let imageInput: HTMLInputElement = document.getElementById("contentImageInput") as HTMLInputElement;
    // change src of input (content image data - base64 image)
    imageInput.setAttribute("src", resource.getResourceData());

    // get div that contains image input
    let divImageInput: HTMLImageElement = imageInput.closest("div") as HTMLImageElement;
    // get div height
    let divHeight: number = divImageInput.height;
    // get content image height
    let resourceSize: any = resource.get_Size();
    let imageHeight: number = resourceSize.height;

    // margin top
    let marginTop: number = 0;
    // if image height less than div height
    if (imageHeight < divHeight)
      // get new margin top
      marginTop = Math.round((divHeight - imageHeight) / 2);
    // change image margin top
    imageInput.style.marginTop = marginTop + 'px';


    // write information about image
    // css style of td elements
    let style: string = 'style="background-color:#DBD7D7; text-align:left"';

    // get image information
    let resolution: any = this.image.get_Resolution();
    let compression: string = resource.get_Compression();
    let length: number = resource.get_Length();
    let pixelFormat = resource.get_PixelFormat().toString();

    let sizeText: string = "Size";
    let resolutionText: string = "Resolution";
    let compressionText: string = "Compression";
    let pixelFormatText: string = "PixelFormat";
    let lengthText: string = "Length";
    let bytesText: string = "bytes";

    // create markup 
    let markup: string = "<table>";
    markup += "<tr><td " + style + ">" + sizeText + ":</td><td>" + resourceSize.width + "x" + resourceSize.height + "</td></tr>";
    markup += "<tr><td " + style + ">" + resolutionText + ":</td><td>" + Math.round(resolution.x) + "x" + Math.round(resolution.y) + " dpi</td></tr>";
    markup += "<tr><td " + style + ">" + compressionText + ":</td><td>" + compression + "</td></tr>";
    markup += "<tr><td " + style + ">" + pixelFormatText + ":</td><td>" + pixelFormat + "</td></tr>";
    markup += "<tr><td " + style + ">" + lengthText + ":</td><td>" + length + " " + bytesText + "</td></tr>";
    markup += "</table>";

    // set new markup
    let contentImageInfoElement: HTMLElement | null = document.getElementById("contentImageInfo");
    if (contentImageInfoElement != null)
      contentImageInfoElement.innerHTML = markup;
  }

  /**
   Closes the dialog.
  */
  public closeDialog() {
    this.activeModal.close();
  }

}


@Component({
  selector: 'pdf-image-resource-dialog',
  templateUrl: './pdf-image-resource-dialog.html'
})
export class PdfImageResourceDialog {

  public image: Vintasoft.Imaging.Pdf.WebContentImageJS | null = null;
  private _modalReference: NgbModalRef | null = null;


  constructor(private modalService: NgbModal) {
  }


  public open() {
    this._modalReference = this.modalService.open(PdfImageResourceDialogContent);
    this._modalReference.componentInstance.image = this.image;
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
