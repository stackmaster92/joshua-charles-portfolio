import { createClient } from '@supabase/supabase-js';

// Access environment variables using import.meta.env for Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; 
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create Supabase client only if environment variables are available
// This allows the app to load even without Supabase configuration
let supabase = null;

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
} else {
  console.warn("Supabase environment variables are not set. Some features may not work. Please create a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY if you need Supabase functionality.");
}

export { supabase };