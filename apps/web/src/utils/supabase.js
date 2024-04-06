import { createClient } from "@supabase/supabase-js";

export const supabase = createClient('https://ljfstflbuhgseqixprpe.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqZnN0ZmxidWhnc2VxaXhwcnBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIyMjUxODEsImV4cCI6MjAyNzgwMTE4MX0.fKwx-fTsWr9a_-GLHlIQfREgH3wPQ4muVnONmOY365g')