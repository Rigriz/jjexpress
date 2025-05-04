import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL= process.env.SUPABASE_URL; // replace with yours
const SUPABASE_SERVICE_KEY= process.env.SUPBASE_KEY; // replace with yours

export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
