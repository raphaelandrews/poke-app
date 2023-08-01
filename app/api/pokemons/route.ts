import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";
import getCurrentUser from "@/actions/get-current-user";

import { Pokemon } from "@/types";

export async function GET(request: Request) {
    try {
        const response = await prisma.pokemon.findMany({
            include: {
                types: true,
                eggs: true,
                abilities: true,
                species: true,
                caughtPokemons: true,
            },
        });

        if (!response) {
            return new NextResponse('Pokemon not found', { status: 404 });
        }

        return NextResponse.json(response);
    } catch (error) {
        return new NextResponse('Error fetching Pokemon', { status: 500 });
    }
}

/*
export async function POST(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return new NextResponse('Unauthenticated', { status: 403 });
    }

    try {
        const body = await request.json();

        const newPokemonData = {
            name: body.name,
            description: body.description,
            user: body.user,
        };

        const createdPokemon = await prisma.pokemon.create({
            data: {
                ...newPokemonData,
            },
            include: {
                base: true,
                profile: true,
                evolution: true,
                image: true,
                type: true,
                pokemonSpecie: true,
                user: true,
            },
        });

        return NextResponse.json(createdPokemon);
    } catch (error) {
        return new NextResponse('Error creating Pokemon', { status: 500 });
    }
}*/