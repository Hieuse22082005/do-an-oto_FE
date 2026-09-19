import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Kỹ thuật Singleton chống đa kết nối trong Next.js Dev Mode
const globalForSupabase = global as unknown as { supabase: any };

export const supabase = 
  globalForSupabase.supabase || 
  createClient(supabaseUrl, supabaseAnonKey);

if (process.env.NODE_ENV !== 'production') {
  globalForSupabase.supabase = supabase;
}