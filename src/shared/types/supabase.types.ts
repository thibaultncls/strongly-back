export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      body_part: {
        Row: {
          body_part: string
          created_at: string
          id: number
        }
        Insert: {
          body_part: string
          created_at?: string
          id?: number
        }
        Update: {
          body_part?: string
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      exercise: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      exercise_body_part: {
        Row: {
          body_part_id: number
          created_at: string
          exercise_id: number
        }
        Insert: {
          body_part_id: number
          created_at?: string
          exercise_id: number
        }
        Update: {
          body_part_id?: number
          created_at?: string
          exercise_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "exercise_body_part_body_part_id_fkey"
            columns: ["body_part_id"]
            isOneToOne: false
            referencedRelation: "body_part"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exercise_body_part_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercise"
            referencedColumns: ["id"]
          },
        ]
      }
      exercise_type: {
        Row: {
          created_at: string
          id: number
          type: string
        }
        Insert: {
          created_at?: string
          id?: number
          type: string
        }
        Update: {
          created_at?: string
          id?: number
          type?: string
        }
        Relationships: []
      }
      intensity: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      set: {
        Row: {
          created_at: string
          id: number
          note: string | null
          reps: number
          set_number: number
          weight: number
          workout_exercise_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          note?: string | null
          reps: number
          set_number: number
          weight: number
          workout_exercise_id: number
        }
        Update: {
          created_at?: string
          id?: number
          note?: string | null
          reps?: number
          set_number?: number
          weight?: number
          workout_exercise_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "set_workout_exercise_id_fkey"
            columns: ["workout_exercise_id"]
            isOneToOne: false
            referencedRelation: "workout_exercise"
            referencedColumns: ["id"]
          },
        ]
      }
      set_intensity: {
        Row: {
          created_at: string
          failure: boolean
          instensity_id: number
          intensity_level: number | null
          set_id: number
        }
        Insert: {
          created_at?: string
          failure: boolean
          instensity_id: number
          intensity_level?: number | null
          set_id: number
        }
        Update: {
          created_at?: string
          failure?: boolean
          instensity_id?: number
          intensity_level?: number | null
          set_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "set_intensity_instensity_id_fkey"
            columns: ["instensity_id"]
            isOneToOne: false
            referencedRelation: "intensity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "set_intensity_set_id_fkey"
            columns: ["set_id"]
            isOneToOne: false
            referencedRelation: "set"
            referencedColumns: ["id"]
          },
        ]
      }
      set_set_type: {
        Row: {
          created_at: string
          set_group: number
          set_id: number
          set_type_id: number
        }
        Insert: {
          created_at?: string
          set_group: number
          set_id: number
          set_type_id: number
        }
        Update: {
          created_at?: string
          set_group?: number
          set_id?: number
          set_type_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "set_set_type_set_id_fkey"
            columns: ["set_id"]
            isOneToOne: false
            referencedRelation: "set"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "set_set_type_set_type_id_fkey"
            columns: ["set_type_id"]
            isOneToOne: false
            referencedRelation: "set_type"
            referencedColumns: ["id"]
          },
        ]
      }
      set_type: {
        Row: {
          created_at: string
          id: number
          type: string
        }
        Insert: {
          created_at?: string
          id?: number
          type: string
        }
        Update: {
          created_at?: string
          id?: number
          type?: string
        }
        Relationships: []
      }
      template_exercise: {
        Row: {
          created_at: string
          exercise_id: number
          id: number
          order: number
          set_up: string | null
          template_id: number
        }
        Insert: {
          created_at?: string
          exercise_id: number
          id?: number
          order: number
          set_up?: string | null
          template_id: number
        }
        Update: {
          created_at?: string
          exercise_id?: number
          id?: number
          order?: number
          set_up?: string | null
          template_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "template_exercise_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercise"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "template_exercise_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "workout_template"
            referencedColumns: ["id"]
          },
        ]
      }
      template_exercise_type: {
        Row: {
          created_at: string
          exercise_group: number
          exercise_type_id: number
          template_exercise_id: number
        }
        Insert: {
          created_at?: string
          exercise_group: number
          exercise_type_id: number
          template_exercise_id: number
        }
        Update: {
          created_at?: string
          exercise_group?: number
          exercise_type_id?: number
          template_exercise_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "template_exercise_type_exercise_type_id_fkey"
            columns: ["exercise_type_id"]
            isOneToOne: false
            referencedRelation: "exercise_type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "template_exercise_type_template_exercise_id_fkey"
            columns: ["template_exercise_id"]
            isOneToOne: false
            referencedRelation: "template_exercise"
            referencedColumns: ["id"]
          },
        ]
      }
      template_set: {
        Row: {
          created_at: string
          high_rep: number | null
          id: number
          low_rep: number | null
          set_number: number | null
          template_exercise_id: number
        }
        Insert: {
          created_at?: string
          high_rep?: number | null
          id?: number
          low_rep?: number | null
          set_number?: number | null
          template_exercise_id: number
        }
        Update: {
          created_at?: string
          high_rep?: number | null
          id?: number
          low_rep?: number | null
          set_number?: number | null
          template_exercise_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "template_set_template_exercise_id_fkey"
            columns: ["template_exercise_id"]
            isOneToOne: false
            referencedRelation: "template_exercise"
            referencedColumns: ["id"]
          },
        ]
      }
      template_set_type: {
        Row: {
          created_at: string
          set_group: number
          set_type_id: number
          template_set_id: number
        }
        Insert: {
          created_at?: string
          set_group: number
          set_type_id: number
          template_set_id: number
        }
        Update: {
          created_at?: string
          set_group?: number
          set_type_id?: number
          template_set_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "template_set_type_set_type_id_fkey"
            columns: ["set_type_id"]
            isOneToOne: false
            referencedRelation: "set_type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "template_set_type_template_set_id_fkey"
            columns: ["template_set_id"]
            isOneToOne: false
            referencedRelation: "template_set"
            referencedColumns: ["id"]
          },
        ]
      }
      user: {
        Row: {
          created_at: string
          email: string | null
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      workout: {
        Row: {
          created_at: string
          duration: string
          id: number
          note: string | null
          updated_at: string | null
          workout_template_id: number
        }
        Insert: {
          created_at?: string
          duration: string
          id?: number
          note?: string | null
          updated_at?: string | null
          workout_template_id: number
        }
        Update: {
          created_at?: string
          duration?: string
          id?: number
          note?: string | null
          updated_at?: string | null
          workout_template_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "workout_workout_template_id_fkey"
            columns: ["workout_template_id"]
            isOneToOne: false
            referencedRelation: "workout_template"
            referencedColumns: ["id"]
          },
        ]
      }
      workout_exercise: {
        Row: {
          created_at: string
          exercise_id: number
          id: number
          order: number
          set_up: string | null
          workout_id: number
        }
        Insert: {
          created_at?: string
          exercise_id: number
          id?: number
          order: number
          set_up?: string | null
          workout_id: number
        }
        Update: {
          created_at?: string
          exercise_id?: number
          id?: number
          order?: number
          set_up?: string | null
          workout_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "workout_exercise_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercise"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workout_exercise_workout_id_fkey"
            columns: ["workout_id"]
            isOneToOne: false
            referencedRelation: "workout"
            referencedColumns: ["id"]
          },
        ]
      }
      workout_exercise_type: {
        Row: {
          created_at: string
          exercise_group: number
          exercise_type_id: number
          workout_exercise_id: number
        }
        Insert: {
          created_at?: string
          exercise_group: number
          exercise_type_id: number
          workout_exercise_id: number
        }
        Update: {
          created_at?: string
          exercise_group?: number
          exercise_type_id?: number
          workout_exercise_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "workout_exercise_type_exercise_type_id_fkey"
            columns: ["exercise_type_id"]
            isOneToOne: false
            referencedRelation: "exercise_type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workout_exercise_type_workout_exercise_id_fkey"
            columns: ["workout_exercise_id"]
            isOneToOne: false
            referencedRelation: "workout_exercise"
            referencedColumns: ["id"]
          },
        ]
      }
      workout_template: {
        Row: {
          created_at: string
          id: number
          name: string
          order: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          order?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          order?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workout_template_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
