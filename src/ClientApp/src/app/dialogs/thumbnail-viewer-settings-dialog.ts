import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'thumbnail-viewer-settings-dialog-content',
  templateUrl: './thumbnail-viewer-settings-dialog.html'
})
export class ThumbnailViewerSettingsDialogContent {

  public thumbnailViewer: Vintasoft.Imaging.UI.WebThumbnailViewerJS | null = null;


  constructor(public activeModal: NgbActiveModal) {
  }


  /**
   OnInit event occurs.
  */
  ngOnInit() {
    if (this.thumbnailViewer == null)
      return;

    let thumbnailSize: any = this.thumbnailViewer.get_ThumbnailSize();
    this.SetStringElementValue("sizeSelect", thumbnailSize.width.toString());

    this.SetStringElementValue("scaleSelect", this.thumbnailViewer.get_ThumbnailScale().toString());
    this.SetStringElementValue("flowStyleSelect", this.thumbnailViewer.get_ThumbnailFlowStyle().toString());
    this.SetNumberElementValue("columnCountValue", this.thumbnailViewer.get_ThumbnailFixedColumnCount());
    this.SetNumberElementValue("marginValue", this.thumbnailViewer.get_ThumbnailMargin());

    let thumbnailPadding: any = this.thumbnailViewer.get_ThumbnailPadding();
    this.SetNumberElementValue("paddingTopValue", thumbnailPadding[0]);
    this.SetNumberElementValue("paddingRightValue", thumbnailPadding[1]);
    this.SetNumberElementValue("paddingBottomValue", thumbnailPadding[2]);
    this.SetNumberElementValue("paddingLeftValue", thumbnailPadding[3]);

    this.SetBoolElementValue("showCaptionValue", this.thumbnailViewer.get_DisplayThumbnailCaption());
    this.SetStringElementValue("captionFormatValue", this.thumbnailViewer.get_ThumbnailCaptionFormat());
    this.SetStringElementValue("captionAnchorSelect", this.thumbnailViewer.get_ThumbnailCaptionAnchor().toString());
    this.SetBoolElementValue("focusOnHoverValue", this.thumbnailViewer.get_FocusOnHover());
    this.SetBoolElementValue("multiselectValue", this.thumbnailViewer.get_MultiSelect());
  }


  /**
   Closes the dialog.
  */
  public closeDialog() {
    if (this.thumbnailViewer == null)
      return;

    this.thumbnailViewer.setThumbnailSize(
      this.GetElementValueAsNumber("sizeSelect"),
      this.GetElementValueAsNumber("sizeSelect"));

    this.thumbnailViewer.set_ThumbnailScale(new Vintasoft.Imaging.WebThumbnailScaleEnumJS(this.GetElementValueAsString("scaleSelect")));
    this.thumbnailViewer.set_ThumbnailFlowStyle(new Vintasoft.Imaging.WebThumbnailFlowStyleEnumJS(this.GetElementValueAsString("flowStyleSelect")));
    this.thumbnailViewer.set_ThumbnailFixedColumnCount(this.GetElementValueAsNumber("columnCountValue"));
    this.thumbnailViewer.set_ThumbnailMargin(this.GetElementValueAsNumber("marginValue"));

    this.thumbnailViewer.set_ThumbnailPadding([
      this.GetElementValueAsNumber("paddingTopValue"),
      this.GetElementValueAsNumber("paddingRightValue"),
      this.GetElementValueAsNumber("paddingBottomValue"),
      this.GetElementValueAsNumber("paddingLeftValue")]);

    this.thumbnailViewer.set_DisplayThumbnailCaption(this.GetElementValueAsBool("showCaptionValue"));
    this.thumbnailViewer.set_ThumbnailCaptionFormat(this.GetElementValueAsString("captionFormatValue"));
    this.thumbnailViewer.set_ThumbnailCaptionAnchor(new Vintasoft.Imaging.WebImageAnchorTypeEnumJS(this.GetElementValueAsString("captionAnchorSelect")));
    this.thumbnailViewer.set_FocusOnHover(this.GetElementValueAsBool("focusOnHoverValue"));
    this.thumbnailViewer.set_MultiSelect(this.GetElementValueAsBool("multiselectValue"));

    this.activeModal.close();
  }

  /**
   Reruns the specified element value as number.
  */
  private GetElementValueAsNumber(elementId: string): number {
    let element = document.getElementById(elementId);

    if (element instanceof HTMLSelectElement) {
      let selectedElement = element as HTMLSelectElement;
      return parseInt(selectedElement.value);
    }
    else if (element instanceof HTMLInputElement) {
      let inputElement = element as HTMLInputElement;
      return inputElement.valueAsNumber;
    }

    return 0;
  }

  /**
   Changes the specified element value.
  */
  private SetNumberElementValue(elementId: string, value: number): void {
    let element = document.getElementById(elementId);

    if (element instanceof HTMLSelectElement) {
      let selectedElement = element as HTMLSelectElement;
      selectedElement.selectedIndex = value;
    }
    else if (element instanceof HTMLInputElement) {
      let inputElement = element as HTMLInputElement;
      inputElement.valueAsNumber = value;
    }
  }

  /**
   Reruns the specified element value as boolean.
  */
  private GetElementValueAsBool(elementId: string): boolean {
    let element = document.getElementById(elementId);
    let inputElement = element as HTMLInputElement;
    return inputElement.checked;
  }

  /**
   Changes the specified element value.
  */
  private SetBoolElementValue(elementId: string, value: boolean): void {
    let element = document.getElementById(elementId);
    let inputElement = element as HTMLInputElement;
    inputElement.checked = value;
  }

  /**
   Reruns the specified element value as string.
  */
  private GetElementValueAsString(elementId: string): string {
    let element = document.getElementById(elementId);

    if (element instanceof HTMLSelectElement) {
      let selectedElement = element as HTMLSelectElement;
      return selectedElement.value;
    }
    else if (element instanceof HTMLInputElement) {
      let inputElement = element as HTMLInputElement;
      return inputElement.value;
    }

    return '';
  }

  /**
   Changes the specified element value.
  */
  private SetStringElementValue(elementId: string, value: string): void {
    let element = document.getElementById(elementId);

    if (element instanceof HTMLSelectElement) {
      let selectedElement = element as HTMLSelectElement;
      selectedElement.value = value;
    }
    else if (element instanceof HTMLInputElement) {
      let inputElement = element as HTMLInputElement;
      inputElement.value = value;
    }
  }

}


@Component({
  selector: 'thumbnail-viewer-settings-dialog',
  templateUrl: './thumbnail-viewer-settings-dialog.html'
})
export class ThumbnailViewerSettingsDialog {

  public thumbnailViewer: Vintasoft.Imaging.UI.WebThumbnailViewerJS | null = null;
  private _modalReference: NgbModalRef | null = null;


  constructor(private modalService: NgbModal) {
  }


  public open() {
    this._modalReference = this.modalService.open(ThumbnailViewerSettingsDialogContent);
    this._modalReference.componentInstance.thumbnailViewer = this.thumbnailViewer;
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
