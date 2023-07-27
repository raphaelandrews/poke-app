export interface PokemonName {
    english: string;
    japanese: string;
    chinese: string;
    french: string;
}

export interface PokemonBaseStats {
    HP: number;
    Attack: number;
    Defense: number;
    "Sp. Attack": number;
    "Sp. Defense": number;
    Speed: number;
}

export interface PokemonProfile {
    height: string;
    weight: string;
    egg: string[];
    ability: string[] | string[][];
    gender: string;
}

interface PokemonEvolution {
    prev?: string[];
    next?: string[] | string[][];
}

export interface PokemonImage {
    sprite: string;
    thumbnail: string;
    hires: string;
}

export interface Pokemon {
    id: number;
    name: PokemonName;
    type: string[];
    base: PokemonBaseStats;
    species: string;
    description: string;
    evolution: PokemonEvolution;
    profile: PokemonProfile;
    image: PokemonImage;
}