import prisma from "@/lib/prismadb";
import { Pokemon, PokemonType } from "@prisma/client";

interface PokemonWithTypes extends Pokemon {
    types: PokemonType[];
}

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

export async function getPokemon({ params }: { params: string }) {
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
                eggs: true,
                abilities: true,
                species: true,
                caughtPokemons: true,
            },
        });

        if (!pokemon) {
            return null ;
        }

        return pokemon;
    } catch (error: any) {
        throw new Error('Error fetching Pokemon', error);
    }
}