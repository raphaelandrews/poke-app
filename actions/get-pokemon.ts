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

export const getPokemonTypes = async () => {
    const supabase = supabaseClient();

    const { data: PokemonType } = await supabase
        .from('PokemonType')
        .select(`
        *,
        ResistanceWeakness ( * )
        `);

    console.log("oi");
    console.log(PokemonType);
    return PokemonType;
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

export const getTypeInteractions = async (typeId: string) => {
    const supabase = supabaseClient();

    const { data, error } = await supabase
        .from('PokemonTypeInterations')
        .select('interaction_type_id, interaction_type, PokemonType: interaction_type_id ( name )')
        .eq('type_id ( PokemonType ( name ) )', typeId);

    if (error) {
        console.error('Error fetching type interactions:', error);
        return null;
    }

    const weaknesses: any[] = [];
    const resistances: any[] = [];

    data.forEach((interaction) => {
        if (interaction.interaction_type === true) {
            resistances.push({ interaction_name: interaction.PokemonType });
        } else if (interaction.interaction_type === false) {
            weaknesses.push({ interaction_name: interaction.PokemonType });
        }
    });

    return {
        weaknesses,
        resistances,
    };
}
