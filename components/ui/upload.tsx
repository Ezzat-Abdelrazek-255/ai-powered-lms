"use client";

import React, { useState, useEffect } from "react";
import { UploadButton } from "@/libs/uploadthing";
import UploadSvg from "@/public/vectors/upload.svg";
import Spinner from "./spinner";
import { ClientUploadedFileData } from "uploadthing/types";
import { X } from "lucide-react";
import { cn } from "@/utils";
import { UploadStatus } from "@/types/courses";

type UploadProps = {
  onComplete?: (
    files: ClientUploadedFileData<{ uploadedBy: string }>[],
  ) => void;
  onStatusChange?: (status: "idle" | "uploading" | "done") => void;
};

const Upload: React.FC<UploadProps> = ({ onComplete, onStatusChange }) => {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");

  const [uploadedFiles, setUploadedFiles] = useState<
    ClientUploadedFileData<{
      uploadedBy: string;
    }>[]
  >([]);

  const handleRemoveFile = (fileHash: string) => {
    if (uploadedFiles.length === 1) setUploadStatus("idle");
    setUploadedFiles((files) =>
      files.filter((file) => file.fileHash !== fileHash),
    );
  };

  useEffect(() => {
    onStatusChange?.(uploadStatus);
  }, [uploadStatus, onStatusChange]);

  return (
    <div>
      <UploadButton
        className={cn(
          "mb-[2.4rem] rounded-sm border border-dashed border-beige-dark bg-beige-light py-[8rem]",
          uploadStatus === "uploading" && "border-solid",
        )}
        endpoint="imageUploader"
        disabled={uploadStatus === "uploading"}
        onUploadBegin={() => {
          setUploadStatus("uploading");
        }}
        onUploadError={(error) => {
          console.error("Upload error: ", error);
          setUploadStatus("idle");
        }}
        onClientUploadComplete={(res) => {
          setUploadedFiles((prevFiles) => [...res, ...prevFiles]);
          setUploadStatus("done");
          onComplete?.(res); // invoke parent handler
        }}
        appearance={{
          button: "w-auto h-auto px-[1.6rem]",
        }}
        content={{
          button() {
            return (
              <div className="flex h-[10rem] flex-col items-center justify-center text-black">
                {uploadStatus === "uploading" ? (
                  <div className="mb-[1.2rem]">
                    <Spinner />
                  </div>
                ) : (
                  <>
                    <UploadSvg className="mb-[1.2rem] h-[6rem] w-[7rem]" />
                    <p className="mb-[1.6rem] whitespace-nowrap text-[1.6rem]">
                      <span className="text-blue underline">
                        Click to browse and upload your file
                      </span>
                    </p>
                  </>
                )}
              </div>
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

      {uploadedFiles.length > 0 && (
        <div className="mb-[2.4rem]">
          <h3 className="mb-[0.8rem] font-semibold text-black/60">Uploaded</h3>
          <ul className="space-y-[0.8rem]">
            {uploadedFiles.map((file) => (
              <li
                key={file.ufsUrl}
                className="flex items-center justify-between rounded-xs border border-black/60 p-[1.2rem] py-[0.8rem] text-black"
              >
                <span>{file.name}</span>
                <button
                  aria-label="Remove file"
                  className="grid h-[2rem] w-[2rem] place-content-center rounded-full bg-black text-white transition-colors hover:bg-red"
                  onClick={() => handleRemoveFile(file.fileHash)}
                >
                  <X className="w-[1.4rem]" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Upload;
