export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      answer: {
        Row: {
          answer: string | null;
          answer_id: string;
          attempt_id: string | null;
          created_at: string;
          question_id: string | null;
        };
        Insert: {
          answer?: string | null;
          answer_id?: string;
          attempt_id?: string | null;
          created_at?: string;
          question_id?: string | null;
        };
        Update: {
          answer?: string | null;
          answer_id?: string;
          attempt_id?: string | null;
          created_at?: string;
          question_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "answer_question_id_fkey";
            columns: ["question_id"];
            isOneToOne: false;
            referencedRelation: "question";
            referencedColumns: ["question_id"];
          },
        ];
      };
      assignment: {
        Row: {
          assignment_id: string;
          course_id: string;
          created_at: string;
          description: string;
          due_date: string | null;
          file_url: string | null;
          max_grade: number | null;
          module_id: string | null;
          title: string;
          user_id: string | null;
        };
        Insert: {
          assignment_id?: string;
          course_id?: string;
          created_at?: string;
          description: string;
          due_date?: string | null;
          file_url?: string | null;
          max_grade?: number | null;
          module_id?: string | null;
          title: string;
          user_id?: string | null;
        };
        Update: {
          assignment_id?: string;
          course_id?: string;
          created_at?: string;
          description?: string;
          due_date?: string | null;
          file_url?: string | null;
          max_grade?: number | null;
          module_id?: string | null;
          title?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "Assignment_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "course";
            referencedColumns: ["course_id"];
          },
          {
            foreignKeyName: "assignment_module_id_fkey";
            columns: ["module_id"];
            isOneToOne: false;
            referencedRelation: "modules";
            referencedColumns: ["module_id"];
          },
        ];
      };
      attempt: {
        Row: {
          attempt_id: string;
          created_at: string;
          expires_at: string | null;
          quiz_id: string | null;
          student_id: string | null;
        };
        Insert: {
          attempt_id?: string;
          created_at?: string;
          expires_at?: string | null;
          quiz_id?: string | null;
          student_id?: string | null;
        };
        Update: {
          attempt_id?: string;
          created_at?: string;
          expires_at?: string | null;
          quiz_id?: string | null;
          student_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "attempt_quiz_id_fkey";
            columns: ["quiz_id"];
            isOneToOne: false;
            referencedRelation: "quiz";
            referencedColumns: ["quiz_id"];
          },
          {
            foreignKeyName: "attempt_student_id_fkey";
            columns: ["student_id"];
            isOneToOne: false;
            referencedRelation: "student";
            referencedColumns: ["user_id"];
          },
        ];
      };
      choice: {
        Row: {
          choice: string;
          choice_id: string;
          created_at: string;
          question_id: string;
        };
        Insert: {
          choice: string;
          choice_id?: string;
          created_at?: string;
          question_id?: string;
        };
        Update: {
          choice?: string;
          choice_id?: string;
          created_at?: string;
          question_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "choice_question_id_fkey";
            columns: ["question_id"];
            isOneToOne: false;
            referencedRelation: "question";
            referencedColumns: ["question_id"];
          },
        ];
      };
      content: {
        Row: {
          content_id: string;
          course_id: string;
          created_at: string;
          file_name: string | null;
          file_url: string;
          module_id: string;
        };
        Insert: {
          content_id?: string;
          course_id?: string;
          created_at?: string;
          file_name?: string | null;
          file_url: string;
          module_id: string;
        };
        Update: {
          content_id?: string;
          course_id?: string;
          created_at?: string;
          file_name?: string | null;
          file_url?: string;
          module_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Content_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "course";
            referencedColumns: ["course_id"];
          },
          {
            foreignKeyName: "content_module_id_fkey";
            columns: ["module_id"];
            isOneToOne: false;
            referencedRelation: "modules";
            referencedColumns: ["module_id"];
          },
        ];
      };
      course: {
        Row: {
          course_id: string;
          cover_img: string | null;
          created_at: string;
          department: string;
          description: string | null;
          enrollment_count: number;
          status: string;
          title: string;
        };
        Insert: {
          course_id?: string;
          cover_img?: string | null;
          created_at?: string;
          department: string;
          description?: string | null;
          enrollment_count: number;
          status: string;
          title: string;
        };
        Update: {
          course_id?: string;
          cover_img?: string | null;
          created_at?: string;
          department?: string;
          description?: string | null;
          enrollment_count?: number;
          status?: string;
          title?: string;
        };
        Relationships: [];
      };
      course_instructor: {
        Row: {
          course_id: string;
          created_at: string;
          instructor_id: string;
        };
        Insert: {
          course_id?: string;
          created_at?: string;
          instructor_id?: string;
        };
        Update: {
          course_id?: string;
          created_at?: string;
          instructor_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "course_instructor_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "course";
            referencedColumns: ["course_id"];
          },
          {
            foreignKeyName: "course_instructor_instructor_id_fkey";
            columns: ["instructor_id"];
            isOneToOne: false;
            referencedRelation: "instructor";
            referencedColumns: ["user_id"];
          },
        ];
      };
      course_student: {
        Row: {
          course_id: string;
          created_at: string;
          student_id: string;
        };
        Insert: {
          course_id?: string;
          created_at?: string;
          student_id?: string;
        };
        Update: {
          course_id?: string;
          created_at?: string;
          student_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "course_student_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "course";
            referencedColumns: ["course_id"];
          },
          {
            foreignKeyName: "course_student_student_id_fkey";
            columns: ["student_id"];
            isOneToOne: false;
            referencedRelation: "student";
            referencedColumns: ["user_id"];
          },
        ];
      };
      instructor: {
        Row: {
          birthdate: string;
          created_at: string;
          department: string;
          email: string | null;
          name: string | null;
          role: string | null;
          user_id: string;
        };
        Insert: {
          birthdate: string;
          created_at?: string;
          department: string;
          email?: string | null;
          name?: string | null;
          role?: string | null;
          user_id?: string;
        };
        Update: {
          birthdate?: string;
          created_at?: string;
          department?: string;
          email?: string | null;
          name?: string | null;
          role?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      key_modules: {
        Row: {
          course_id: string;
          created_at: string;
          key_modules_id: string;
          title: string;
        };
        Insert: {
          course_id?: string;
          created_at?: string;
          key_modules_id?: string;
          title: string;
        };
        Update: {
          course_id?: string;
          created_at?: string;
          key_modules_id?: string;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Key_Modules_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "course";
            referencedColumns: ["course_id"];
          },
        ];
      };
      modules: {
        Row: {
          course_id: string;
          created_at: string;
          description: string | null;
          instructor_id: string | null;
          module_id: string;
          title: string | null;
        };
        Insert: {
          course_id?: string;
          created_at?: string;
          description?: string | null;
          instructor_id?: string | null;
          module_id?: string;
          title?: string | null;
        };
        Update: {
          course_id?: string;
          created_at?: string;
          description?: string | null;
          instructor_id?: string | null;
          module_id?: string;
          title?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "modules_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "course";
            referencedColumns: ["course_id"];
          },
          {
            foreignKeyName: "modules_instructor_id_fkey";
            columns: ["instructor_id"];
            isOneToOne: false;
            referencedRelation: "instructor";
            referencedColumns: ["user_id"];
          },
        ];
      };
      question: {
        Row: {
          course_id: string | null;
          created_at: string;
          question: string;
          question_id: string;
          right_answer: string;
        };
        Insert: {
          course_id?: string | null;
          created_at?: string;
          question: string;
          question_id?: string;
          right_answer: string;
        };
        Update: {
          course_id?: string | null;
          created_at?: string;
          question?: string;
          question_id?: string;
          right_answer?: string;
        };
        Relationships: [
          {
            foreignKeyName: "question_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "course";
            referencedColumns: ["course_id"];
          },
        ];
      };
      quiz: {
        Row: {
          available_date: string;
          close_date: string;
          course_id: string;
          created_at: string;
          description: string;
          max_grade: number | null;
          module_id: string | null;
          quiz_id: string;
          time_limit: number;
          title: string;
        };
        Insert: {
          available_date: string;
          close_date: string;
          course_id?: string;
          created_at?: string;
          description: string;
          max_grade?: number | null;
          module_id?: string | null;
          quiz_id?: string;
          time_limit: number;
          title: string;
        };
        Update: {
          available_date?: string;
          close_date?: string;
          course_id?: string;
          created_at?: string;
          description?: string;
          max_grade?: number | null;
          module_id?: string | null;
          quiz_id?: string;
          time_limit?: number;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "quiz_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "course";
            referencedColumns: ["course_id"];
          },
          {
            foreignKeyName: "quiz_module_id_fkey";
            columns: ["module_id"];
            isOneToOne: false;
            referencedRelation: "modules";
            referencedColumns: ["module_id"];
          },
        ];
      };
      quiz_question: {
        Row: {
          created_at: string;
          question_id: string;
          question_order: number | null;
          quiz_id: string;
        };
        Insert: {
          created_at?: string;
          question_id?: string;
          question_order?: number | null;
          quiz_id?: string;
        };
        Update: {
          created_at?: string;
          question_id?: string;
          question_order?: number | null;
          quiz_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "quiz_question_question_id_fkey";
            columns: ["question_id"];
            isOneToOne: false;
            referencedRelation: "question";
            referencedColumns: ["question_id"];
          },
          {
            foreignKeyName: "quiz_question_quiz_id_fkey";
            columns: ["quiz_id"];
            isOneToOne: false;
            referencedRelation: "quiz";
            referencedColumns: ["quiz_id"];
          },
        ];
      };
      role_permissions: {
        Row: {
          id: number;
          permission: Database["public"]["Enums"]["app_permission"];
          role: Database["public"]["Enums"]["app_role"];
        };
        Insert: {
          id?: number;
          permission: Database["public"]["Enums"]["app_permission"];
          role: Database["public"]["Enums"]["app_role"];
        };
        Update: {
          id?: number;
          permission?: Database["public"]["Enums"]["app_permission"];
          role?: Database["public"]["Enums"]["app_role"];
        };
        Relationships: [];
      };
      student: {
        Row: {
          birthdate: string;
          created_at: string;
          email: string | null;
          gpa: number;
          level: string;
          major: string;
          name: string | null;
          profile_image_url: string | null;
          user_id: string;
        };
        Insert: {
          birthdate: string;
          created_at?: string;
          email?: string | null;
          gpa: number;
          level?: string;
          major: string;
          name?: string | null;
          profile_image_url?: string | null;
          user_id?: string;
        };
        Update: {
          birthdate?: string;
          created_at?: string;
          email?: string | null;
          gpa?: number;
          level?: string;
          major?: string;
          name?: string | null;
          profile_image_url?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      submission: {
        Row: {
          assignment_id: string;
          file_name: string | null;
          file_url: string;
          grade: number | null;
          instructor_feedback: string | null;
          student_id: string;
          submission_date: string;
          submission_id: string;
          submission_status: string | null;
        };
        Insert: {
          assignment_id?: string;
          file_name?: string | null;
          file_url: string;
          grade?: number | null;
          instructor_feedback?: string | null;
          student_id?: string;
          submission_date?: string;
          submission_id?: string;
          submission_status?: string | null;
        };
        Update: {
          assignment_id?: string;
          file_name?: string | null;
          file_url?: string;
          grade?: number | null;
          instructor_feedback?: string | null;
          student_id?: string;
          submission_date?: string;
          submission_id?: string;
          submission_status?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "submission_assignment_id_fkey";
            columns: ["assignment_id"];
            isOneToOne: false;
            referencedRelation: "assignment";
            referencedColumns: ["assignment_id"];
          },
          {
            foreignKeyName: "submission_student_id_fkey";
            columns: ["student_id"];
            isOneToOne: false;
            referencedRelation: "student";
            referencedColumns: ["user_id"];
          },
        ];
      };
      user_roles: {
        Row: {
          id: number;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Insert: {
          id?: number;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Update: {
          id?: number;
          role?: Database["public"]["Enums"]["app_role"];
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      authorize: {
        Args: {
          requested_permission: Database["public"]["Enums"]["app_permission"];
        };
        Returns: boolean;
      };
      create_attempt_with_expiry: {
        Args: { p_student_id: string; p_quiz_id: string };
        Returns: {
          attempt_id: string;
          student_id: string;
          quiz_id: string;
          expires_at: string;
          created_at: string;
          updated_at: string;
        }[];
      };
      custom_access_token_hook: {
        Args: { event: Json };
        Returns: Json;
      };
    };
    Enums: {
      app_permission:
      | "course.create"
      | "course.read"
      | "course.update"
      | "course.delete"
      | "module.create"
      | "module.read"
      | "module.update"
      | "module.delete"
      | "assignment.create"
      | "assignment.read"
      | "assignment.update"
      | "assignment.delete"
      | "question.create"
      | "question.read"
      | "question.update"
      | "question.delete"
      | "choice.create"
      | "choice.read"
      | "choice.update"
      | "choice.delete"
      | "submission.create"
      | "submission.read"
      | "content.create"
      | "content.read"
      | "content.update"
      | "content.delete"
      | "quiz.create"
      | "quiz.read"
      | "quiz.update"
      | "quiz.delete"
      | "attempt.create"
      | "attempt.read"
      | "attempt.update"
      | "attempt.delete";
      app_role: "instructor" | "student";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
  | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
  | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
  ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
    Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
  : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
    Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
  ? R
  : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
    DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
    DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
  ? R
  : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
  | keyof DefaultSchema["Tables"]
  | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
  ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Insert: infer I;
  }
  ? I
  : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
    Insert: infer I;
  }
  ? I
  : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
  | keyof DefaultSchema["Tables"]
  | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
  ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Update: infer U;
  }
  ? U
  : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
    Update: infer U;
  }
  ? U
  : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
  | keyof DefaultSchema["Enums"]
  | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
  ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
  : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
  | keyof DefaultSchema["CompositeTypes"]
  | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
  ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
  : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      app_permission: [
        "course.create",
        "course.read",
        "course.update",
        "course.delete",
        "module.create",
        "module.read",
        "module.update",
        "module.delete",
        "assignment.create",
        "assignment.read",
        "assignment.update",
        "assignment.delete",
        "question.create",
        "question.read",
        "question.update",
        "question.delete",
        "choice.create",
        "choice.read",
        "choice.update",
        "choice.delete",
        "submission.create",
        "submission.read",
        "content.create",
        "content.read",
        "content.update",
        "content.delete",
        "quiz.create",
        "quiz.read",
        "quiz.update",
        "quiz.delete",
        "attempt.create",
        "attempt.read",
        "attempt.update",
        "attempt.delete",
      ],
      app_role: ["instructor", "student"],
    },
  },
} as const;
