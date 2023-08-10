import { supabaseClient } from '@/utils/supabaseClient';

import { Trainers } from '@/types';

export const getTrainers = async (): Promise<Trainers[]> => {
    const supabase = supabaseClient();

    const { data, error } = await supabase
        .from('trainers')
        .select(`
            *,
            avatars(*)
        `);

    if (error) {
        console.error('Error fetching abilities:', error);
    }

    return data || [];
}