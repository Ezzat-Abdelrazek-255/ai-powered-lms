import {
  Assignment,
  Choice,
  Course,
  Module,
  Question,
  Quiz,
  Student,
  Submission,
} from "@/types/courses";
import { camelObject, getUserMetadata } from "@/utils";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getQuiz(
  supabase: SupabaseClient,
  quizId: string,
): Promise<Quiz | undefined> {
  try {
    const { data, error } = await supabase
      .from("quiz")
      .select(
        `
        *,
        quiz_question(
          question_order,
          question(
            question_id,
            question,
            choice(*)
          )
        )
      `,
      )
      .eq("quiz_id", quizId)
      .order("question_order", { foreignTable: "quiz_question" })
      .single();

    if (error) throw error;
    return camelObject<Quiz>(data);
  } catch (error) {
    throw error;
  }
}
export async function getQuizzes(
  supabase: SupabaseClient,
  courseId: string,
): Promise<Quiz[] | undefined> {
  try {
    const { data, error } = await supabase
      .from(`quiz`)
      .select("*, attempt(*)")
      .eq(`course_id`, courseId);

    if (error) throw error;

    return camelObject<Quiz[]>(data);
  } catch (error) {
    console.error(error);
  }
}

export async function createQuiz(
  supabase: SupabaseClient,
  quiz: {
    course_id: string;
    module_id: string;
    title: string;
    description: string;
    available_date: Date;
    close_date: Date;
    time_limit: number;
    max_grade: number;
    questions: Array<{
      label: string;
      value: string;
      choices: Choice[];
      id: string;
    }>;
  },
) {
  try {
    // First, create the quiz
    const { data: quizData, error: quizError } = await supabase
      .from("quiz")
      .insert({
        course_id: quiz.course_id,
        module_id: quiz.module_id,
        title: quiz.title,
        description: quiz.description,
        available_date: quiz.available_date,
        close_date: quiz.close_date,
        time_limit: quiz.time_limit,
        max_grade: quiz.max_grade,
      })
      .select()
      .single();

    if (quizError) throw quizError;

    // Then, create the quiz-question relationships
    if (quiz.questions.length > 0) {
      const quizQuestions = quiz.questions.map((question, index) => ({
        quiz_id: quizData.quiz_id,
        question_id: question.id,
        question_order: index + 1,
      }));

      const { error: questionsError } = await supabase
        .from("quiz_question")
        .insert(quizQuestions);

      if (questionsError) throw questionsError;
    }

    return quizData;
  } catch (error) {
    throw error;
  }
}

export async function getQuestions(
  supabase: SupabaseClient,
  courseId: string,
): Promise<Question[]> {
  try {
    const { data, error } = await supabase
      .from("question")
      .select("*, choice(*)")
      .eq("course_id", courseId);
    if (error) throw error;
    return camelObject(data) as Question[];
  } catch (error) {
    throw error;
  }
}

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
      .select("*,content(*),assignment(*),quiz(*)")
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
