import { LucideIcon } from ".";

export type ContentBlock = {
  title: string;
  icon: LucideIcon;
  description: string;
  materials?: {
    title: string;
    icon: LucideIcon;
    type: "article" | "video" | "file" | "assignment" | "quiz" | "submission";
  }[];
};
export type Course = {
  title: string;
  department: string;
  code: string;
  coverImgSrc: string;
  content?: ContentBlock[];
};
