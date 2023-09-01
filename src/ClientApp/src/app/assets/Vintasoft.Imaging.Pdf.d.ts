// NAMESPACE
declare module Vintasoft.Imaging.Pdf {

  // ===== ENUMS =====

  /**
   * Specifies available types of PDF actions.
   */
  class WebPdfActionTypeEnumJS extends Vintasoft.Shared.WebEnumItemBaseJS {

    constructor(value: string);

  }

  /**
   * Specifies available destination types.
   */
  class WebPdfDestinationTypeEnumJS extends Vintasoft.Shared.WebEnumItemBaseJS {

    constructor(value: string);

  }

  /**
   * Specifies available bookmark flags.
   */
  class WebPdfBookmarkFlagsEnumJS extends Vintasoft.Shared.WebFlagsEnumItemBaseJS {

    constructor(value: string);

  }

  /**
   * Specifies available types of quadding (justification), which can be used in displaying the text.
   */
  class WebTextQuaddingTypeEnumJS extends Vintasoft.Shared.WebEnumItemBaseJS {

    constructor(value: string);

  }

  /**
   * Specifies available interaction modes, which define how the [see="WebPdfInteractiveFormToolJS"] can interact with PDF annotation.
   */
  class WebPdfInteractiveFormInteractionModeEnumJS extends Vintasoft.Shared.WebEnumItemBaseJS {

    constructor(value: string);

  }

  /**
   * Specifies available types of PDF annotations.
   */
  class WebPdfAnnotationTypeEnumJS extends Vintasoft.Shared.WebEnumItemBaseJS {

    constructor(value: string);

  }

  /**
   * Specifies available types of annotation border style.
   */
  class WebPdfAnnotationBorderStyleTypeEnumJS extends Vintasoft.Shared.WebEnumItemBaseJS {

    constructor(value: string);

  }

  /**
   * Specifies available barcode symbology types for barcode field.
   */
  class WebBarcodeSymbologyTypeEnumJS extends Vintasoft.Shared.WebEnumItemBaseJS {

    constructor(value: string);

  }

  /**
   * Specifies available types of PDF redaction marks.
   */
  class WebPdfRedactionMarkTypeEnumJS extends Vintasoft.Shared.WebFlagsEnumItemBaseJS {

    constructor(value: string);

  }

  /**
   * Specifies available alignment modes of PDF content.
   */
  class WebPdfContentAlignmentEnumJS extends Vintasoft.Shared.WebFlagsEnumItemBaseJS {

    constructor(value: string);

  }


  // ===== CLASSES =====

  /**
   * Manages opened PDF documents.
   */
  class WebPdfDocumentControllerJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfDocumentControllerJS"] class.
     */
    constructor();

    // METHODS

    /**
     * Opens the PDF document with specified identifier.
     * @param pdfDocumentId An identifier of PDF document.
     * @param pdfDocumentPassword Password of PDF document.
     * @param successFunc Function that will be executed if request is executed successfully.
     * @param errorFunc Function that will be executed if request is failed.
     * @param pdfService [see="WebServiceJS"] which allows to work with PDF documents.
     */
    static openPdfDocument(pdfDocumentId: string, pdfDocumentPassword: string, successFunc: Function, errorFunc: Function, pdfService: Vintasoft.Shared.WebServiceJS): void;

    /**
     * Opens the PDF document with specified identifier.
     * @param pdfDocumentId An identifier of PDF document.
     * @param successFunc Function that will be executed if request is executed successfully.
     * @param errorFunc Function that will be executed if request is failed.
     * @param pdfService [see="WebServiceJS"] which allows to work with PDF documents.
     */
    static openPdfDocument(pdfDocumentId: string, successFunc: Function, errorFunc: Function, pdfService: Vintasoft.Shared.WebServiceJS): void;

    /**
     * Opens the PDF document with specified identifier.
     * @param pdfDocumentId An identifier of PDF document.
     * @param pdfDocumentPassword Password of PDF document.
     * @param successFunc Function that will be executed if request is executed successfully.
     * @param errorFunc Function that will be executed if request is failed.
     */
    static openPdfDocument(pdfDocumentId: string, pdfDocumentPassword: string, successFunc: Function, errorFunc: Function): void;

    /**
     * Opens the PDF document with specified identifier.
     * @param pdfDocumentId An identifier of PDF document.
     * @param successFunc Function that will be executed if request is executed successfully.
     * @param errorFunc Function that will be executed if request is failed.
     */
    static openPdfDocument(pdfDocumentId: string, successFunc: Function, errorFunc: Function): void;

    /**
     * Returns an array of images, which are associated with specified pages of PDF document.
     * @param pdfDocument [see="WebPdfDocumentJS"] object.
     * @param imageService [see="WebServiceJS"] which allows to work with image. Default service will be used if this parameter is null.
     * @param annotationService [see="WebServiceJS"] which allows to annotate image. Default service will be used if this parameter is null.
     */
    static getImagesAssociatedWithPdfPages(pdfDocument: Vintasoft.Imaging.Pdf.WebPdfDocumentJS, imageService: Vintasoft.Shared.WebServiceJS, annotationService: Vintasoft.Shared.WebServiceJS): Vintasoft.Shared.WebImageJS[];

    /**
     * Returns an array of images, which are associated with specified pages of PDF document.
     * @param pdfDocument [see="WebPdfDocumentJS"] object.
     */
    static getImagesAssociatedWithPdfPages(pdfDocument: Vintasoft.Imaging.Pdf.WebPdfDocumentJS): Vintasoft.Shared.WebImageJS[];

    /**
     * Closes the previously opened PDF document.
     * @param pdfDocument An instance of [see="WebPdfDocumentJS"] class that defines the previously opened PDF document.
     */
    static closeDocument(pdfDocument: Vintasoft.Imaging.Pdf.WebPdfDocumentJS): void;

    /**
     * Returns all opened PDF documents.
     */
    static getAllOpenedDocuments(): Vintasoft.Imaging.Pdf.WebPdfDocumentJS[];

    /**
     * Returns a [see="WebPdfDocumentJS"] object associated with specified [see="WebImageJS"] object.
     * @param image [see="WebImageJS"] object.
     */
    static getPageAssociatedWithImage(image: Vintasoft.Shared.WebImageJS): Vintasoft.Imaging.Pdf.WebPdfPageJS;

  }

  /**
   * Provides an abstract base class for all objects in the tree of PDF document.
   */
  class WebPdfTreeNodeBaseJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfTreeNodeBaseJS"] class.
     * @param document [see="WebPdfDocumentJS"] object.
     */
    constructor(document: Vintasoft.Imaging.Pdf.WebPdfDocumentJS);

    // PROPERTIES

    /**
     * Gets the parent PDF document of this resource.
     */
    get_PdfDocument(): Vintasoft.Imaging.Pdf.WebPdfDocumentJS;

    /**
     * Gets the unique object number in PDF document.
     */
    get_ObjectNumber(): number;

  }

  /**
   * Provides the abstract base class for PDF destinations.
   */
  class WebPdfDestinationBaseJS extends Vintasoft.Imaging.Pdf.WebPdfTreeNodeBaseJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfDestinationBaseJS"] class.
     * @param page The PDF page designated for this destination.
     */
    constructor(page: Vintasoft.Imaging.Pdf.WebPdfPageJS);

    /**
     * Initializes a new instance of the [see= "WebPdfDestinationBaseJS"] class.
     * @param page The PDF document designated for this destination.
     */
    constructor(page: Vintasoft.Imaging.Pdf.WebPdfDocumentJS);

    // PROPERTIES

    /**
     * Gets a destination type.
     */
    get_DestinationType(): Vintasoft.Imaging.Pdf.WebPdfDestinationTypeEnumJS;

    /**
     * Gets the page designated for this destination.
     */
    get_Page(): Vintasoft.Imaging.Pdf.WebPdfPageJS;

    /**
     * Gets the index of page designated for this destination.
     */
    get_PageIndex(): number;

  }

  /**
   * Represents a PDF destination that displays the page designated by page, with its contents magnified just enough to fit the entire page within the window both horizontally and vertically.
   */
  class WebPdfDestinationFitJS extends Vintasoft.Imaging.Pdf.WebPdfDestinationBaseJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfDestinationFitJS"] class.
     * @param page The page designated for this destination.
     */
    constructor(page: Vintasoft.Imaging.Pdf.WebPdfPageJS);

  }

  /**
   * Represents a PDF destination that displays the page designated by page, with its contents magnified just enough to fit its bounding box entirely within the window both horizontally and vertically. If the required horizontal and vertical magnification factors are different, use the smaller of the two, centering the bounding box within the window in the other dimension.
   */
  class WebPdfDestinationFitBJS extends Vintasoft.Imaging.Pdf.WebPdfDestinationBaseJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfDestinationFitBJS"] class.
     * @param page The page designated for this destination.
     */
    constructor(page: Vintasoft.Imaging.Pdf.WebPdfPageJS);

  }

  /**
   * Represents a PDF destination that displays the page designated by page, with the vertical coordinate top positioned at the top edge of the window and the contents of the page magnified just enough to fit the entire width of its bounding box within the window. A null value for top specifies that the current value of that parameter is to be retained unchanged.
   */
  class WebPdfDestinationFitBHorizontalJS extends Vintasoft.Imaging.Pdf.WebPdfDestinationBaseJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfDestinationFitBHorizontalJS"] class.
     * @param page The page designated for this destination.
     */
    constructor(page: Vintasoft.Imaging.Pdf.WebPdfPageJS);

    // PROPERTIES

    /**
     * Gets the y-coordinate of the top edge of this destination.
     */
    get_Top(): number;

    /**
     * Sets the y-coordinate of the top edge of this destination.
     * @param value The y-coordinate of the top edge of this destination OR null. A null value specifies that the property value is to be retained unchanged.
     */
    set_Top(value: number): void;

  }

  /**
   * Represents a PDF destination that displays the page designated by page, with the horizontal coordinate left positioned at the left edge of the window and the contents of the page magnified just enough to fit the entire height of its bounding box within the window. A null value for left specifies that the current value of that parameter is to be retained unchanged.
   */
  class WebPdfDestinationFitBVerticalJS extends Vintasoft.Imaging.Pdf.WebPdfDestinationBaseJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfDestinationFitBVerticalJS"] class.
     * @param page The page designated for this destination.
     */
    constructor(page: Vintasoft.Imaging.Pdf.WebPdfPageJS);

    // PROPERTIES

    /**
     * Gets the x-coordinate of the left edge of this destination.
     */
    get_Left(): number;

    /**
     * Sets the x-coordinate of the left edge of this destination.
     * @param value The x-coordinate of the left edge of this destination. A null value specifies that the property value is to be retained unchanged.
     */
    set_Left(value: number): void;

  }

  /**
   * Represents a PDF destination that displays the page designated by page, with the vertical coordinate top positioned at the top edge of the window and the contents of the page magnified just enough to fit the entire width of the page within the window. A null value for top specifies that the current value of that parameter is to be retained unchanged.
   */
  class WebPdfDestinationFitHorizontalJS extends Vintasoft.Imaging.Pdf.WebPdfDestinationBaseJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfDestinationFitHorizontalJS"] class.
     * @param page The page designated for this destination.
     */
    constructor(page: Vintasoft.Imaging.Pdf.WebPdfPageJS);

    // PROPERTIES

    /**
     * Gets the y-coordinate of the top edge of this destination.
     */
    get_Top(): number;

    /**
     * Sets the y-coordinate of the top edge of this destination.
     * @param value The y-coordinate of the top edge of this destination OR null. A null value specifies that the property value is to be retained unchanged.
     */
    set_Top(value: number): void;

  }

  /**
   * Represents a PDF destination that displays the page designated by page, with its contents magnified just enough to fit the rectangle specified by the coordinates left, bottom, right, and top entirely within the window both horizontally and vertically. If the required horizontal and vertical magnification factors are different, use the smaller of the two, centering the rectangle within the window in the other dimension. A null value for any of the parameters may result in unpredictable behavior.
   */
  class WebPdfDestinationFitRectangleJS extends Vintasoft.Imaging.Pdf.WebPdfDestinationBaseJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfDestinationFitRectangleJS"] class.
     * @param page The page designated for this destination.
     */
    constructor(page: Vintasoft.Imaging.Pdf.WebPdfPageJS);

    // PROPERTIES

    /**
     * Gets the rectangle of this destination.
     */
    get_Rectangle(): object;

    /**
     * Sets the rectangle of this destination.
     * @param value The rectangle of this destination.
     */
    set_Rectangle(value: object): void;

  }

  /**
   * Represents a PDF destination that displays the page designated by page, with the horizontal coordinate left positioned at the left edge of the window and the contents of the page magnified just enough to fit the entire height of the page within the window. A null value for left specifies that the current value of that parameter is to be retained unchanged.
   */
  class WebPdfDestinationFitVerticalJS extends Vintasoft.Imaging.Pdf.WebPdfDestinationBaseJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfDestinationFitVerticalJS"] class.
     * @param page The page designated for this destination.
     */
    constructor(page: Vintasoft.Imaging.Pdf.WebPdfPageJS);

    // PROPERTIES

    /**
     * Gets the x-coordinate of the left edge of this destination.
     */
    get_Left(): number;

    /**
     * Sets the x-coordinate of the left edge of this destination.
     * @param value The x-coordinate of the left edge of this destination OR null. A null value specifies that the property value is to be retained unchanged.
     */
    set_Left(value: number): void;

  }

  /**
   * Represents a PDF destination that displays the page designated by page, with the coordinates (left, top) positioned at the upper-left corner of the window and the contents of the page magnified by the factor zoom. A null value for any of the parameters left, top, or zoom specifies that the current value of that parameter is to be retained unchanged. A zoom value of 0 has the same meaning as a null value.
   */
  class WebPdfDestinationXYZJS extends Vintasoft.Imaging.Pdf.WebPdfDestinationBaseJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfDestinationXYZJS"] class.
     * @param page The page designated for this destination.
     */
    constructor(page: Vintasoft.Imaging.Pdf.WebPdfPageJS);

    // PROPERTIES

    /**
     * Gets the y-coordinate of the top edge of this destination.
     */
    get_Top(): number;

    /**
     * Sets the y-coordinate of the top edge of this destination.
     * @param value The y-coordinate of the top edge of this destination OR null. A null value specifies that the proeprty value is to be retained unchanged.
     */
    set_Top(value: number): void;

    /**
     * Gets the x-coordinate of the left edge of this destination.
     */
    get_Left(): number;

    /**
     * Sets the x-coordinate of the left edge of this destination.
     * @param value The x-coordinate of the left edge of this destination OR null. A null value specifies that the proeprty value is to be retained unchanged.
     */
    set_Left(value: number): void;

    /**
     * Gets the zoom.
     */
    get_Zoom(): number;

    /**
     * Sets the zoom.
     * @param value Zoom OR null. A null value specifies that the proeprty value is to be retained unchanged.
     */
    set_Zoom(value: number): void;

  }

  /**
   * Provides a base class for action associated with PDF element (page, bookmark, link, annotation...).
   */
  class WebPdfActionJS extends Vintasoft.Imaging.Pdf.WebPdfTreeNodeBaseJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfActionJS"] class.
     * @param document [see="WebPdfDocumentJS"] object.
     */
    constructor(document: Vintasoft.Imaging.Pdf.WebPdfDocumentJS);

    // PROPERTIES

    /**
     * Gets the action type.
     */
    get_ActionType(): Vintasoft.Imaging.Pdf.WebPdfActionTypeEnumJS;

    // METHODS

    /**
     * Executes this action.
     */
    execute(): boolean;

  }

  /**
   * Represents a go-to action associated with PDF element (bookmark, link,...).
   */
  class WebPdfGoToActionJS extends Vintasoft.Imaging.Pdf.WebPdfActionJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfGoToActionJS"] class.
     * @param document [see="WebPdfDocumentJS"] object.
     */
    constructor(document: Vintasoft.Imaging.Pdf.WebPdfDocumentJS);

    // PROPERTIES

    /**
     * Gets the destination to jump to.
     */
    get_Destination(): Vintasoft.Imaging.Pdf.WebPdfDestinationBaseJS;

    /**
     * Sets the destination to jump to.
     * @param value Instance of [see="WebPdfDestinationBaseJS"] class.
     */
    set_Destination(value: Vintasoft.Imaging.Pdf.WebPdfDestinationBaseJS): void;

  }

  /**
   * Represents an action between the uniform resource identifier (URI) and PDF element (bookmark, link,...).
   */
  class WebPdfUriActionJS extends Vintasoft.Imaging.Pdf.WebPdfActionJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfUriActionJS"] class.
     * @param document [see="WebPdfDocumentJS"] object.
     */
    constructor(document: Vintasoft.Imaging.Pdf.WebPdfDocumentJS);

    // PROPERTIES

    /**
     * Gets the uniform resource identifier to resolve.
     */
    get_Uri(): string;

    /**
     * Sets the uniform resource identifier to resolve.
     * @param value The uniform resource identifier to resolve.
     */
    set_Uri(value: string): void;

  }

  /**
   * Provides an abstract base class for PDF action executors.
   */
  class WebPdfActionExecutorBaseJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfActionExecutorBaseJS"] class.
     */
    constructor();

    // METHODS

    /**
     * Executes a sequence of actions.
     * @param action The action sequence.
     */
    executeActionSequence(action: object): void;

    /**
     * Executes the action.
     * @param action The action.
     */
    executeAction(action: object): void;

  }

  /**
   * Represents the composite executor of an action.
   */
  class WebPdfActionCompositeExecutorJS extends Vintasoft.Imaging.Pdf.WebPdfActionExecutorBaseJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfActionCompositeExecutorJS"] class.
     * @param items Array of [see="WebPdfActionExecutorBaseJS"] objects.
     */
    constructor(items: Vintasoft.Imaging.Pdf.WebPdfActionExecutorBaseJS);

    // PROPERTIES

    /**
     * Gets a value indicating whether this action executor is enabled.
     */
    get_IsEnabled(): boolean;

    /**
     * Sets a value indicating whether this action executor is enabled.
     * @param value True if this action executor is enabled (executes actions); otherwise, false (not executes actions). Default value is true.
     */
    set_IsEnabled(value: boolean): void;

    /**
     * Gets the action executors of this composite action executor.
     */
    get_Items(): Vintasoft.Imaging.Pdf.WebPdfActionExecutorBaseJS;

    // METHODS

    /**
     * Executes the action.
     * @param action The action
     */
    executeAction(action: object): void;

  }

  /**
   * Provides a base class of action executors for instance of [see="WebImageViewerJS"] class.
   */
  class WebPdfImageViewerActionExecutorJS extends Vintasoft.Imaging.Pdf.WebPdfActionExecutorBaseJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfImageViewerActionExecutorJS"] class.
     * @param viewer Instance of [see="WebImageViewerJS"] class.
     */
    constructor(viewer: Vintasoft.Imaging.UI.WebImageViewerJS);

    // PROPERTIES

    /**
     * Gets an image viewer, which is associated with this action executor.
     */
    get_Viewer(): Vintasoft.Imaging.UI.WebImageViewerJS;

    /**
     * Sets an image viewer, which is associated with this action executor.
     * @param value Instance of [see="WebImageViewerJS"] class.
     */
    set_Viewer(value: Vintasoft.Imaging.UI.WebImageViewerJS): void;

  }

  /**
   * Represents an executor of [see="WebPdfGoToActionJS"] actions that performs navigation in [see="WebImageViewerJS"].
   */
  class WebPdfGotoActionExecutorJS extends Vintasoft.Imaging.Pdf.WebPdfImageViewerActionExecutorJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfGotoActionExecutorJS"] class.
     * @param viewer Instance of [see="WebImageViewerJS"] class.
     */
    constructor(viewer: Vintasoft.Imaging.UI.WebImageViewerJS);

    // METHODS

    /**
     * Executes the action.
     * @param action The action.
     */
    executeAction(action: object): boolean;

  }

  /**
   * Provides an abstract base class that contains information about resource of PDF document.
   */
  class WebPdfResourceJS extends Vintasoft.Imaging.Pdf.WebPdfTreeNodeBaseJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfResourceJS"] class.
     * @param document [see="WebPdfDocumentJS"] object.
     * @param compression Compression of this resource.
     * @param length Length, in bytes, of the resource.
     */
    constructor(document: Vintasoft.Imaging.Pdf.WebPdfDocumentJS, compression: string, length: number);

    // PROPERTIES

    /**
     * Gets a compression of this resource.
     */
    get_Compression(): string;

    /**
     * Gets the length, in bytes, of this resource.
     */
    get_Length(): number;

    // METHODS

    /**
     * Returns the data of this resource.
     */
    getResourceData(): string;

    /**
     * Determines that data of this resource is received.
     */
    isResourceDataReceived(): boolean;

    /**
     * Sends an asynchronous request for getting data of this PDF resource.
     * @param successFunc Function that will be executed if request is executed successfully. Here is function prototype "function __success(data)".<br/> The data parameter has the following properties:<br/> <ul> <li>data (string): Resource data.</li> </ul>
     * @param errorFunc Function that will be executed if request is failed. Here is function prototype "function __error(data)".<br/> The data parameter can be:<br/> <ol> <li>An object with following properties:<br/> <ul> <li>errorMessage (string): Error message.</li> <li>blocked (boolean): Indicates that the requested action is blocked by another request.</li> </ul> if exception is catched inside web service. </li> <li>Otherwise, jqXHR object.</li> </ol>
     */
    requestResourceData(successFunc: Function, errorFunc: Function): void;

  }

  /**
   * Represents an image resource of PDF document.
   */
  class WebPdfImageResourceJS extends Vintasoft.Imaging.Pdf.WebPdfResourceJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfImageResourceJS"] class.
     * @param document An instance of [see="WebPdfDocumentJS"] class.
     * @param compression Compression of this resource.
     * @param length Length, in bytes, of the resource.
     * @param size Image size.
     * @param pixelFormat An instance of [see="WebPixelFormatEnumJS"] class that defines the image pixel format.
     */
    constructor(document: Vintasoft.Imaging.Pdf.WebPdfDocumentJS, compression: string, length: number, size: object, pixelFormat: Vintasoft.Shared.WebPixelFormatEnumJS);

    // PROPERTIES

    /**
     * Gets size of image associated with this image resource.
     */
    get_Size(): object;

    /**
     * Gets the image pixel format.
     */
    get_PixelFormat(): Vintasoft.Shared.WebPixelFormatEnumJS;

  }

  /**
   * Represents an image located on PDF page.
   */
  class WebContentImageJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebContentImageJS"] class.
     * @param imageResource Image resource associated with this content image.
     * @param region Region of content image in coordinates of PDF page.
     * @param resolution Rendering resolution of content image.
     */
    constructor(imageResource: Vintasoft.Imaging.Pdf.WebPdfImageResourceJS, region: object, resolution: object);

    // PROPERTIES

    /**
     * Gets the image resourse associated with this image.
     */
    get_Resource(): Vintasoft.Imaging.Pdf.WebPdfImageResourceJS;

    /**
     * Gets a region of content image.
     */
    get_Region(): object;

    /**
     * Gets a rendering resolution of content image.
     */
    get_Resolution(): object;

    // METHODS

    /**
     * Determines that this image contains specified point.
     * @param point Point.
     */
    containsPoint(point: object): boolean;

    /**
     * Sends an asynchronous request for getting data about the resource of the current image.
     * @param successFunc Function that will be executed if request is executed successfully. Here is function prototype "function __success(data)".<br/> The data parameter has the following properties:<br/> <ul> <li>data (string): Resource data.</li> </ul>
     * @param errorFunc Function that will be executed if request is failed. Here is function prototype "function __error(data)".<br/> The data parameter can be:<br/> <ol> <li>An object with following properties:<br/> <ul> <li>errorMessage (string): Error message.</li> <li>blocked (boolean): Indicates that the requested action is blocked by another request.</li> </ul> if exception is catched inside web service. </li> <li>Otherwise, jqXHR object.</li> </ol>
     */
    requestResourceData(successFunc: Function, errorFunc: Function): void;

  }

  /**
   * Represents a bookmark of PDF document.
   */
  class WebPdfBookmarkJS extends Vintasoft.Imaging.Pdf.WebPdfTreeNodeBaseJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfBookmarkJS"] class.
     * @param document An instance of [see="WebPdfDocumentJS"] class.
     */
    constructor(document: Vintasoft.Imaging.Pdf.WebPdfDocumentJS);

    // PROPERTIES

    /**
     * Gets the text to be displayed on the screen for this bookmark.
     */
    get_Title(): string;

    /**
     * Sets the text to be displayed on the screen for this bookmark.
     * @param value The text to be displayed on the screen for this bookmark.
     */
    set_Title(value: string): void;

    /**
     * Gets the flags specifying style characteristics for displaying the bookmark item's text.
     */
    get_Flags(): Vintasoft.Imaging.Pdf.WebPdfBookmarkFlagsEnumJS;

    /**
     * Sets the flags specifying style characteristics for displaying the bookmark item's text.
     * @param value A [see="WebPdfBookmarkFlagsEnumJS"] object.
     */
    set_Flags(value: Vintasoft.Imaging.Pdf.WebPdfBookmarkFlagsEnumJS): void;

    /**
     * Gets a color of bookmark entry's text.
     */
    get_Color(): string;

    /**
     * Sets a color of bookmark entry's text.
     * @param value A color of bookmark entry's text.
     */
    set_Color(value: string): void;

    /**
     * Gets an array that contains the first-level child bookmarks of this bookmark.
     */
    get_ChildBookmarks(): Vintasoft.Imaging.Pdf.WebPdfBookmarkJS[];

    /**
     * Sets an array that contains the first-level child bookmarks of this bookmark.
     * @param value An array of [see="WebPdfBookmarkJS"] objects.
     */
    set_ChildBookmarks(value: Vintasoft.Imaging.Pdf.WebPdfBookmarkJS[]): void;

    /**
     * Gets the destination to be displayed when this bookmark is activated.
     */
    get_Destination(): Vintasoft.Imaging.Pdf.WebPdfDestinationBaseJS;

    /**
     * Sets the destination to be displayed when this bookmark is activated.
     * @param value [see="WebPdfDestinationBaseJS"] object OR null.
     */
    set_Destination(value: Vintasoft.Imaging.Pdf.WebPdfDestinationBaseJS): void;

    /**
     * Gets an action to be performed when this bookmark is activated.
     */
    get_Action(): Vintasoft.Imaging.Pdf.WebPdfActionJS;

    /**
     * Sets an action to be performed when this bookmark is activated.
     * @param value [see="WebPdfActionJS"] object OR null.
     */
    set_Action(value: Vintasoft.Imaging.Pdf.WebPdfActionJS): void;

  }

  /**
   * Represents a PDF annotation.
   */
  class WebPdfAnnotationJS extends Vintasoft.Imaging.Pdf.WebPdfTreeNodeBaseJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfAnnotationJS"] class.
     * @param page [see="WebPdfPageJS"] object.
     */
    constructor(page: Vintasoft.Imaging.Pdf.WebPdfPageJS);

    // PROPERTIES

    /**
     * Gets the page designated for this annotation.
     */
    get_Page(): Vintasoft.Imaging.Pdf.WebPdfPageJS;

    /**
     * Gets the annotation rectangle, defining the location of annotation on the page in default user space units.
     */
    get_Rectangle(): object;

    /**
     * Sets the annotation rectangle, defining the location of annotation on the page in default user space units.
     * @param value Annotation rectangle.
     */
    set_Rectangle(value: object): void;

    /**
     * Gets an action to be performed when the link is activated.
     */
    get_ActivateAction(): Vintasoft.Imaging.Pdf.WebPdfActionJS;

    /**
     * Sets an action to be performed when the link is activated.
     * @param value [see="WebPdfActionJS"] object.
     */
    set_ActivateAction(value: Vintasoft.Imaging.Pdf.WebPdfActionJS): void;

    /**
     * Gets the type of annotation.
     */
    get_AnnotationType(): Vintasoft.Imaging.Pdf.WebPdfAnnotationTypeEnumJS;

  }

  /**
   * Represents a PDF link.
   */
  class WebPdfLinkJS extends Vintasoft.Imaging.Pdf.WebPdfAnnotationJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfLinkJS"] class.
     * @param page [see="WebPdfPageJS"] object.
     */
    constructor(page: Vintasoft.Imaging.Pdf.WebPdfPageJS);

  }

  /**
   * Represents a PDF Widget annotation that displays PDF interactive element.
   */
  class WebPdfWidgetAnnotationJS extends Vintasoft.Imaging.Pdf.WebPdfAnnotationJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfWidgetAnnotationJS"] class.
     * @param page A PDF page, which is associated with annotation.
     */
    constructor(page: Vintasoft.Imaging.Pdf.WebPdfPageJS);

    // PROPERTIES

    /**
     * Gets an interactive form field associated with this widget annotation.
     */
    get_Field(): Vintasoft.Imaging.Pdf.WebPdfInteractiveFormFieldJS;

    /**
     * Gets a RGB color of the widget annotation's border.
     */
    get_BorderColor(): string;

    /**
     * Sets a RGB color of the widget annotation's border.
     * @param value RGB color of the widget annotation's border.
     */
    set_BorderColor(value: string): void;

    /**
     * Gets a color of the widget annotation's background.
     */
    get_BackgroundColor(): string;

    /**
     * Sets a color of the widget annotation's background.
     * @param value A color of the widget annotation's background.
     */
    set_BackgroundColor(value: string): void;

    /**
     * Gets a width of annotation border in points (user units).
     */
    get_BorderWidth(): number;

    /**
     * Sets a width of annotation border in points (user units).
     * @param value Width of annotation border in points. Default value is 1.
     */
    set_BorderWidth(value: number): void;

    /**
     * Gets or sets the type of the type of border style.
     */
    get_BorderStyleType(): Vintasoft.Imaging.Pdf.WebPdfAnnotationBorderStyleTypeEnumJS;

    /**
     * Gets or sets the type of the type of border style.
     * @param value An element of WebPdfAnnotationBorderStyleTypeEnumJS enumeration that defines the type of border style. Default value is "Default".
     */
    set_BorderStyleType(value: Vintasoft.Imaging.Pdf.WebPdfAnnotationBorderStyleTypeEnumJS): void;

  }

  /**
   * Represents a PDF document.
   */
  class WebPdfDocumentJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfDocumentJS"] class.
     * @param id The identifier of PDF document.
     * @param service A [see="WebServiceJS"], which allows to work with PDF documents.
     */
    constructor(id: string, service: Vintasoft.Shared.WebServiceJS);

    // PROPERTIES

    /**
     * Gets an identifier that determines the PDF file source.
     */
    get_Id(): string;

    /**
     * Gets the web service that allows to work with PDF document.
     */
    get_WebService(): Vintasoft.Shared.WebServiceJS;

    /**
     * Gets a value indicating whether the PDF document has been disposed of.
     */
    get_IsDisposed(): boolean;

    /**
     * Gets the PDF document password.
     */
    get_Password(): string;

    /**
     * Sets the PDF document password.
     * @param value The PDF document password.
     */
    set_Password(value: string): void;

    // METHODS

    /**
     * Returns information (author, modification date, etc) about PDF document.
     */
    getDocumentInfo(): object;

    /**
     * Determines that document information is received.
     */
    isDocumentInfoReceived(): boolean;

    /**
     * Returns the bookmarks of this PDF document.
     */
    getBookmarks(): Vintasoft.Imaging.Pdf.WebPdfBookmarkJS[];

    /**
     * Returns the [see="WebPdfDocumentInteractiveFormJS"] object of this PDF document.
     */
    getInteractiveForm(): Vintasoft.Imaging.Pdf.WebPdfDocumentInteractiveFormJS;

    /**
     * Determines that information about bookmarks are received.
     */
    isBookmarksReceived(): boolean;

    /**
     * Determines that information about PDF document interactive form is received.
     */
    isInteractiveFormReceived(): boolean;

    /**
     * Returns a page of this PDF document.
     * @param index Zero-based index of page of this PDF document.
     */
    getPage(index: number): Vintasoft.Imaging.Pdf.WebPdfPageJS;

    /**
     * Returns an array of pages of this PDF document.
     */
    getPages(): Vintasoft.Imaging.Pdf.WebPdfPageJS[];

    /**
     * Sends an asynchronous request for getting information about this PDF document.
     * @param successFunc Function that will be executed if request is executed successfully. Here is function prototype "function __success(data)".<br/> The data parameter has the following properties:<br/> <ul> <li>id (string): an identifier of PDF document.</li> <li>documentInfo (object): information about PDF document. Document information object has the following properties:<br/> <ul> <li>author (string): the name of the person who created the document.</li> <li>creationDate (string): the date and time the document was created.</li> <li>creator (string): the document creator.</li> <li>keywords (string): keywords associated with the document.</li> <li>modifyDate (string): the date and time the document was most recently modified.</li> <li>producer (string): the document producer.</li> <li>subject (string): the subject of the document.</li> <li>title (string): the title of the document.</li> <li>encryptionSystem (string): an information about encryption system.</li> <li>pageCount (number): the number of pages contained in the document.</li> </ul> </li> </ul>
     * @param errorFunc Function that will be executed if request is failed. Here is function prototype "function __error(data)".<br/> The data parameter can be:<br/> <ol> <li>An object with following properties:<br/> <ul> <li>errorMessage (string): Error message.</li> <li>blocked (boolean): Indicates that the requested action is blocked by another request.</li> </ul> if exception is catched inside web service. </li> <li>Otherwise, jqXHR object.</li> </ol>
     */
    requestDocumentInfo(successFunc: Function, errorFunc: Function): void;

    /**
     * Sends an asynchronous request for getting information about bookmarks of this PDF document.
     * @param successFunc Function that will be executed if request is executed successfully. Here is function prototype "function __success(data)".<br/> The data parameter has the following properties:<br/> <ul> <li>bookmarks (object): An array of [see="WebPdfBookmarkJS"] objects that defines all bookmarks associated with this PDF document.</li> </ul>
     * @param errorFunc Function that will be executed if request is failed. Here is function prototype "function __error(data)".<br/> The data parameter can be:<br/> <ol> <li>An object with following properties:<br/> <ul> <li>errorMessage (string): Error message.</li> <li>blocked (boolean): Indicates that the requested action is blocked by another request.</li> </ul> if exception is catched inside web service. </li> <li>Otherwise, jqXHR object.</li> </ol>
     */
    requestBookmarks(successFunc: Function, errorFunc: Function): void;

    /**
     * Sends an asynchronous request for getting data of specified PDF resource.
     * @param pdfResource [see="WebPdfResourceJS"] object.
     * @param successFunc Function that will be executed if request is executed successfully. Here is function prototype "function __success(data)".<br/> The data parameter depends on PDF resource type.
     * @param errorFunc Function that will be executed if request is failed. Here is function prototype "function __error(data)".<br/> The data parameter can be:<br/> <ol> <li>An object with following properties:<br/> <ul> <li>errorMessage (string): Error message.</li> <li>blocked (boolean): Indicates that the requested action is blocked by another request.</li> </ul> if exception is catched inside web service. </li> <li>Otherwise, jqXHR object.</li> </ol>
     */
    requestResourceData(pdfResource: Vintasoft.Imaging.Pdf.WebPdfResourceJS, successFunc: Function, errorFunc: Function): void;

    /**
     * Sends an asynchronous request for getting information about specified PDF resource.
     * @param pdfResource [see="WebPdfResourceJS"] object.
     * @param successFunc Function that will be executed if request is executed successfully. Here is function prototype "function __success(data)".<br/> The data parameter depends on PDF resource type.
     * @param errorFunc Function that will be executed if request is failed. Here is function prototype "function __error(data)".<br/> The data parameter can be:<br/> <ol> <li>An object with following properties:<br/> <ul> <li>errorMessage (string): Error message.</li> <li>blocked (boolean): Indicates that the requested action is blocked by another request.</li> </ul> if exception is catched inside web service. </li> <li>Otherwise, jqXHR object.</li> </ol>
     */
    requestResourceInfo(pdfResource: Vintasoft.Imaging.Pdf.WebPdfResourceJS, successFunc: Function, errorFunc: Function): void;

    /**
     * Sends an asynchronous request for getting information about interactive form of this PDF document.
     * @param successFunc Function that will be executed if request is executed successfully. Here is function prototype "function __success(data)".<br/> The data parameter has the following properties:<br/> <ul> <li>interactiveForm (object): [see="WebPdfDocumentInteractiveFormJS"] object, which defines the interactive form of this PDF document, OR null if this PDF document does not have interactive form.</li> </ul>
     * @param errorFunc Function that will be executed if request is failed. Here is function prototype "function __error(data)".<br/> The data parameter can be:<br/> <ol> <li>An object with following properties:<br/> <ul> <li>errorMessage (string): Error message.</li> <li>blocked (boolean): Indicates that the requested action is blocked by another request.</li> </ul> if exception is catched inside web service. </li> <li>Otherwise, jqXHR object.</li> </ol>
     */
    requestInteractiveForm(successFunc: Function, errorFunc: Function): void;

    /**
     * Sends an asynchronous request for updating of PDF interactive form.
     * @param successFunc Function that will be executed if request is executed successfully. Here is function prototype "function __success(data)".<br/>
     * @param errorFunc Function that will be executed if request is failed. Here is function prototype "function __error(data)".<br/> The data parameter can be:<br/> <ol> <li>An object with following properties:<br/> <ul> <li>errorMessage (string): Error message.</li> <li>blocked (boolean): Indicates that the requested action is blocked by another request.</li> </ul> if exception is catched inside web service. </li> <li>Otherwise, jqXHR object.</li> </ol>
     */
    updateInteractiveForm(successFunc: Function, errorFunc: Function): void;

    /**
     * Sends an asynchronous request for applying of redaction marks to PDF document.
     * @param redactionMarks Array of [see="WebPdfPageRedactionMarkJS"] objects.
     * @param redactionMarksAppearance Appearance of the redaction marks OR null.
     * @param successFunc Function that will be executed if request is executed successfully. Here is function prototype "function __success(data)".<br/>
     * @param errorFunc Function that will be executed if request is failed. Here is function prototype "function __error(data)".<br/> The data parameter can be:<br/> <ol> <li>An object with following properties:<br/> <ul> <li>errorMessage (string): Error message.</li> <li>blocked (boolean): Indicates that the requested action is blocked by another request.</li> </ul> if exception is catched inside web service. </li> <li>Otherwise, jqXHR object.</li> </ol>
     */
    applyRedactionMarks(redactionMarks: Vintasoft.Imaging.Pdf.WebPdfPageRedactionMarkJS[], redactionMarksAppearance: Vintasoft.Imaging.Pdf.WebPdfRedactionMarkAppearanceJS, successFunc: Function, errorFunc: Function): void;

    /**
     * Disposes the PDF document.
     */
    dispose(): void;

  }

  /**
   * Represents a page of PDF document.
   */
  class WebPdfPageJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfPageJS"] class.
     * @param pdfDocument The parent PDF document of this PDF page.
     * @param pageIndex Zero-based index of page in PDF document.
     */
    constructor(pdfDocument: Vintasoft.Imaging.Pdf.WebPdfDocumentJS, pageIndex: number);

    // PROPERTIES

    /**
     * Gets the parent PDF document of this page.
     */
    get_Document(): Vintasoft.Imaging.Pdf.WebPdfDocumentJS;

    /**
     * Gets a zero-based index of this page in PDF document.
     */
    get_PageIndex(): number;

    /**
     * Gets the unique guid associated with this page.
     */
    get_Guid(): string;

    // METHODS

    /**
     * Returns all image resources associated with this PDF page.
     */
    getContentImages(): Vintasoft.Imaging.Pdf.WebContentImageJS[];

    /**
     * Determines that content images are received.
     */
    isContentImagesReceived(): boolean;

    /**
     * Returns all links associated with this PDF page.
     */
    getLinks(): Vintasoft.Imaging.Pdf.WebPdfLinkJS[];

    /**
     * Determines that links are received.
     */
    isLinksReceived(): boolean;

    /**
     * Determines that information about transformation from page space to the image space is received.
     */
    isTransformFromPageSpaceToImageSpaceReceived(): boolean;

    /**
     * Returns the transformation matrix from page space to the image space.
     * @param resolution Image resolution.
     */
    getTrasformFromPageSpaceToImageSpace(resolution: object): Vintasoft.Imaging.Utils.WebMatrixJS;

    /**
     * Sends an asynchronous request for getting all image resources associated with this PDF page.
     * @param successFunc Function that will be executed if request is executed successfully. Here is function prototype "function __success(data)".<br/> The data parameter has the following properties:<br/> <ul> <li>contentImages (object): Array of [see="WebContentImageJS"] objects that defines all image resources associated with this PDF page.</li> </ul>
     * @param errorFunc Function that will be executed if request is failed. Here is function prototype "function __error(data)".<br/> The data parameter can be:<br/> <ol> <li>An object with following properties:<br/> <ul> <li>errorMessage (string): Error message.</li> <li>blocked (boolean): Indicates that the requested action is blocked by another request.</li> </ul> if exception is catched inside web service. </li> <li>Otherwise, jqXHR object.</li> </ol>
     */
    requestContentImages(successFunc: Function, errorFunc: Function): void;

    /**
     * Sends an asynchronous request for getting all links associated with this PDF page.
     * @param successFunc Function that will be executed if request is executed successfully. Here is function prototype "function __success(data)".<br/> The data parameter has the following properties:<br/> <ul> <li>links (object): An array of [see="WebPdfLinkJS"] objects that defines all links associated with this PDF page.</li> </ul>
     * @param errorFunc Function that will be executed if request is failed. Here is function prototype "function __error(data)".<br/> The data parameter can be:<br/> <ol> <li>An object with following properties:<br/> <ul> <li>errorMessage (string): Error message.</li> <li>blocked (boolean): Indicates that the requested action is blocked by another request.</li> </ul> if exception is catched inside web service. </li> <li>Otherwise, jqXHR object.</li> </ol>
     */
    requestLinks(successFunc: Function, errorFunc: Function): void;

    /**
     * Sends an asynchronous request for getting parameters of PDF page (page index, transformation matrix, media box, etc).
     * @param successFunc Function that will be executed if request is executed successfully. Here is function prototype "function __success(data)".<br/> The data parameter has the following properties:<br/> <ul> <li>links (object): An array of [see="WebPdfLinkJS"] objects that defines all links associated with this PDF page.</li> </ul>
     * @param errorFunc Function that will be executed if request is failed. Here is function prototype "function __error(data)".<br/> The data parameter can be:<br/> <ol> <li>An object with following properties:<br/> <ul> <li>errorMessage (string): Error message.</li> <li>blocked (boolean): Indicates that the requested action is blocked by another request.</li> </ul> if exception is catched inside web service. </li> <li>Otherwise, jqXHR object.</li> </ol>
     */
    requestPageInfo(successFunc: Function, errorFunc: Function): void;

    /**
     * Converts points from image coordinate space to PDF page coordinate space taking into account the image resolution.
     * @param points Points, in the image's coordinate space, to convert.
     * @param resolution Image resolution.
     */
    pointsFromPageSpaceToImageSpace(points: object, resolution: object): void;

  }

  /**
   * Represents an interactive form of PDF document.
   */
  class WebPdfDocumentInteractiveFormJS extends Vintasoft.Imaging.Pdf.WebPdfTreeNodeBaseJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfDocumentInteractiveFormJS"] class.
     * @param document [see="WebPdfDocumentJS"] object.
     */
    constructor(document: Vintasoft.Imaging.Pdf.WebPdfDocumentJS);

    // PROPERTIES

    /**
     * Gets a field collection representing interactive form fields associated with the document.
     */
    get_Fields(): Vintasoft.Imaging.Pdf.WebPdfInteractiveFormFieldJS[];

    // METHODS

    /**
     * Finds a field by specified fully qualified field name.
     * @param fullyQualifiedFieldName The fully qualified field name.
     */
    findField(fullyQualifiedFieldName: string): Vintasoft.Imaging.Pdf.WebPdfInteractiveFormFieldJS;

    /**
     * Finds a fields by specified fully qualified field name.
     * @param fullyQualifiedFieldName The fully qualified field name.
     */
    findFields(fullyQualifiedFieldName: string): Vintasoft.Imaging.Pdf.WebPdfInteractiveFormFieldJS[];

    /**
     * Returns all terminal fields of PDF document.
     */
    getTerminalFields(): Vintasoft.Imaging.Pdf.WebPdfInteractiveFormFieldJS[];

    /**
     * Returns the terminal fields located on specified page.
     * @param page The page.
     */
    getFieldsLocatedOnPage(page: Vintasoft.Imaging.Pdf.WebPdfPageJS): Vintasoft.Imaging.Pdf.WebPdfInteractiveFormFieldJS[];

    /**
     * Returns all fields of PDF document.
     */
    getFields(): Vintasoft.Imaging.Pdf.WebPdfInteractiveFormFieldJS[];

    /**
     * Determines that this PDF interactive form contains specified interactive field.
     * @param field A [see="WebPdfInteractiveFormFieldJS"] object.
     */
    contains(field: Vintasoft.Imaging.Pdf.WebPdfInteractiveFormFieldJS): boolean;

  }

  /**
   * Represents an interactive form field of PDF document.
   */
  class WebPdfInteractiveFormFieldJS extends Vintasoft.Imaging.Pdf.WebPdfTreeNodeBaseJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfInteractiveFormFieldJS"] class.
     * @param document [see="WebPdfDocumentJS"] object.
     * @param name A partial name of the field.
     */
    constructor(document: Vintasoft.Imaging.Pdf.WebPdfDocumentJS, name: string);

    // PROPERTIES

    /**
     * Gets a partial name of the field.
     */
    get_PartialName(): string;

    /**
     * Sets a partial name of the field.
     * @param value A partial name of the field.
     */
    set_PartialName(value: string): void;

    /**
     * Gets a fully qualified name of the field.
     */
    get_FullyQualifiedName(): string;

    /**
     * Gets the form of quadding (justification) to be used in displaying the text of the field.
     */
    get_TextQuadding(): object;

    /**
     * Sets the form of quadding (justification) to be used in displaying the text of the field.
     * @param value The form of quadding (justification) to be used in displaying the text of the field. Default value is "LeftJustified".
     */
    set_TextQuadding(value: object): void;

    /**
     * Gets the text color of the default appearance.
     */
    get_TextColor(): string;

    /**
     * Sets the text color of the default appearance.
     * @param value The text color of the default appearance.
     */
    set_TextColor(value: string): void;

    /**
     * Gets the font size of the default appearance.
     */
    get_FontSize(): number;

    /**
     * Sets the font size of the default appearance.
     * @param value The font size of the default appearance.
     */
    set_FontSize(value: number): void;

    /**
     * Gets the minimum font size when font size must be calculated automatically ([see="WebPdfInteractiveFormFieldJS.get_FontSize"] set to 0).
     */
    get_AutoFontSizeMinValue(): number;

    /**
     * Sets the minimum font size when font size must be calculated automatically ([see="WebPdfInteractiveFormFieldJS.get_FontSize"] set to 0).
     * @param value Minimum font size. Default value is 0. 0 - minimum font size is not specified.
     */
    set_AutoFontSizeMinValue(value: number): void;

    /**
     * Gets the maximum font size when font size must be calculated automatically ([see="WebPdfInteractiveFormFieldJS.get_FontSize"] set to 0).
     */
    get_AutoFontSizeMaxValue(): number;

    /**
     * Sets the maximum font size when font size must be calculated automatically ([see="WebPdfInteractiveFormFieldJS.get_FontSize"] set to 0).
     * @param value Maximum font size. Default value is 0. 0 - maximum font size is not specified.
     */
    set_AutoFontSizeMaxValue(value: number): void;

    /**
     * Gets the the type of the field as a string.
     */
    get_Type(): string;

    /**
     * Gets a value indicating whether the field is read-only.
     */
    get_IsReadOnly(): boolean;

    /**
     * Sets a value indicating whether the field is read-only.
     * @param value A value indicating whether the field is read-only.
     */
    set_IsReadOnly(value: boolean): void;

    /**
     * Gets a value indicating whether the field must have a value at the time it is exported by a submit-form action.
     */
    get_IsRequired(): boolean;

    /**
     * Sets a value indicating whether the field must have a value at the time it is exported by a submit-form action.
     * @param value A value indicating whether the field must have a value at the time it is exported by a submit-form action.
     */
    set_IsRequired(value: boolean): void;

    /**
     * Gets a parent field of the field.
     */
    get_Parent(): Vintasoft.Imaging.Pdf.WebPdfInteractiveFormFieldJS;

    /**
     * Gets a list of immediate children of the field.
     */
    get_Kids(): Vintasoft.Imaging.Pdf.WebPdfInteractiveFormFieldJS[];

    /**
     * Gets a value indicating whether the field is terminal field (leaf node in fields tree).
     */
    get_IsTerminalField(): boolean;

    /**
     * Gets a color of the interactive field's background.
     */
    get_BackgroundColor(): string;

    /**
     * Sets a color of the interactive field's background.
     * @param value A color of the interactive field's background.
     */
    set_BackgroundColor(value: string): void;

    /**
     * Gets RGB color of the interactive field's border.
     */
    get_BorderColor(): string;

    /**
     * Sets RGB color of the interactive field's border.
     * @param value RGB color of the interactive field's border.
     */
    set_BorderColor(value: string): void;

    /**
     * Gets width of interaction form field border in points (user units).
     */
    get_BorderWidth(): number;

    /**
     * Sets width of interaction form field border in points (user units).
     * @param value Width of interaction form field border in points. Default value is 1.
     */
    set_BorderWidth(value: number): void;

    /**
     * Gets the type of border style.
     */
    get_BorderStyleType(): Vintasoft.Imaging.Pdf.WebPdfAnnotationBorderStyleTypeEnumJS;

    /**
     * Sets the type of border style.
     * @param value An element of WebPdfAnnotationBorderStyleTypeEnumJS enumeration that defines the type of border style. Default value is "Default".
     */
    set_BorderStyleType(value: Vintasoft.Imaging.Pdf.WebPdfAnnotationBorderStyleTypeEnumJS): void;

    // METHODS

    /**
     * Returns the string representation of this object.
     */
    toString(): string;

  }

  /**
   * Represents a text field of interactive form of PDF document.
   */
  class WebPdfInteractiveFormTextFieldJS extends Vintasoft.Imaging.Pdf.WebPdfInteractiveFormFieldJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfInteractiveFormTextFieldJS"] class.
     * @param document [see="WebPdfDocumentJS"] object.
     * @param name A partial name of the field.
     */
    constructor(document: Vintasoft.Imaging.Pdf.WebPdfDocumentJS, name: string);

    // PROPERTIES

    /**
     * Gets the maximum length of the field text, in characters.
     */
    get_MaxLength(): number;

    /**
     * Sets the maximum length of the field text, in characters.
     * @param value The maximum length of the field text, in characters. Default value is 0.
     */
    set_MaxLength(value: number): void;

    /**
     * Gets the maximum font size of multiline text field when font size must be calculated automatically ([see="WebPdfInteractiveFormFieldJS.get_FontSize"] is set to 0).
     */
    get_MultilineAutoFontSizeMaxValue(): number;

    /**
     * Sets the maximum font size of multiline text field when font size must be calculated automatically ([see="WebPdfInteractiveFormFieldJS.get_FontSize"] is set to 0).
     * @param value Maximum font size of multiline text field. Default value is 12.  0 - maximum font size is not specified.
     */
    set_MultilineAutoFontSizeMaxValue(value: number): void;

    /**
     * Gets a value indicating whether a text box is multiline.
     */
    get_IsMultiline(): boolean;

    /**
     * Sets a value indicating whether a text box is multiline.
     * @param value A value indicating whether a text box is multiline.
     */
    set_IsMultiline(value: boolean): void;

    /**
     * Gets a flag that specifies whether the field should display asterisks when data is entered in the field.
     */
    get_IsPassword(): boolean;

    /**
     * Sets a flag that specifies whether the field should display asterisks when data is entered in the field.
     * @param value A flag that specifies whether the field should display asterisks when data is entered in the field. Default value is false.
     */
    set_IsPassword(value: boolean): void;

    /**
     * Gets a value indicating whether the field is comb.
     */
    get_IsComb(): boolean;

    /**
     * Sets a value indicating whether the field is comb.
     * @param value A value indicating whether the field is comb. Default value is false.
     */
    set_IsComb(value: boolean): void;

    /**
     * Gets the text value of text field.
     */
    get_TextValue(): string;

    /**
     * Sets the text value of text field.
     * @param value The text value of text field. Default value is "".
     */
    set_TextValue(value: string): void;

  }

  /**
   * Represents a check box field of interactive form of PDF document.
   */
  class WebPdfInteractiveFormCheckboxFieldJS extends Vintasoft.Imaging.Pdf.WebPdfInteractiveFormFieldJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfInteractiveFormCheckboxFieldJS"] class.
     * @param document [see="WebPdfDocumentJS"] object.
     * @param name A partial name of the field.
     */
    constructor(document: Vintasoft.Imaging.Pdf.WebPdfDocumentJS, name: string);

    // PROPERTIES

    /**
     * Gets a value indicating whether the checkbox is checked.
     */
    get_IsChecked(): boolean;

    /**
     * Sets a value indicating whether the checkbox is checked.
     * @param value A value indicating whether the checkbox is checked. Default value is false.
     */
    set_IsChecked(value: boolean): void;

  }

  /**
   * Represents a radion button field of interactive form of PDF document.
   */
  class WebPdfInteractiveFormRadioButtonJS extends Vintasoft.Imaging.Pdf.WebPdfInteractiveFormFieldJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfInteractiveFormRadioButtonJS"] class.
     * @param document [see="WebPdfDocumentJS"] object.
     * @param name A partial name of the field.
     */
    constructor(document: Vintasoft.Imaging.Pdf.WebPdfDocumentJS, name: string);

    // PROPERTIES

    /**
     * Gets a value indicating whether the radiobutton is checked.
     */
    get_IsChecked(): boolean;

    /**
     * Sets a value indicating whether the radiobutton is checked.
     * @param value A value indicating whether the radiobutton is checked. Default value is false.
     */
    set_IsChecked(value: boolean): void;

  }

  /**
   * Represents a radion button group field of interactive form of PDF document.
   */
  class WebPdfInteractiveFormRadioButtonGroupJS extends Vintasoft.Imaging.Pdf.WebPdfInteractiveFormFieldJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfInteractiveFormRadioButtonGroupJS"] class.
     * @param document [see="WebPdfDocumentJS"] object.
     * @param name A partial name of the field.
     */
    constructor(document: Vintasoft.Imaging.Pdf.WebPdfDocumentJS, name: string);

  }

  /**
   * Represents a push button field of interactive form of PDF document.
   */
  class WebPdfInteractiveFormPushButtonJS extends Vintasoft.Imaging.Pdf.WebPdfInteractiveFormFieldJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfInteractiveFormPushButtonJS"] class.
     * @param document [see="WebPdfDocumentJS"] object.
     * @param name A partial name of the field.
     */
    constructor(document: Vintasoft.Imaging.Pdf.WebPdfDocumentJS, name: string);

    // PROPERTIES

    /**
     * Gets a button's normal caption, displayed when it is not interacting with the user.
     */
    get_NormalCaption(): string;

    /**
     * Sets a button's normal caption, displayed when it is not interacting with the user.
     * @param value Button's normal caption. Default value is "Button".
     */
    set_NormalCaption(value: string): void;

    /**
     * Gets a button's rollover caption, displayed when the user rolls the cursor into its active area without pressing the mouse button.
     */
    get_RolloverCaption(): string;

    /**
     * Sets a button's rollover caption, displayed when the user rolls the cursor into its active area without pressing the mouse button.
     * @param value Button's rollover caption. Default value is "Button".
     */
    set_RolloverCaption(value: string): void;

    /**
     * Gets a button's alternate (down) caption, displayed when the mouse button is pressed within its active area.
     */
    get_DownCaption(): string;

    /**
     * Sets a button's alternate (down) caption, displayed when the mouse button is pressed within its active area.
     * @param value Button's alternate (down) caption. Default value is "Button".
     */
    set_DownCaption(value: string): void;

  }

  /**
   * Represents a list box field of interactive form of PDF document.
   */
  class WebPdfInteractiveFormListBoxJS extends Vintasoft.Imaging.Pdf.WebPdfInteractiveFormFieldJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfInteractiveFormListBoxJS"] class.
     * @param document [see="WebPdfDocumentJS"] object.
     * @param name A partial name of the field.
     */
    constructor(document: Vintasoft.Imaging.Pdf.WebPdfDocumentJS, name: string);

    // PROPERTIES

    /**
     * Gets the items as a string array.
     */
    get_ItemArray(): string[];

    /**
     * Sets the items as a string array.
     * @param value The items as a string array. Default value is empty array.
     */
    set_ItemArray(value: string[]): void;

    /**
     * Gets a value indicating whether field's option items should be sorted alphabetically.
     */
    get_IsSorted(): boolean;

    /**
     * Sets a value indicating whether field's option items should be sorted alphabetically.
     * @param value A value indicating whether field's option items should be sorted alphabetically. Default value is false.
     */
    set_IsSorted(value: boolean): void;

    /**
     * Gets the selected items of list box field.
     */
    get_SelectedItems(): object[];

    /**
     * Gets an array of integer values, sorted in ascending order, representing the zero-based indices in the [see="WebPdfInteractiveFormListBoxJS.get_ItemArray"] collection of the currently selected option items.
     */
    get_SelectedItemIndexes(): number[];

    /**
     * Sets an array of integer values, sorted in ascending order, representing the zero-based indices in the [see="WebPdfInteractiveFormListBoxJS.get_ItemArray"] collection of the currently selected option items.
     * @param value An array of the zero-based indices in the [see="WebPdfInteractiveFormListBoxJS.get_ItemArray"] collection of the currently selected option items. Default value is empty array.
     */
    set_SelectedItemIndexes(value: number[]): void;

    /**
     * Gets a value indicating whether more than one of the field's option items may be selected simultaneously.
     */
    get_IsMultiSelect(): boolean;

    /**
     * Sets a value indicating whether more than one of the field's option items may be selected simultaneously.
     * @param value A value indicating whether more than one of the field's option items may be selected simultaneously. Default value is false.
     */
    set_IsMultiSelect(value: boolean): void;

  }

  /**
   * Represents a combo box field of interactive form of PDF document.
   */
  class WebPdfInteractiveFormComboBoxJS extends Vintasoft.Imaging.Pdf.WebPdfInteractiveFormFieldJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfInteractiveFormComboBoxJS"] class.
     * @param document [see="WebPdfDocumentJS"] object.
     * @param name A partial name of the field.
     */
    constructor(document: Vintasoft.Imaging.Pdf.WebPdfDocumentJS, name: string);

    // PROPERTIES

    /**
     * Gets the items as a string array.
     */
    get_ItemArray(): string[];

    /**
     * Sets the items as a string array.
     * @param value The items as a string array. Default value is empty array.
     */
    set_ItemArray(value: string[]): void;

    /**
     * Gets a value indicating whether field's option items should be sorted alphabetically.
     */
    get_IsSorted(): boolean;

    /**
     * Sets a value indicating whether field's option items should be sorted alphabetically.
     * @param value A value indicating whether field's option items should be sorted alphabetically. Default value is false.
     */
    set_IsSorted(value: boolean): void;

    /**
     * Gets the selected item of combo box field.
     */
    get_SelectedItem(): string;

    /**
     * Sets the selected item of combo box field.
     * @param value A selected item of combo box field. Default value is "".
     */
    set_SelectedItem(value: string): void;

  }

  /**
   * Represents a barcode field of interactive form of PDF document.
   */
  class WebPdfInteractiveFormBarcodeFieldJS extends Vintasoft.Imaging.Pdf.WebPdfInteractiveFormFieldJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfInteractiveFormBarcodeFieldJS"] class.
     * @param document [see="WebPdfDocumentJS"] object.
     * @param name A partial name of the field.
     */
    constructor(document: Vintasoft.Imaging.Pdf.WebPdfDocumentJS, name: string);

    // PROPERTIES

    /**
     * Gets the text value of text field.
     */
    get_TextValue(): string;

    /**
     * Sets the text value of text field.
     * @param value The text value of text field. Default value is "".
     */
    set_TextValue(value: string): void;

    /**
     * Gets the resolution, in dots-per-inch (dpi), at which the barcode object shall be rendered.
     */
    get_Resolution(): number;

    /**
     * Sets the resolution, in dots-per-inch (dpi), at which the barcode object shall be rendered.
     * @param value Resolution. Default value is 300.
     */
    set_Resolution(value: number): void;

    /**
     * Gets the width, in inches, of single barcode module.
     */
    get_ModuleWidth(): number;

    /**
     * Sets the width, in inches, of single barcode module.
     * @param value The width, in inches, of single barcode module.
     */
    set_ModuleWidth(value: number): void;

    /**
     * Gets the barcode symbology of barcode field.
     */
    get_BarcodeSymbology(): Vintasoft.Imaging.Pdf.WebBarcodeSymbologyTypeEnumJS;

    /**
     * Sets the barcode symbology of barcode field.
     * @param value [see="WebBarcodeSymbologyTypeEnumJS"] object.
     */
    set_BarcodeSymbology(value: Vintasoft.Imaging.Pdf.WebBarcodeSymbologyTypeEnumJS): void;

    /**
     * Gets an integer value representing the error correction coefficient.
     */
    get_ErrorCorrectionCoefficient(): number;

    /**
     * Sets an integer value representing the error correction coefficient.
     * @param value An integer value representing the error correction coefficient.
     */
    set_ErrorCorrectionCoefficient(value: number): void;

  }

  /**
   * Represents an object that defines the appearance of PDF redaction mark.
   */
  class WebPdfRedactionMarkAppearanceJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfRedactionMarkAppearanceJS"] class.
     */
    constructor();

    // PROPERTIES

    /**
     * Gets the redacted area fill color.
     */
    get_FillColor(): string;

    /**
     * Sets the redacted area fill color.
     * @param value Redacted area fill color. Default value is "rgba(0,0,0,1)".
     */
    set_FillColor(value: string): void;

    /**
     * Gets the redacted area border color.
     */
    get_BorderColor(): string;

    /**
     * Sets the redacted area border color.
     * @param value Redacted area border color. Default value is "rgba(0,0,0,1)".
     */
    set_BorderColor(value: string): void;

    /**
     * Gets the redacted area border width.
     */
    get_BorderWidth(): number;

    /**
     * Sets the redacted area border width.
     * @param value Redacted area border width. Default value is 0.
     */
    set_BorderWidth(value: number): void;

    /**
     * Gets the overlay text.
     */
    get_Text(): string;

    /**
     * Sets the overlay text.
     * @param value Overlay text. Default value is "".
     */
    set_Text(value: string): void;

    /**
     * Gets the overlay text color.
     */
    get_TextColor(): string;

    /**
     * Sets the overlay text color.
     * @param value Overlay text color. Default value is "rgba(255,255,255,1)".
     */
    set_TextColor(value: string): void;

    /**
     * Gets the size of the font.
     */
    get_FontSize(): number;

    /**
     * Sets the size of the font.
     * @param value Size of the font. Default value is 14.
     */
    set_FontSize(value: number): void;

    /**
     * Gets a value indicating whether the appearance can calculate font size automatically.
     */
    get_AutoFontSize(): boolean;

    /**
     * Sets a value indicating whether the appearance can calculate font size automatically.
     * @param value A value indicating whether the appearance can calculate font size automatically. Default value is true.
     */
    set_AutoFontSize(value: boolean): void;

    /**
     * Gets an overlay text alignment.
     */
    get_TextAlignment(): object;

    /**
     * Sets an overlay text alignment.
     * @param value Overlay text alignment. Default value is "Center".
     */
    set_TextAlignment(value: object): void;

  }

  /**
   * Represents a PDF redaction mark.
   */
  class WebPdfRedactionMarkJS extends Vintasoft.Imaging.UI.VisualTools.WebRectangularSelectionJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfRedactionMarkJS"] class.
     * @param image The image associated with PDF page.
     */
    constructor(image: Vintasoft.Shared.WebImageJS);

    /**
     * Initializes a new instance of the [see= "WebPdfRedactionMarkJS"] class.
     * @param image PDF page.
     */
    constructor(image: Vintasoft.Imaging.Pdf.WebPdfPageJS);

    // PROPERTIES

    /**
     * Gets the type of redaction mark.
     */
    get_MarkType(): Vintasoft.Imaging.Pdf.WebPdfRedactionMarkTypeEnumJS;

    /**
     * Sets the type of redaction mark.
     * @param value The type of redaction mark.
     */
    set_MarkType(value: Vintasoft.Imaging.Pdf.WebPdfRedactionMarkTypeEnumJS): void;

    /**
     * Gets the page associated with this redaction mark.
     */
    get_Page(): Vintasoft.Imaging.Pdf.WebPdfPageJS;

    // METHODS

    /**
     * Creates a new object that is a copy of the current instance.
     */
    clone(): Vintasoft.Imaging.Pdf.WebPdfRedactionMarkJS;

  }

  /**
   * Represents a PDF redaction mark that removes all content (images, text, vector graphics) from PDF page.
   */
  class WebPdfPageRedactionMarkJS extends Vintasoft.Imaging.Pdf.WebPdfRedactionMarkJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfPageRedactionMarkJS"] class.
     * @param image The image associated with PDF page.
     */
    constructor(image: Vintasoft.Shared.WebImageJS);

    // PROPERTIES

    /**
     * Sets the type of redaction mark.
     * @param value The type of redaction mark.
     */
    set_MarkType(value: object): void;

    /**
     * Sets the selection rectangle.
     * @param value The selection rectangle.
     */
    set_SelectedRect(value: object): void;

  }

  /**
   * Represents a collection of PDF redaction marks (collection of instances of [see="WebPdfRedactionMarkJS"] class).
   */
  class WebPdfRedactionMarkCollectionJS extends Vintasoft.Imaging.UI.VisualTools.WebInteractiveObjectCollectionJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfRedactionMarkCollectionJS"] class.
     */
    constructor();

  }

}

// NAMESPACE
declare module Vintasoft.Imaging.Pdf.UI.VisualTools {

  // ===== CLASSES =====

  /**
   * Provides an abstract base class for visual tools which work with PDF document.
   */
  class WebPdfVisualToolJS extends Vintasoft.Imaging.UI.VisualTools.WebVisualToolJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfVisualToolJS"] class.
     */
    constructor();

  }

  /**
   * Represents a visual tool that allows to select and extract images, which are located on PDF page.
   */
  class WebPdfImageExtractorToolJS extends Vintasoft.Imaging.Pdf.UI.VisualTools.WebPdfVisualToolJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfImageExtractorToolJS"] class.
     */
    constructor();

    // PROPERTIES

    /**
     * Gets the fill color for selection.
     */
    get_FillColor(): string;

    /**
     * Sets the fill color for selection.
     * @param value Fill color for selection.
     */
    set_FillColor(value: string): void;

    /**
     * Gets the border color for selection.
     */
    get_BorderColor(): string;

    /**
     * Sets the border color for selection.
     * @param value Border color for selection.
     */
    set_BorderColor(value: string): void;

    /**
     * Gets the selected image.
     */
    get_SelectedImage(): object;

    /**
     * Sets the selected image.
     * @param value Selected image.
     */
    set_SelectedImage(value: object): void;

    // METHODS

    /**
     * Returns the content images of visual tool.
     */
    getContentImages(): object[];

    /**
     * Resets the visual tool.
     */
    reset(): void;

    /**
     * Returns the drawing box of visual tool.
     */
    getDrawingBox(): object;

    /**
     * Finds a WebContentImageJS object on PDF page.
     * @param location Point in the coordinate space of PDF page.
     */
    findImageInPageSpace(location: object): Vintasoft.Imaging.Pdf.WebContentImageJS;

    /**
     * Finds a WebContentImageJS object on PDF page.
     * @param location Point in the coordinate space of viewer.
     */
    findImageInViewerSpace(location: object): Vintasoft.Imaging.Pdf.WebContentImageJS;

    /**
     * Resets the visual tool.
     */
    reset(): void;

  }

  /**
   * Represents redaction mark that is used for removing text from content.
   */
  class WebPdfTextRedactionMarkJS extends Vintasoft.Imaging.Pdf.WebPdfRedactionMarkJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfTextRedactionMarkJS"] class.
     * @param image The image associated with PDF page.
     * @param textRegion The text region of redaction mark.
     */
    constructor(image: Vintasoft.Shared.WebImageJS, textRegion: Vintasoft.Imaging.WebTextRegionJS);

    // PROPERTIES

    /**
     * Gets the text region to remove.
     */
    get_TextRegion(): Vintasoft.Imaging.WebTextRegionJS;

    /**
     * Sets the type of the redaction mark.
     * @param value The type of the redaction mark.
     */
    set_MarkType(value: Vintasoft.Imaging.Pdf.WebPdfRedactionMarkTypeEnumJS): void;

    /**
     * Sets the selection rectangle.
     * @param value The selection rectangle.
     */
    set_SelectedRect(value: object): void;

    // METHODS

    /**
     * Creates a new object that is a copy of the current instance.
     */
    clone(): Vintasoft.Imaging.Pdf.UI.VisualTools.WebPdfTextRedactionMarkJS;

  }

  /**
   * Represents a visual tool that allows to view, fill and edit the interactive form fields of PDF document.
   */
  class WebPdfInteractiveFormToolJS extends Vintasoft.Imaging.Pdf.UI.VisualTools.WebPdfVisualToolJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfInteractiveFormToolJS"] class.
     */
    constructor();

    // PROPERTIES

    /**
     * Sets a value indicating whether visual tool can respond to the user interaction.
     * @param value True - visual tool can respond to the user interaction; False - visual tool can not respond to the user interaction.
     */
    set_IsEnabled(value: boolean): void;

    /**
     * Gets a value indicating whether this tool supports multipage mode.
     */
    get_IsMultipageModeSupported(): boolean;

    /**
     * Gets the interaction mode.
     */
    get_InteractionMode(): Vintasoft.Imaging.Pdf.WebPdfInteractiveFormInteractionModeEnumJS;

    /**
     * Sets the interaction mode.
     * @param value [see="WebPdfInteractiveFormInteractionModeEnumJS"] object. Default value is "View".
     */
    set_InteractionMode(value: Vintasoft.Imaging.Pdf.WebPdfInteractiveFormInteractionModeEnumJS): void;

    /**
     * Gets a value indicating whether this visual tool must automatically commit changes in interactive form if interaction mode is changed or this visual tool become inactive.
     */
    get_AutoCommit(): boolean;

    /**
     * Sets a value indicating whether this visual tool must automatically commit changes in interactive form if interaction mode is changed or this visual tool become inactive.
     * @param value True - this visual tool automatically commit changes in interactive form to the server if interaction mode is changed or this visual tool become inactive; false - this visual tool does not commit changes in interactive form to the server if interaction mode is changed or this visual tool become inactive. Default value is true.
     */
    set_AutoCommit(value: boolean): void;

    /**
     * Gets the action executor that is used for executing the PDF actions.
     */
    get_ActionExecutor(): Vintasoft.Imaging.Pdf.WebPdfActionExecutorBaseJS;

    /**
     * Sets the action executor that is used for executing the PDF actions.
     * @param value A [see="WebPdfActionExecutorBaseJS"] object OR null. Default value is null.
     */
    set_ActionExecutor(value: Vintasoft.Imaging.Pdf.WebPdfActionExecutorBaseJS): void;

    /**
     * Gets the focused interactive form field.
     */
    get_FocusedField(): Vintasoft.Imaging.Pdf.WebPdfInteractiveFormFieldJS;

    /**
     * Sets the focused interactive form field.
     * @param value [see="WebPdfInteractiveFormFieldJS"] object OR null.
     */
    set_FocusedField(value: Vintasoft.Imaging.Pdf.WebPdfInteractiveFormFieldJS): void;

    // METHODS

    /**
     * Returns all [see="WebPdfInteractiveFormFieldJS"] objects associated with the specified image.
     * @param image [see="WebImageJS"] object.
     */
    getFieldsForImage(image: Vintasoft.Shared.WebImageJS): Vintasoft.Imaging.Pdf.WebPdfInteractiveFormFieldJS;

    /**
     * Returns all [see="WebPdfInteractiveFormFieldJS"] objects associated with the specified PDF page.
     * @param page [see="WebPdfPageJS"] object.
     */
    getFieldsForPage(page: Vintasoft.Imaging.Pdf.WebPdfPageJS): Vintasoft.Imaging.Pdf.WebPdfInteractiveFormFieldJS;

    /**
     * Sends an asynchronous request for updating PDF interactive form of focused PDF document.
     */
    updateInteractiveForm(): void;

    /**
     * Sends an asynchronous request for updating PDF interactive forms of all opened in viewer PDF documents.
     */
    updateInteractiveForms(): void;

    /**
     * Resets the visual tool.
     */
    reset(): void;

  }

  /**
   * Represents a visual tool that allows to remove and black out content of PDF pages.
   */
  class WebPdfRemoveContentToolJS extends Vintasoft.Imaging.UI.VisualTools.WebMultiRectangularSelectionToolJS {

    // CONTSRUCTORS

    /**
     * Initializes a new instance of the [see= "WebPdfRemoveContentToolJS"] class.
     */
    constructor();

    // PROPERTIES

    /**
     * Gets an appearance of PDF redaction mark.
     */
    get_RedactionMarkAppearance(): Vintasoft.Imaging.Pdf.WebPdfRedactionMarkAppearanceJS;

    /**
     * Sets an appearance of PDF redaction mark.
     * @param value Appearance of PDF redaction mark OR null.
     */
    set_RedactionMarkAppearance(value: Vintasoft.Imaging.Pdf.WebPdfRedactionMarkAppearanceJS): void;

    // METHODS

    /**
     * Applies the redaction marks to a PDF document.
     */
    applyRedactionMarks(): void;

  }

}

