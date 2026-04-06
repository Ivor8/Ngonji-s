import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://mpqqawffqwrhkjzaybgk.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImE5NjBhMjFhLTk4ZWItNDRmZi05NzFlLTBmMzlkNmZhMDM5YiJ9.eyJwcm9qZWN0SWQiOiJtcHFxYXdmZnF3cmhranpheWJnayIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzc0NjEyMzk2LCJleHAiOjIwODk5NzIzOTYsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.xNo9bpWYA32Esc-XJ12TjEICm0DNaw_6iThbqTxcr5g';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };