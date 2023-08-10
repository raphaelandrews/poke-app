import { supabaseClient } from '@/utils/supabaseClient';

import { PokemonSpecies } from '@/types';

export const getPokemonSpecies = async (): Promise<PokemonSpecies[]> => {
    const supabase = supabaseClient();

    const { data, error } = await supabase
        .from('pokemon_species')
        .select('*');

    if (error) {
        console.error('Error fetching species:', error);
    }
console.log(data);
    return data || [];
}