import React from "react";

import { UploadDropzone } from "@/lib/uploadthing";
import { UploadButton } from "@uploadthing/react";
import UploadSvg from "@/public/vectors/upload.svg";

const Upload = () => {
  return (
    <div className="w-[54rem] bg-beige text-black">
      <p className="text-center text-[2.2rem] font-bold uppercase">Upload</p>
      <UploadDropzone
        appearance={{
          button: {
            display: "none",
          },
        }}
        content={{
          uploadIcon() {
            return <UploadSvg className="mb-[2.4rem] h-[6rem] w-[7rem]" />;
          },
          label() {
            return (
              <p className="mb-[0.8rem] whitespace-nowrap text-[1.6rem]">
                Drag & drop files or{" "}
                <span className="text-blue underline">Browse</span>
              </p>
            );
          },
          allowedContent() {
            return (
              <p className="text-[1.2rem] text-black/60">
                Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT
              </p>
            );
          },
        }}
      />
      <UploadButton />
    </div>
  );
};

export default Upload;
