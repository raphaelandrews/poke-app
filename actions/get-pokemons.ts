import prisma from "@/lib/prismadb";
import { PokemonWithTypes } from "@/types";

export async function getPokemons(): Promise<PokemonWithTypes[]> {
    try {
        const pokemons = await prisma.pokemon.findMany({
            include: {
                types: true,
                eggs: true,
                abilities: true,
                species: true,
                caughtPokemons: true,
            },
        });

        return pokemons;
    } catch (error: any) {
        throw new Error('Error fetching Pokemon', error);
    }
}

export async function getPokemon(params: string) {
    const pokemonId = params;

    try {
        const pokemon = await prisma.pokemon.findUnique({
            where: {
                id: pokemonId,
            },
            include: {
                types: {
                    select: {
                        id: true,
                        name: true,
                        resistance: true,
                        weakness: true,
                        pokemons: true,
                    },
                },
                eggs: {
                    select: {
                        id: true,
                        name: true,
                        pokemons: true,
                    },
                },
                abilities: {
                    select: {
                        id: true,
                        name: true,
                        pokemons: true,
                    },
                },
                species: {
                    select: {
                        id: true,
                        name: true,
                        pokemons: true,
                    },
                },
                caughtPokemons: {
                    select: {
                        id: true,
                        level: true,
                        xp: true,
                        hp: true,
                        attack: true,
                        defense: true,
                        specialAttack: true,
                        specialDefense: true,
                        speed: true,
                        user: true,
                        pokemon: true,
                    },
                },
            },
        });

        if (!pokemon) {
            return null;
        }

        return pokemon;
    } catch (error: any) {
        throw new Error('Error fetching Pokemon', error);
    }
}