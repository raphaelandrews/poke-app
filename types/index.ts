export interface Trainers {
    id: string;
    name: string;
    avatar_id: number;
}

export interface Pokemons {
    id: number;
    attack: number;
    defense: number;
    description: string;
    evolution_first_id: string;
    evolution_second_id: string;
    generation_id: string;
    height: string;
    hp: number;
    level: number;
    name: string;
    special_attack: number;
    special_defense: number;
    species_id: string;
    speed: number;
    sprite: string;
    thumbnail: string;
    weight: string;
    xp: number;
    pokemon_types: PokemonTypes[];
    pokemon_generations: PokemonGenerations;
}

export interface PokemonTypesWithInteractions {
    type_id: number;
    pokemon_types_interactions: {
        interaction_type_id: {
            name: string;
        }[];
    }[];
}

export interface PokemonTypes {
    id: number;
    name: string;
}

export interface Avatars {
    id: number;
    url: string;
}

export interface PokemonAbilities {
    id: number;
    name: string;
}

export interface PokemonEggs {
    id: number;
    name: string;
}

export interface PokemonGenerations {
    id: number;
    generation: string;
}

export interface PokemonSpecies {
    id: number;
    name: string;
}
