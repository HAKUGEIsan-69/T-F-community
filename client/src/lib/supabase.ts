import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface User {
  id: string
  email: string
  student_id: string
  name: string
  grade: number
  class_name: string
  role: 'student' | 'coach' | 'admin'
  created_at: string
}

export interface Announcement {
  id: string
  title: string
  content: string
  author_id: string
  author_name: string
  created_at: string
  updated_at: string
  priority: 'low' | 'medium' | 'high'
  attachment_url?: string
}

export interface Schedule {
  id: string
  title: string
  description: string
  date: string
  start_time: string
  end_time: string
  location: string
  type: 'practice' | 'competition' | 'meeting' | 'other'
  created_by: string
  created_at: string
}

export interface Record {
  id: string
  student_id: string
  student_name: string
  event: string
  record_value: string
  unit: string
  date: string
  location: string
  competition_name?: string
  is_personal_best: boolean
  created_at: string
}