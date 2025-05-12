import { Course } from "./courses";

export type TimelineItem = {
  deadline: Date;
  title: string;
  associatedCourse: Course;
  requiresAction: boolean;
};
