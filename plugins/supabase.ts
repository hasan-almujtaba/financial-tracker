import { createClient } from '@supabase/supabase-js'

/**
 * Supabase configuration
 * @see https://supabase.com/docs/reference/javascript/initializing
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
