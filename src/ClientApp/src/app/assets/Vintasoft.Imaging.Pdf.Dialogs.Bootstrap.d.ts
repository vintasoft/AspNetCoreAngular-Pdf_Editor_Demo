// Copyright 2014-2026 VintaSoft LLC. All rights reserved.
// This software is protected by International copyright laws.
// Any copying, duplication, deployment, redistribution, modification or other
// disposition hereof is STRICTLY PROHIBITED without an express written license
// granted by VintaSoft LLC. This notice may not be removed or otherwise
// altered under any circumstances.
// This code may NOT be used apart of the VintaSoft product.
﻿// NAMESPACE
declare module Vintasoft.Imaging.Pdf.UI.Dialogs {

  // ===== CLASSES =====

  /**
   * A web UI dialog (based on the Bootstrap) that allows to view and edit the PDF redaction mark appearance.
   */
  class WebPdfRedactionMarkAppearanceDialogJS extends Vintasoft.Imaging.UI.Dialogs.WebUiDialogJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfRedactionMarkAppearanceDialogJS"] class.
     */
    constructor();

  }

  /**
   * A web UI dialog (based on the Bootstrap) that allows to view and edit the PDF redaction mark settings.
   */
  class WebUiPdfRedactionMarkSettingsDialogJS extends Vintasoft.Imaging.UI.Dialogs.WebUiDialogJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebUiPdfRedactionMarkSettingsDialogJS"] class.
     * @param pdfRedactionMark Redaction mark, which settings should be shown in dialog.
     */
    constructor(pdfRedactionMark: object);

  }

  /**
   * A web UI dialog (based on the Bootstrap) that allows to view information about a PDF image-resource.
   */
  class WebUiPdfImageResourceDialogJS extends Vintasoft.Imaging.UI.Dialogs.WebUiDialogJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebUiPdfImageResourceDialogJS"] class.
     * @param image An instance of [see="WebContentImageJS"] class.
     */
    constructor(image: object);

  }

  /**
   * A web UI dialog (based on the Bootstrap) that allows to convert a PDF document to a PDF/A format or verify PDF document for conformance to PDF/A format.
   */
  class WebUiPdfAConversionAndValidationDialogJS extends Vintasoft.Imaging.UI.Dialogs.WebUiDialogJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebUiPdfAConversionAndValidationDialogJS"] class.
     */
    constructor();

    // METHODS

    /**
     * Shows the dialog.
     */
    show(): void;

  }

  /**
   * A web UI dialog (based on the Bootstrap) that allows to compress a PDF document.
   */
  class WebPdfDocumentCompressorDialogJS extends Vintasoft.Imaging.UI.Dialogs.WebUiDialogJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfDocumentCompressorDialogJS"] class.
     */
    constructor();

    // METHODS

    /**
     * Creates and returns markup of UI element.
     * @param floatElementContainer A DOM-element, where floating elements must be placed.
     */
    render(floatElementContainer: object): object;

    /**
     * Creates and returns markup of UI element.
     */
    render(): object;

    /**
     * Shows the dialog.
     */
    show(): void;

  }

}

