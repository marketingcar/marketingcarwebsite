import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jaiyxoysjethlblbicfd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphaXl4b3lzamV0aGxibGJpY2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1NzA4NDYsImV4cCI6MjA2NzE0Njg0Nn0.h3YXLROOz1hdqs5IvSzvbNCpA1C96x6X5Wnf-H7dzTs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);