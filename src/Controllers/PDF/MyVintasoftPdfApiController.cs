using Vintasoft.Imaging.Pdf.AspNetCore.ApiControllers;

namespace AspNetCoreAngularPdfEditorDemo.Controllers
{
    /// <summary>
    /// A Web API controller that handles HTTP requests from clients and allows to work with PDF documents.
    /// </summary>
    public class MyVintasoftPdfApiController : VintasoftPdfApiController
    {

        /// <summary>
        /// Initializes a new instance of the <see cref="MyVintasoftPdfApiController"/> class.
        /// </summary>
        /// <param name="hostingEnvironment">Information about the web hosting environment an application is running in.</param>
        public MyVintasoftPdfApiController(IWebHostEnvironment hostingEnvironment)
                : base(hostingEnvironment)
        {
        }

    }
}