export interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    emailVerified?: Date | null;
    hashedPassword?: string | null;
    createdAt: Date;
    updatedAt: Date;
    avatarId?: string | null;
    avatar?: Avatar | null;
    accounts: Account[];
    caughtPokemons: CaughtPokemon[];
}

export interface Account {
    id: string;
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string | null;
    access_token?: string | null;
    expires_at?: number | null;
    token_type?: string | null;
    scope?: string | null;
    id_token?: string | null;
    session_state?: string | null;
    user: User;
}

export interface Avatar {
    id: string;
    name: string;
    users: User[];
}

export interface CaughtPokemon {
    id: string;
    level: number;
    xp: number;
    hp?: number | null;
    attack?: number | null;
    defense?: number | null;
    specialAttack?: number | null;
    specialDefense?: number | null;
    speed?: number | null;
    userId: string;
    user: User;
    pokemonId: string;
    pokemon: Pokemon;
}

export interface Pokemon {
    id: string;
    name: string;
    description?: string | null;
    height?: number | null;
    weight?: number | null;
    gender?: string | null;
    level?: number | null;
    xp?: number | null;
    hp?: number | null;
    attack?: number | null;
    defense?: number | null;
    specialAttack?: number | null;
    specialDefense?: number | null;
    speed?: number | null;
    previousEvolution?: string[] | null;
    nextEvolution?: string[] | null;
    sprite?: string | null;
    thumbnail?: string | null;
    typeId?: string[] | null;
    types: PokemonType[];
    eggId?: string[] | null;
    eggs: PokemonEgg[];
    abilityId?: string[] | null;
    abilities: PokemonAbility[];
    speciesId?: string | null;
    species?: PokemonSpecies | null;
    caughtPokemons: CaughtPokemon[];
}

export interface PokemonEgg {
    id: string;
    name: string;
    pokemonId: string[] | null;
    pokemons: Pokemon[];
}

export interface PokemonAbility {
    id: string;
    name: string;
    active: boolean;
    pokemonId: string[] | null;
    pokemons: Pokemon[];
}

export interface PokemonSpecies {
    id: string;
    name: string;
    pokemons: Pokemon[];
}

export interface PokemonType {
    id: string;
    name: string;
    resistance?: string[] | null;
    weakness?: string[] | null;
    pokemonId?: string[] | null;
    pokemons: Pokemon[];
}

export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
};