import { createClient } from '@supabase/supabase-js'

/**
 * Supabase configuration
 * @see https://supabase.com/docs/reference/javascript/initializing
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
