import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = import.meta.env.SUPABASE_URL
// const supabaseKey = import.meta.env.SUPABASE_KEY
const supabaseUrl = 'https://mrxlbblrttjnkdxxsciz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yeGxiYmxydHRqbmtkeHhzY2l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg4MzI1OTksImV4cCI6MjAwNDQwODU5OX0.Xu2hqRTSDwUHbdtpr5CV7_81HUT4XRTQ0WDrJkldVwo'
const supabase = createClient(supabaseUrl, supabaseKey)

export default function useSupabase() {
    return { supabase }
}