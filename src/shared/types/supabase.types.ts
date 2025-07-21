export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)";
  };
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
      body_part: {
        Row: {
          body_part: string;
          created_at: string;
          id: number;
          is_deleted: boolean;
          updated_at: string;
        };
        Insert: {
          body_part: string;
          created_at?: string;
          id?: number;
          is_deleted?: boolean;
          updated_at?: string;
        };
        Update: {
          body_part?: string;
          created_at?: string;
          id?: number;
          is_deleted?: boolean;
          updated_at?: string;
        };
        Relationships: [];
      };
      exercise: {
        Row: {
          created_at: string;
          description: string | null;
          id: number;
          is_deleted: boolean;
          name: string;
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: number;
          is_deleted?: boolean;
          name: string;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: number;
          is_deleted?: boolean;
          name?: string;
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "exercise_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          }
        ];
      };
      exercise_body_part: {
        Row: {
          body_part_id: number;
          created_at: string;
          exercise_id: number;
          is_deleted: boolean;
          updated_at: string;
        };
        Insert: {
          body_part_id: number;
          created_at?: string;
          exercise_id: number;
          is_deleted?: boolean;
          updated_at?: string;
        };
        Update: {
          body_part_id?: number;
          created_at?: string;
          exercise_id?: number;
          is_deleted?: boolean;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "exercise_body_part_body_part_id_fkey";
            columns: ["body_part_id"];
            isOneToOne: false;
            referencedRelation: "body_part";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "exercise_body_part_exercise_id_fkey";
            columns: ["exercise_id"];
            isOneToOne: false;
            referencedRelation: "exercise";
            referencedColumns: ["id"];
          }
        ];
      };
      exercise_type: {
        Row: {
          created_at: string;
          id: number;
          is_deleted: boolean;
          type: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          is_deleted?: boolean;
          type: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          is_deleted?: boolean;
          type?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      intensity: {
        Row: {
          created_at: string;
          id: number;
          is_deleted: boolean;
          name: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          is_deleted?: boolean;
          name: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          is_deleted?: boolean;
          name?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      set: {
        Row: {
          created_at: string;
          id: number;
          is_deleted: boolean;
          note: string | null;
          reps: number;
          set_number: number;
          updated_at: string;
          weight: number;
          workout_exercise_id: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          is_deleted?: boolean;
          note?: string | null;
          reps: number;
          set_number: number;
          updated_at?: string;
          weight: number;
          workout_exercise_id: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          is_deleted?: boolean;
          note?: string | null;
          reps?: number;
          set_number?: number;
          updated_at?: string;
          weight?: number;
          workout_exercise_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "set_workout_exercise_id_fkey";
            columns: ["workout_exercise_id"];
            isOneToOne: false;
            referencedRelation: "workout_exercise";
            referencedColumns: ["id"];
          }
        ];
      };
      set_intensity: {
        Row: {
          created_at: string;
          failure: boolean;
          instensity_id: number;
          intensity_level: number | null;
          is_deleted: boolean;
          set_id: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          failure: boolean;
          instensity_id: number;
          intensity_level?: number | null;
          is_deleted?: boolean;
          set_id: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          failure?: boolean;
          instensity_id?: number;
          intensity_level?: number | null;
          is_deleted?: boolean;
          set_id?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "set_intensity_instensity_id_fkey";
            columns: ["instensity_id"];
            isOneToOne: false;
            referencedRelation: "intensity";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "set_intensity_set_id_fkey";
            columns: ["set_id"];
            isOneToOne: false;
            referencedRelation: "set";
            referencedColumns: ["id"];
          }
        ];
      };
      set_set_type: {
        Row: {
          created_at: string;
          is_deleted: boolean;
          set_group: number;
          set_id: number;
          set_type_id: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          is_deleted?: boolean;
          set_group: number;
          set_id: number;
          set_type_id: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          is_deleted?: boolean;
          set_group?: number;
          set_id?: number;
          set_type_id?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "set_set_type_set_id_fkey";
            columns: ["set_id"];
            isOneToOne: false;
            referencedRelation: "set";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "set_set_type_set_type_id_fkey";
            columns: ["set_type_id"];
            isOneToOne: false;
            referencedRelation: "set_type";
            referencedColumns: ["id"];
          }
        ];
      };
      set_type: {
        Row: {
          created_at: string;
          id: number;
          is_deleted: boolean;
          type: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          is_deleted?: boolean;
          type: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          is_deleted?: boolean;
          type?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      subscription: {
        Row: {
          created_at: string;
          duration: number;
          id: number;
          is_deleted: boolean;
          name: string;
          price: number;
          prioriy: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          duration: number;
          id?: number;
          is_deleted?: boolean;
          name: string;
          price: number;
          prioriy: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          duration?: number;
          id?: number;
          is_deleted?: boolean;
          name?: string;
          price?: number;
          prioriy?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      template_exercise: {
        Row: {
          created_at: string;
          exercise_id: number;
          id: number;
          is_deleted: boolean;
          order: number;
          set_up: string | null;
          template_id: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          exercise_id: number;
          id?: number;
          is_deleted?: boolean;
          order: number;
          set_up?: string | null;
          template_id: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          exercise_id?: number;
          id?: number;
          is_deleted?: boolean;
          order?: number;
          set_up?: string | null;
          template_id?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "template_exercise_exercise_id_fkey";
            columns: ["exercise_id"];
            isOneToOne: false;
            referencedRelation: "exercise";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "template_exercise_template_id_fkey";
            columns: ["template_id"];
            isOneToOne: false;
            referencedRelation: "workout_template";
            referencedColumns: ["id"];
          }
        ];
      };
      template_exercise_type: {
        Row: {
          created_at: string;
          exercise_group: number;
          exercise_type_id: number;
          is_deleted: boolean;
          template_exercise_id: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          exercise_group: number;
          exercise_type_id: number;
          is_deleted?: boolean;
          template_exercise_id: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          exercise_group?: number;
          exercise_type_id?: number;
          is_deleted?: boolean;
          template_exercise_id?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "template_exercise_type_exercise_type_id_fkey";
            columns: ["exercise_type_id"];
            isOneToOne: false;
            referencedRelation: "exercise_type";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "template_exercise_type_template_exercise_id_fkey";
            columns: ["template_exercise_id"];
            isOneToOne: false;
            referencedRelation: "template_exercise";
            referencedColumns: ["id"];
          }
        ];
      };
      template_set: {
        Row: {
          created_at: string;
          high_rep: number | null;
          id: number;
          is_deleted: boolean;
          low_rep: number | null;
          set_number: number | null;
          template_exercise_id: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          high_rep?: number | null;
          id?: number;
          is_deleted?: boolean;
          low_rep?: number | null;
          set_number?: number | null;
          template_exercise_id: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          high_rep?: number | null;
          id?: number;
          is_deleted?: boolean;
          low_rep?: number | null;
          set_number?: number | null;
          template_exercise_id?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "template_set_template_exercise_id_fkey";
            columns: ["template_exercise_id"];
            isOneToOne: false;
            referencedRelation: "template_exercise";
            referencedColumns: ["id"];
          }
        ];
      };
      template_set_type: {
        Row: {
          created_at: string;
          is_deleted: boolean;
          set_group: number;
          set_type_id: number;
          template_set_id: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          is_deleted?: boolean;
          set_group: number;
          set_type_id: number;
          template_set_id: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          is_deleted?: boolean;
          set_group?: number;
          set_type_id?: number;
          template_set_id?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "template_set_type_set_type_id_fkey";
            columns: ["set_type_id"];
            isOneToOne: false;
            referencedRelation: "set_type";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "template_set_type_template_set_id_fkey";
            columns: ["template_set_id"];
            isOneToOne: false;
            referencedRelation: "template_set";
            referencedColumns: ["id"];
          }
        ];
      };
      user: {
        Row: {
          created_at: string;
          device_id: string | null;
          email: string | null;
          id: string;
          is_deleted: boolean;
          name: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          device_id?: string | null;
          email?: string | null;
          id?: string;
          is_deleted?: boolean;
          name?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          device_id?: string | null;
          email?: string | null;
          id?: string;
          is_deleted?: boolean;
          name?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      user_subscription: {
        Row: {
          beginning_date: string;
          created_at: string;
          end_date: string | null;
          id: number;
          is_deleted: boolean;
          subscription_id: number;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          beginning_date: string;
          created_at?: string;
          end_date?: string | null;
          id?: number;
          is_deleted?: boolean;
          subscription_id: number;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          beginning_date?: string;
          created_at?: string;
          end_date?: string | null;
          id?: number;
          is_deleted?: boolean;
          subscription_id?: number;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_subscription_subscription_id_fkey";
            columns: ["subscription_id"];
            isOneToOne: false;
            referencedRelation: "subscription";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_subscription_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          }
        ];
      };
      workout: {
        Row: {
          created_at: string;
          duration: string;
          id: number;
          is_deleted: boolean;
          note: string | null;
          updated_at: string;
          workout_template_id: number;
        };
        Insert: {
          created_at?: string;
          duration: string;
          id?: number;
          is_deleted?: boolean;
          note?: string | null;
          updated_at?: string;
          workout_template_id: number;
        };
        Update: {
          created_at?: string;
          duration?: string;
          id?: number;
          is_deleted?: boolean;
          note?: string | null;
          updated_at?: string;
          workout_template_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "workout_workout_template_id_fkey";
            columns: ["workout_template_id"];
            isOneToOne: false;
            referencedRelation: "workout_template";
            referencedColumns: ["id"];
          }
        ];
      };
      workout_exercise: {
        Row: {
          created_at: string;
          exercise_id: number;
          id: number;
          is_deleted: boolean;
          order: number;
          set_up: string | null;
          updated_at: string;
          workout_id: number;
        };
        Insert: {
          created_at?: string;
          exercise_id: number;
          id?: number;
          is_deleted?: boolean;
          order: number;
          set_up?: string | null;
          updated_at?: string;
          workout_id: number;
        };
        Update: {
          created_at?: string;
          exercise_id?: number;
          id?: number;
          is_deleted?: boolean;
          order?: number;
          set_up?: string | null;
          updated_at?: string;
          workout_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "workout_exercise_exercise_id_fkey";
            columns: ["exercise_id"];
            isOneToOne: false;
            referencedRelation: "exercise";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "workout_exercise_workout_id_fkey";
            columns: ["workout_id"];
            isOneToOne: false;
            referencedRelation: "workout";
            referencedColumns: ["id"];
          }
        ];
      };
      workout_exercise_type: {
        Row: {
          created_at: string;
          exercise_group: number;
          exercise_type_id: number;
          is_deleted: boolean;
          updated_at: string;
          workout_exercise_id: number;
        };
        Insert: {
          created_at?: string;
          exercise_group: number;
          exercise_type_id: number;
          is_deleted?: boolean;
          updated_at?: string;
          workout_exercise_id: number;
        };
        Update: {
          created_at?: string;
          exercise_group?: number;
          exercise_type_id?: number;
          is_deleted?: boolean;
          updated_at?: string;
          workout_exercise_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "workout_exercise_type_exercise_type_id_fkey";
            columns: ["exercise_type_id"];
            isOneToOne: false;
            referencedRelation: "exercise_type";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "workout_exercise_type_workout_exercise_id_fkey";
            columns: ["workout_exercise_id"];
            isOneToOne: false;
            referencedRelation: "workout_exercise";
            referencedColumns: ["id"];
          }
        ];
      };
      workout_template: {
        Row: {
          created_at: string;
          id: number;
          is_deleted: boolean;
          name: string;
          order: number | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          is_deleted?: boolean;
          name: string;
          order?: number | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          is_deleted?: boolean;
          name?: string;
          order?: number | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "workout_template_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_sync_workout_template: {
        Args: { user_id: string; last_synced_at: string };
        Returns: Json;
      };
      get_template_updates: {
        Args: { user_id: string };
        Returns: Json;
      };
      get_workout_template_with_exercise_sets: {
        Args: { user_id: string };
        Returns: Json;
      };
      sync_user_data: {
        Args: { user_id: string; last_sync: string };
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
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
  DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
  DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"] | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
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
