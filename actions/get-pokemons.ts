import { supabaseClient } from '@/utils/supabaseClient';

import { Pokemons } from '@/types';

export const getPokemons = async (): Promise<Pokemons[]> => {
    const supabase = supabaseClient();

    const { data, error } = await supabase
        .from('pokemons')
        .select(`
            *,
            pokemon_types(*),
            pokemon_eggs(*),
            pokemon_abilities(*),
            pokemon_generations(*),
            pokemon_species(*),
            pokemon_evolutions!pokemon_id(
                first_next_evolution_id(*), 
                second_next_evolution_id(*),
                first_previous_evolution_id(*),
                second_previous_evolution_id(*)
            )
        `);

    if (error) {
        console.error('Error fetching pokemons:', error);
    }
    
    return data || [];
}
