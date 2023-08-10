import { supabaseClient } from '@/utils/supabaseClient';

import { PokemonAbilities } from '@/types';

export const getPokemonAbilities = async (): Promise<PokemonAbilities[]> => {
    const supabase = supabaseClient();

    const { data, error } = await supabase
        .from('pokemon_abilities')
        .select('*');

    if (error) {
        console.error('Error fetching abilities:', error);
    }

    return data || [];
}