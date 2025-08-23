import { auth } from "@/app/utils/auth";
import { requireUser } from "@/app/utils/reqiureUser";
import { redirect } from "next/navigation";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();


// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      maxFileSize: "2MB",
      maxFileCount: 1,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      // This code runs on your server before upload
       const session = await requireUser();
         if (!session) {
          throw new UploadThingError("Unauthorized");
         }

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: session.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.ufsUrl);

      return { uploadedBy: metadata.userId };
    }),


// Define as many to upload PDF
  resumeUploader: f({
    "application/pdf": {
      maxFileSize: "2MB",
      maxFileCount: 1,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      // This code runs on your server before upload
       const session = await requireUser();
         if (!session) {
          throw new UploadThingError("Unauthorized");
         }

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: session.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.ufsUrl);

      return { uploadedBy: metadata.userId };
    }),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
