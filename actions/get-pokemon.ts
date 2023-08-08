import { supabaseClient } from '@/utils/supabaseClient';

export const getPokemons = async () => {
    const supabase = supabaseClient();

    const { data: Pokemons } = await supabase
        .from('Pokemon')
        .select(`
        name,
        PokemonType ( * ),
        PokemonGeneration ( * ),
        Pokemon: next_first_evolution_id ( name ), 
        previous_first_evolution_id ( name )
        `);

    console.log("oi");
    console.log(Pokemons);
    return Pokemons;
};

export const getPokemon = async (pokemonId: string) => {
    const supabase = supabaseClient();

    const { data: Pokemons } = await supabase
        .from('Pokemon')
        .select('*')
        .match({ id: pokemonId });

    const { data: PokemonEvolutions } = await supabase
        .from('_PokemonEvolutions')
        .select('previousEvolutionId')
        .match({ id: pokemonId });

    console.log(Pokemons);
    return Pokemons;
};
