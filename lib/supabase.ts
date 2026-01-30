import { createClient } from '@supabase/supabase-js'

// These will be set as environment variables in production
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          avatar_url: string | null
          role: 'admin' | 'agent' | 'partner' | 'viewer'
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['users']['Insert']>
      }
      boards: {
        Row: {
          id: string
          name: string
          description: string | null
          order: number
          color: string | null
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['boards']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['boards']['Insert']>
      }
      columns: {
        Row: {
          id: string
          board_id: string
          name: string
          order: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['columns']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['columns']['Insert']>
      }
      cards: {
        Row: {
          id: string
          column_id: string
          title: string
          description: string | null
          order: number
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['cards']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['cards']['Insert']>
      }
      todos: {
        Row: {
          id: string
          card_id: string
          text: string
          completed: boolean
          order: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['todos']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['todos']['Insert']>
      }
      notes: {
        Row: {
          id: string
          card_id: string
          content: string
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['notes']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['notes']['Insert']>
      }
      documents: {
        Row: {
          id: string
          card_id: string
          filename: string
          path: string
          size: number
          mime_type: string
          uploaded_by: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['documents']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['documents']['Insert']>
      }
      board_members: {
        Row: {
          board_id: string
          user_id: string
          role: 'owner' | 'editor' | 'viewer'
          added_at: string
        }
        Insert: Omit<Database['public']['Tables']['board_members']['Row'], 'added_at'>
        Update: Partial<Database['public']['Tables']['board_members']['Insert']>
      }
    }
  }
}