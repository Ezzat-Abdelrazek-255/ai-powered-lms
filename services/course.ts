import {
  Assignment,
  Course,
  Module,
  Student,
  Submission,
} from "@/types/courses";
import { camelObject, getUserMetadata } from "@/utils";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getCourse(
  supabase: SupabaseClient,
  courseId: string,
): Promise<Course> {
  try {
    const { data, error } = await supabase
      .from("course")
      .select("*, modules(*, content(*))")
      .eq("course_id", courseId);
    if (error) throw error;
    return camelObject(data)[0] as Course;
  } catch (error) {
    throw error;
  }
}

export async function getAssignment(
  supabase: SupabaseClient,
  assignmentId: string,
): Promise<Assignment> {
  try {
    const { data, error } = await supabase
      .from("assignment")
      .select("*")
      .eq("assignment_id", assignmentId);
    if (error) throw error;
    return camelObject(data)[0] as Assignment;
  } catch (error) {
    throw error;
  }
}

export async function getSubmissionByAssignmentId(
  supabase: SupabaseClient,
  assignmentId: string,
): Promise<Submission | null> {
  try {
    const user = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("submission")
      .select("*")
      .eq("assignment_id", assignmentId)
      .eq("student_id", user.data.user?.id)
      .maybeSingle();

    if (error) throw error;
    return camelObject(data) as Submission;
  } catch (error) {
    throw error;
  }
}

export async function getSubmission(
  supabase: SupabaseClient,
  submissionId: string,
): Promise<Submission> {
  try {
    const { data, error } = await supabase
      .from("submission")
      .select("*")
      .eq("submission_id", submissionId)
      .single();

    if (error) throw error;
    return camelObject(data) as Submission;
  } catch (error) {
    throw error;
  }
}

export async function getCourses(
  supabase: SupabaseClient,
): Promise<Course[] | undefined> {
  try {
    const userMetadata = await getUserMetadata(supabase);

    if (!userMetadata || !userMetadata.id) {
      throw new Error(
        "Authentication failed: Unable to retrieve user metadata.",
      );
    }

    const { data, error } = await supabase
      .from(`course_${userMetadata.role}`)
      .select("*, course(*, key_modules(*), instructor(*))")
      .eq(`${userMetadata.role}_id`, userMetadata.id);

    const courses = data?.map((item) => item.course) as Course[];

    if (error) throw error;

    return camelObject<Course[]>(courses);
  } catch (error) {
    console.error(error);
  }
}

export async function getAssignments(
  supabase: SupabaseClient,
  courseId: string,
): Promise<Assignment[] | undefined> {
  try {
    const { data, error } = await supabase
      .from(`assignment`)
      .select("*")
      .eq(`course_id`, courseId);

    if (error) throw error;

    return camelObject<Assignment[]>(data);
  } catch (error) {
    console.error(error);
  }
}

export async function getCourseStudents(
  supabase: SupabaseClient,
  courseId: string,
): Promise<Student[]> {
  try {
    const { data, error } = await supabase
      .from(`course_student`)
      .select("*, student(*)")
      .eq("course_id", courseId);

    if (error) throw error;
    const students = data.map((item) => item.student);

    return camelObject<Student[]>(students);
  } catch (error) {
    throw error;
  }
}

export async function getCourseModules(
  supabase: SupabaseClient,
  courseId: string,
): Promise<Module[]> {
  try {
    const { data, error } = await supabase
      .from(`modules`)
      .select("*,content(*),assignment(*)")
      .eq("course_id", courseId);

    if (error) throw error;

    return camelObject<Module[]>(data);
  } catch (error) {
    throw error;
  }
}

export async function createContent(
  supabase: SupabaseClient,
  contents: { course_id: string; module_id: string; file_url: string }[],
) {
  try {
    const { data, error } = await supabase
      .from("content")
      .insert(contents)
      .select();
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createAssignment(
  supabase: SupabaseClient,
  assignment: {
    course_id: string;
    module_id: string;
    title: string;
    description: string;
    max_grade: number;
    due_date: Date;
    file_url: string;
  },
) {
  try {
    const { data, error } = await supabase
      .from("assignment")
      .insert(assignment)
      .select();
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
}
