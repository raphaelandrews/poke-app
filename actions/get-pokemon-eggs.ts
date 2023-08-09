import { supabaseClient } from '@/utils/supabaseClient';

import { PokemonEggs } from '@/types';

export const getPokemonEggs = async (): Promise<PokemonEggs[]> => {
    const supabase = supabaseClient();

    const { data, error } = await supabase
        .from('pokemon_eggs')
        .select(`
            name
        `);

    if (error) {
        console.error('Error fetching eggs:', error);
    }
    
    return data || [];
}