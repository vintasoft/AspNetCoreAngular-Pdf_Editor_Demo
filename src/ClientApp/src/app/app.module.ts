import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { PdfEditorDemoComponent } from './pdf-editor-demo/pdf-editor-demo';
import { DocumentPasswordDialog, DocumentPasswordDialogContent } from './dialogs/document-password-dialog';
import { PreviouslyUploadedFilesDialog, PreviouslyUploadedFilesDialogContent } from './dialogs/previously-uploaded-files-dialog';
import { PrintImagesDialog, PrintImagesDialogContent } from './dialogs/print-images-dialog';
import { ImageViewerSettingsDialog, ImageViewerSettingsDialogContent } from './dialogs/image-viewer-settings-dialog';
import { ThumbnailViewerSettingsDialog, ThumbnailViewerSettingsDialogContent } from './dialogs/thumbnail-viewer-settings-dialog';
import { BlockUiDialog, BlockUiDialogContent } from './dialogs/block-ui-dialog';
import { PdfInteractiveFieldDialog, PdfInteractiveFieldDialogContent } from './dialogs/pdf-interactive-field-dialog';
import { ErrorMessageDialog, ErrorMessageDialogContent } from './dialogs/error-message-dialog';
import { PdfRedactionMarkSettingsDialogContent, PdfRedactionMarkSettingsDialog } from './dialogs/pdf-redaction-mark-settings-dialog';
import { PdfImageResourceDialog, PdfImageResourceDialogContent } from './dialogs/pdf-image-resource-dialog';
import { ImageSelectionDialog, ImageSelectionDialogContent } from './dialogs/image-selection-dialog';
import { PdfRedactionMarkAppearanceDialog, PdfRedactionMarkAppearanceDialogContent } from './dialogs/pdf-redaction-mark-appearance-dialog';

@NgModule({
  declarations: [
    AppComponent,
    PdfEditorDemoComponent,
    DocumentPasswordDialog,
    DocumentPasswordDialogContent,
    PreviouslyUploadedFilesDialog,
    PreviouslyUploadedFilesDialogContent,
    PrintImagesDialog,
    PrintImagesDialogContent,
    ImageViewerSettingsDialog,
    ImageViewerSettingsDialogContent,
    ThumbnailViewerSettingsDialog,
    ThumbnailViewerSettingsDialogContent,
    PdfInteractiveFieldDialog,
    PdfInteractiveFieldDialogContent,
    BlockUiDialog,
    BlockUiDialogContent,
    ErrorMessageDialog,
    ErrorMessageDialogContent,
    PdfRedactionMarkSettingsDialog,
    PdfRedactionMarkSettingsDialogContent,
    PdfImageResourceDialog,
    PdfImageResourceDialogContent,
    ImageSelectionDialog,
    ImageSelectionDialogContent,
    PdfRedactionMarkAppearanceDialog,
    PdfRedactionMarkAppearanceDialogContent
  ],
  entryComponents: [
    DocumentPasswordDialog,
    DocumentPasswordDialogContent,
    PreviouslyUploadedFilesDialog,
    PreviouslyUploadedFilesDialogContent,
    PrintImagesDialog,
    PrintImagesDialogContent,
    ImageViewerSettingsDialog,
    ImageViewerSettingsDialogContent,
    ThumbnailViewerSettingsDialog,
    ThumbnailViewerSettingsDialogContent,
    PdfInteractiveFieldDialog,
    PdfInteractiveFieldDialogContent,
    BlockUiDialog,
    BlockUiDialogContent,
    ErrorMessageDialog,
    ErrorMessageDialogContent,
    PdfRedactionMarkSettingsDialog,
    PdfRedactionMarkSettingsDialogContent,
    PdfImageResourceDialog,
    PdfImageResourceDialogContent,
    ImageSelectionDialog,
    ImageSelectionDialogContent,
    PdfRedactionMarkAppearanceDialog,
    PdfRedactionMarkAppearanceDialogContent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: PdfEditorDemoComponent, pathMatch: 'full' },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
