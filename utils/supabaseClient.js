
import { createClient } from '@supabase/supabase-js'

export const supabaseClientAuth = async (supabaseToken) => {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            global: { headers: { Authorization: `Bearer ${supabaseToken}` } },
        },
        {
            auth: { persistSession: false },
        }
    );
    return supabase;
};

export const supabaseClient = () => {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    );
    return supabase;
};