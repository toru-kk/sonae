// このファイルは `npx supabase gen types typescript --local` で自動生成されます
// Supabaseプロジェクト接続後に実行して上書きしてください

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          display_name: string | null;
          avatar_url: string | null;
          plan: "free" | "standard" | "premium";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          display_name?: string | null;
          avatar_url?: string | null;
          plan?: "free" | "standard" | "premium";
        };
        Update: {
          email?: string;
          display_name?: string | null;
          avatar_url?: string | null;
          plan?: "free" | "standard" | "premium";
        };
      };
      gear_categories: {
        Row: {
          id: string;
          name: string;
          name_ja: string;
          icon: string;
          sort_order: number;
        };
        Insert: {
          id: string;
          name: string;
          name_ja: string;
          icon: string;
          sort_order: number;
        };
        Update: {
          name?: string;
          name_ja?: string;
          icon?: string;
          sort_order?: number;
        };
      };
      gear_items: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          category_id: string;
          brand: string | null;
          weight_g: number | null;
          notes: string | null;
          image_url: string | null;
          is_essential: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          category_id: string;
          brand?: string | null;
          weight_g?: number | null;
          notes?: string | null;
          image_url?: string | null;
          is_essential?: boolean;
        };
        Update: {
          name?: string;
          category_id?: string;
          brand?: string | null;
          weight_g?: number | null;
          notes?: string | null;
          image_url?: string | null;
          is_essential?: boolean;
        };
      };
      gear_packages: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string | null;
          mountain_type: string | null;
          total_weight_g: number;
          is_public: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          description?: string | null;
          mountain_type?: string | null;
          total_weight_g?: number;
          is_public?: boolean;
        };
        Update: {
          name?: string;
          description?: string | null;
          mountain_type?: string | null;
          total_weight_g?: number;
          is_public?: boolean;
        };
      };
      gear_package_items: {
        Row: {
          id: string;
          package_id: string;
          gear_item_id: string;
          quantity: number;
          sort_order: number | null;
          notes: string | null;
        };
        Insert: {
          package_id: string;
          gear_item_id: string;
          quantity?: number;
          sort_order?: number | null;
          notes?: string | null;
        };
        Update: {
          quantity?: number;
          sort_order?: number | null;
          notes?: string | null;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      plan_type: "free" | "standard" | "premium";
    };
  };
}
