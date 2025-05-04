import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_SUPABASE_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

