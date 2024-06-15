import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { generateUploadButton, generateUploadDropzone } from "@uploadthing/react";

import type { OurFileRouter } from "~/server/uploadthing";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SERVER = process.env.REACT_APP_SERVER_ADDRESS;

// export const UploadButton = generateUploadButton<OurFileRouter>();
// export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

export const UploadButton = generateUploadButton({
  url: `${SERVER}/api/uploadthing`,
});

export const UploadDropzone = generateUploadDropzone({
  url: `${SERVER}/api/uploadthing`,
});
