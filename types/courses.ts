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

export type UploadStatus = "idle" | "uploading" | "done";

export type AppRole = "instructor" | "student";

export type Instructor = {
  name: string;
  role: "instructor";
  email: string;
  birthdate: string;
  createdAt: string;
  department: string;
  userId: string;
};

export type Student = {
  userId: string;
  major: string;
  gpa: string;
  level: string;
  birthdate: string;
  createdAt: string;
  email: string;
  name: string;
  profileImageUrl: string;
};

export type Submission = {
  submissionId: string;
  assignmentId: string;
  studentId: string;
  fileUrl: string;
  fileName: string;
  submissionDate: string;
  grade: number;
  instructorFeedback: string;
  submissionStatus: string;
};

export type Assignment = {
  assignmentId: string;
  courseId: string;
  title: string;
  description: string;
  fileUrl: string;
  maxGrade: string;
  createdAt: string;
  userId: string;
  moduleId: string;
  dueDate: string;
};

export type Module = {
  moduleId: string;
  title: string;
  description: string;
  createdAt: string;
  courseId: string;
  instructorId: string;
  content: {
    fileUrl: string;
    fileName: string;
    contentId: string;
  }[];
  assignment: Assignment[];
};

export type KeyModule = {
  title: string;
  courseId: string;
  createdAt: string;
  keyModulesId: string;
};

export type Course = {
  courseId: string;
  title: string;
  description: string;
  status: string;
  enrollmentCount: number;
  department: string;
  createdAt: string;
  coverImg: string;
  keyModules: KeyModule[];
  instructor: Instructor[];
  modules: Module[];
};
