import { recentlyAccessedCourses } from "@/constants/course";
import { Course } from "@/types/courses";
import { createContext, useState } from "react";

const contextInitialValue = {
  recentCourses: [],
  addRecentCourse: () => { },
  getCourse: () => { },
};

type ContextValue = {
  recentCourses: Course[];
  addRecentCourse: (_: Course) => void;
  getCourse: (_: string) => void;
};

const CoursesContext = createContext<ContextValue>(contextInitialValue);

type CoursesContextProps = {
  children: React.ReactNode;
};

const CoursesContextProvider = function({ children }: CoursesContextProps) {
  const [recentCourses, setRecentCourses] = useState<Course[]>(
    recentlyAccessedCourses,
  );

  const addRecentCourse = function(recentCourse: Course) {
    setRecentCourses((recentCourses) => [
      ...recentCourses.slice(1),
      recentCourse,
    ]);
  };

  const getCourse = function(courseCode: string) {
    return recentCourses.find((course) => course.code === courseCode);
  };

  return (
    <CoursesContext.Provider
      value={{
        recentCourses,
        addRecentCourse,
        getCourse,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};

export default CoursesContextProvider;
