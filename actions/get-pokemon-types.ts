import prisma from "@/lib/prismadb";
import { PokemonType } from "@prisma/client";

export async function getPokemonTypes(): Promise<PokemonType[]> {
    try {
        const pokemons = await prisma.pokemonType.findMany({
            include: {
                pokemons: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            },
        });

        return pokemons;
    } catch (error: any) {
        throw new Error('Error fetching Pokemon', error);
    }
}

export async function getPokemonType(params: string) {
    const pokemonTypeId = params;

    try {
        const pokemonType = await prisma.pokemonType.findUnique({
            where: {
                id: pokemonTypeId,
            },
            include: {
                pokemons: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            },
        });

        if (!pokemonType) {
            return null;
        }

        return pokemonType;
    } catch (error: any) {
        throw new Error('Error fetching Pokemon', error);
    }
}