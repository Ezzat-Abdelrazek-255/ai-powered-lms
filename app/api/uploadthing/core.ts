// server/uploadthing.ts
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { createClient } from "@/libs/supabase/server";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
    "application/pdf": {
      maxFileSize: "16MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.getUser();
      if (error) throw new UploadThingError("Unauthorized");
      return { userId: data.user.id };
    })
    .onUploadComplete(async ({ metadata }) => {
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

// downstream, if you need its type:
export type OurFileRouter = typeof ourFileRouter;
