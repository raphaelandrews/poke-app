export interface PokemonTypesWithInteractions {
    name: string;
    pokemon_types_interactions: {
        interaction_type_id: {
            name: string;
        }[];
    }[];
}

export interface Avatars {
    id: number;
    url: string;
}

export interface PokemonAbilities {
    name: string;
}

export interface PokemonEggs {
    name: string;
}

export interface PokemonGenerations {
    generation: string;
}

export interface PokemonSpecies {
    name: string;
}
