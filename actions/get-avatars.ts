import { supabaseClient } from '@/utils/supabaseClient';

import { Avatars } from '@/types';

export const getAvatars = async (): Promise<Avatars[]> => {
    const supabase = supabaseClient();

    const { data, error } = await supabase
        .from('avatars')
        .select('*');

    if (error) {
        console.error('Error fetching avatars:', error);
    }

    return data || [];
}