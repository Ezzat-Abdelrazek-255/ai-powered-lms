import { Course } from "@/types/courses";
import { BookOpenText, FileVideo, Newspaper, File } from "lucide-react";

export const courses: Course[] = [
  {
    title: "Human Rights",
    department: "Basic Science",
    code: "ASU111s",
    coverImgSrc: "/images/course.jpg",
    keyModules: [
      "Scientific Method",
      "Matter & It's Properties",
      "Energy & Forces",
      "Human Body Systems",
      "Ecology & Environment",
    ],
    content: [
      {
        title: "Overview",
        icon: BookOpenText,
        description:
          "This course explores Digital Literacy and its importance for teachers and students. The course is optimised for the Moodle App. Please try it out!",
        materials: [
          {
            title: "Video Introduction",
            icon: FileVideo,
            type: "video",
          },
          {
            title: "How confident are you",
            icon: Newspaper,
            type: "article",
          },
          {
            title: "Our approach to digital literacy forums",
            icon: File,
            type: "file",
          },
        ],
      },
      {
        title: "Background",
        icon: BookOpenText,
        description:
          "This course explores Digital Literacy and its importance for teachers and students. The course is optimised for the Moodle App. Please try it out!",
        materials: [
          {
            title: "Video Introduction",
            icon: FileVideo,
            type: "video",
          },
          {
            title: "How confident are you",
            icon: Newspaper,
            type: "article",
          },
          {
            title: "Our approach to digital literacy forums",
            icon: File,
            type: "file",
          },
        ],
      },
    ],
  },
];

export const recentlyAccessedCourses: Course[] = [
  {
    title: "Human Rights",
    department: "Basic Science",
    code: "ASU111s",
    keyModules: [
      "Scientific Method",
      "Matter & It's Properties",
      "Energy & Forces",
      "Human Body Systems",
      "Ecology & Environment",
    ],
  },
  {
    title: "Human Rights",
    department: "Basic Science",
    code: "ASU111s",
    keyModules: [
      "Scientific Method",
      "Matter & It's Properties",
      "Energy & Forces",
      "Human Body Systems",
      "Ecology & Environment",
    ],
  },
  {
    title: "Human Rights",
    department: "Basic Science",
    code: "ASU111s",
    keyModules: [
      "Scientific Method",
      "Matter & It's Properties",
      "Energy & Forces",
      "Human Body Systems",
      "Ecology & Environment",
    ],
  },
  {
    title: "Human Rights",
    department: "Basic Science",
    code: "ASU111s",
    keyModules: [
      "Scientific Method",
      "Matter & It's Properties",
      "Energy & Forces",
      "Human Body Systems",
      "Ecology & Environment",
    ],
  },
  {
    title: "Human Rights",
    department: "Basic Science",
    code: "ASU111s",
    keyModules: [
      "Scientific Method",
      "Matter & It's Properties",
      "Energy & Forces",
      "Human Body Systems",
      "Ecology & Environment",
    ],
  },
];
