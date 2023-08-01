import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";

export async function getPokemons() {
    try {
        const response = await prisma.pokemon.findMany({
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
        console.log(response);
        if (!response) {
            return new NextResponse('Pokemon not found', { status: 404 });
        }

        return NextResponse.json(response);
    } catch (error) {
        return new NextResponse('Error fetching Pokemon', { status: 500 });
    }
}

export async function getPokemon( { params }: { params: string }) {
    const pokemonId  = params;

    try {
        const response = await prisma.pokemon.findUnique({
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
        console.log(response);
        if (!response) {
            return new NextResponse('Pokemon not found', { status: 404 });
        }

        return NextResponse.json(response);
    } catch (error) {
        return new NextResponse('Error fetching Pokemon', { status: 500 });
    }
}