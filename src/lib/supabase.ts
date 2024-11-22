import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dkgssircktpxtvgwfnnk.supabase.co';
const supabaseAnonKey = 'sbp_42e1c67e7fa372fadf4d2468646a2d68ccd64e7e';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);