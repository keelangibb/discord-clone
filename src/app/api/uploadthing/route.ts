import { createNextRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "~/modules/common/lib/uploadthing";

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
});
