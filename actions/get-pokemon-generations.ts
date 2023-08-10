import { supabaseClient } from '@/utils/supabaseClient';

import { PokemonGenerations } from '@/types';

export const getPokemonGenerations = async (): Promise<PokemonGenerations[]> => {
    const supabase = supabaseClient();

    const { data, error } = await supabase
        .from('pokemon_generations')
        .select('*');

    if (error) {
        console.error('Error fetching generations:', error);
    }
console.log(data);
    return data || [];
}