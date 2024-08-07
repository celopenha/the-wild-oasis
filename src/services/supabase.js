
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://kbocaycfkcvvwodetnti.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtib2NheWNma2N2dndvZGV0bnRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY4NDYyMDUsImV4cCI6MjAzMjQyMjIwNX0.eVsllFF9OQ6YGU0haO-TTm83vZkTmFxDeFSIhsDmdWI"
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;