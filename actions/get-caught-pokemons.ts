import { supabaseClient } from '@/utils/supabaseClient';

import { Pokemons } from '@/types';

export const getCaughtPokemons = async (): Promise<Pokemons[]> => {
    const supabase = supabaseClient();

    const { data, error } = await supabase
        .from('caught_pokemons')
        .select(`
            *,
            trainers(*),
            pokemons(*)
        `);

    if (error) {
        console.error('Error fetching pokemons:', error);
    }
 
    return data || [];
}
