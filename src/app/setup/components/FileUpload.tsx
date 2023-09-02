"use client";

import "@uploadthing/react/styles.css";
import { X } from "lucide-react";
import Image from "next/image";
import { UploadDropzone } from "~/app/api//uploadthing/utils";
import { type OurFileRouter } from "~/app/api/uploadthing/core";

type FileUploadProps = {
  onChange: (url?: string) => void;
  value: string;
  endpoint: keyof OurFileRouter;
};

export default function FileUpload({
  onChange, // TODO: Fix serializable Prop issue
  value,
  endpoint,
}: FileUploadProps) {
  const fileType = value.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <div className="relative h-20 w-20">
          <Image fill src={value} alt="Uplad" className="rounded-full" />
        </div>
        <button
          onClick={() => onChange("")}
          className="absolute right-0 top-0 rounded-full bg-rose-500 p-1 text-white shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        if (!res?.[0]) throw new Error("No file uploaded");
        onChange(res[0].url);
      }}
      onUploadError={(err: Error) => {
        console.error(err);
      }}
    />
  );
}
