import { createClient } from '@supabase/supabase-js';

// Environment variables should be used in production
// For now, we'll use placeholder values. YOU MUST UPDATE THESE.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
