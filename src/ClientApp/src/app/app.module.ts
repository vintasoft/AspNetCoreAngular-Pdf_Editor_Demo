import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { PdfEditorDemoComponent } from './pdf-editor-demo/pdf-editor-demo';
import { BlockUiDialog, BlockUiDialogContent } from './dialogs/block-ui-dialog';
import { ErrorMessageDialog, ErrorMessageDialogContent } from './dialogs/error-message-dialog';

@NgModule({
  declarations: [
    AppComponent,
    PdfEditorDemoComponent,
    BlockUiDialog,
    BlockUiDialogContent,
    ErrorMessageDialog,
    ErrorMessageDialogContent
  ],
  entryComponents: [
    BlockUiDialog,
    BlockUiDialogContent,
    ErrorMessageDialog,
    ErrorMessageDialogContent
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
