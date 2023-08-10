import { supabaseClient } from '@/utils/supabaseClient';

import { PokemonTypesWithInteractions } from '@/types';

export const getPokemonTypesWithInteractions = async (): Promise<PokemonTypesWithInteractions[]> => {
    const supabase = supabaseClient();

    const { data, error } = await supabase
        .from('pokemon_types')
        .select(`
            *,
            pokemon_types_interactions!type_id(interaction_type_id(name))
        `);

    if (error) {
        console.error('Error fetching types with interactions:', error);
    }

    return data || [];
}
