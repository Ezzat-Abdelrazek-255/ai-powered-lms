import { LucideProps } from "lucide-react";

export type LucideIcon = React.ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
>;

export type AuthInputs = {
  email: string;
  password: string;
};

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
      Assignment: {
        Row: {
          assignment_id: string;
          course_id: string;
          created_at: string;
          description: string;
          due_date: string;
          max_grade: number | null;
          resource_url: string | null;
          title: string;
        };
        Insert: {
          assignment_id?: string;
          course_id?: string;
          created_at?: string;
          description: string;
          due_date: string;
          max_grade?: number | null;
          resource_url?: string | null;
          title: string;
        };
        Update: {
          assignment_id?: string;
          course_id?: string;
          created_at?: string;
          description?: string;
          due_date?: string;
          max_grade?: number | null;
          resource_url?: string | null;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Assignment_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "course";
            referencedColumns: ["course_id"];
          },
        ];
      };
      Choice: {
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
          question_id: string;
        };
        Update: {
          choice?: string;
          choice_id?: string;
          created_at?: string;
          question_id?: string;
        };
        Relationships: [];
      };
      Content: {
        Row: {
          content_id: string;
          course_id: string;
          created_at: string;
          file_url: string | null;
        };
        Insert: {
          content_id?: string;
          course_id?: string;
          created_at?: string;
          file_url?: string | null;
        };
        Update: {
          content_id?: string;
          course_id?: string;
          created_at?: string;
          file_url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "Content_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "course";
            referencedColumns: ["course_id"];
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
      Course_Instructor: {
        Row: {
          academic_year: string | null;
          course_id: string;
          created_at: string;
          instructor_id: string;
          semester: string;
        };
        Insert: {
          academic_year?: string | null;
          course_id: string;
          created_at?: string;
          instructor_id: string;
          semester: string;
        };
        Update: {
          academic_year?: string | null;
          course_id?: string;
          created_at?: string;
          instructor_id?: string;
          semester?: string;
        };
        Relationships: [];
      };
      Course_Student: {
        Row: {
          academic_year: string | null;
          course_id: string;
          created_at: string;
          semester: string;
          student_id: string;
        };
        Insert: {
          academic_year?: string | null;
          course_id?: string;
          created_at?: string;
          semester: string;
          student_id?: string;
        };
        Update: {
          academic_year?: string | null;
          course_id?: string;
          created_at?: string;
          semester?: string;
          student_id?: string;
        };
        Relationships: [];
      };
      Instructor: {
        Row: {
          birthdate: string;
          created_at: string;
          department: string;
          instructor_id: string;
        };
        Insert: {
          birthdate: string;
          created_at?: string;
          department: string;
          instructor_id?: string;
        };
        Update: {
          birthdate?: string;
          created_at?: string;
          department?: string;
          instructor_id?: string;
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
      Modules: {
        Row: {
          content_id: string;
          course_id: string;
          created_at: string;
          key_modules_id: string;
        };
        Insert: {
          content_id?: string;
          course_id?: string;
          created_at?: string;
          key_modules_id?: string;
        };
        Update: {
          content_id?: string;
          course_id?: string;
          created_at?: string;
          key_modules_id?: string;
        };
        Relationships: [];
      };
      Question: {
        Row: {
          created_at: string;
          question: string;
          question_id: string;
          quiz_id: string;
          right_answer: string;
        };
        Insert: {
          created_at?: string;
          question: string;
          question_id?: string;
          quiz_id: string;
          right_answer: string;
        };
        Update: {
          created_at?: string;
          question?: string;
          question_id?: string;
          quiz_id?: string;
          right_answer?: string;
        };
        Relationships: [];
      };
      Quiz: {
        Row: {
          course_id: string;
          created_at: string;
          description: string;
          end_date: string;
          instructor_id: string;
          quiz_id: string;
          start_date: string;
          time_limit: number;
          title: string;
        };
        Insert: {
          course_id: string;
          created_at?: string;
          description: string;
          end_date: string;
          instructor_id: string;
          quiz_id?: string;
          start_date: string;
          time_limit: number;
          title: string;
        };
        Update: {
          course_id?: string;
          created_at?: string;
          description?: string;
          end_date?: string;
          instructor_id?: string;
          quiz_id?: string;
          start_date?: string;
          time_limit?: number;
          title?: string;
        };
        Relationships: [];
      };
      Student: {
        Row: {
          birthdate: string;
          created_at: string;
          GPA: number;
          level: string;
          major: string;
          student_id: string;
        };
        Insert: {
          birthdate: string;
          created_at?: string;
          GPA: number;
          level?: string;
          major: string;
          student_id?: string;
        };
        Update: {
          birthdate?: string;
          created_at?: string;
          GPA?: number;
          level?: string;
          major?: string;
          student_id?: string;
        };
        Relationships: [];
      };
      Student_Quiz_Attempt: {
        Row: {
          attempt_id: string;
          duration: number;
          end_date: string;
          quiz_id: string;
          score: number;
          start_date: string;
          student_id: string;
        };
        Insert: {
          attempt_id?: string;
          duration: number;
          end_date?: string;
          quiz_id: string;
          score: number;
          start_date: string;
          student_id: string;
        };
        Update: {
          attempt_id?: string;
          duration?: number;
          end_date?: string;
          quiz_id?: string;
          score?: number;
          start_date?: string;
          student_id?: string;
        };
        Relationships: [];
      };
      Submission: {
        Row: {
          assignment_id: string;
          file_url: string;
          grade: number | null;
          instructor_feedback: string | null;
          student_id: string;
          submission_date: string;
          submission_id: string;
        };
        Insert: {
          assignment_id: string;
          file_url: string;
          grade?: number | null;
          instructor_feedback?: string | null;
          student_id: string;
          submission_date?: string;
          submission_id?: string;
        };
        Update: {
          assignment_id?: string;
          file_url?: string;
          grade?: number | null;
          instructor_feedback?: string | null;
          student_id?: string;
          submission_date?: string;
          submission_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
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
    Enums: {},
  },
} as const;
