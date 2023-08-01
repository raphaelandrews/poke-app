import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";
import getCurrentUser from "@/actions/get-current-user";

interface Params {
    pokemonId: string;
}

interface PokemonTypeWhereUniqueInput {
    id: string;
  }

interface CreatePokemonBody {
    name: string;
    description: string;
    height: number;
    weight: number;
    gender: string;
    level: number;
    xp: number;
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
    previousEvolution: string[];
    nextEvolution: string[];
    sprite: string;
    thumbnail: string;
    types: PokemonTypeWhereUniqueInput[];
}


export async function GET(request: Request, { params }: { params: Params }) {
    try {
        const { pokemonId } = params;

        const response = await prisma.pokemon.findUnique({
            where: {
                id: pokemonId,
            },
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

export async function PUT(request: Request, { params }: { params: Params }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return new NextResponse('Unauthenticated', { status: 403 });
    }

    try {
        const { pokemonId } = params;
        const body = await request.json();

        const pokemon = await prisma.pokemon.findUnique({
            where: {
                id: pokemonId,
            },
            include: {
                types: true,
                eggs: true,
                abilities: true,
                species: true,
                caughtPokemons: true,
            },
        });

        if (!pokemon) {
            return new NextResponse('Pokemon not found', { status: 404 });
        }

        const updatedPokemon = await prisma.pokemon.update({
            where: {
                id: pokemonId,
            },
            data: {
                name: body.name,
                description: body.description,
                height: body.height,
                weight: body.weight,
                gender: body.gender,
                level: body.level,
                xp: body.xp,
                hp: body.hp,
                attack: body.attack,
                defense: body.defense,
                specialAttack: body.specialAttack,
                specialDefense: body.specialDefense,
                speed: body.speed,
                previousEvolution: {
                    set: body.previousEvolution,
                },
                nextEvolution: {
                    set: body.nextEvolution,
                },
                sprite: body.sprite,
                thumbnail: body.thumbnail,
                types: {
                    upsert: body.types.map((typeItem: { id: string; name: string }) => ({
                        where: { id: typeItem.id },
                        update: {
                            id: typeItem.id,
                        },
                    })),
                },
                eggs: {
                    upsert: body.eggs.map((eggItem: { id: string; name: string }) => ({
                        where: { id: eggItem.id },
                        update: {
                            id: eggItem.id,
                        },
                    })),
                },
                abilities: {
                    upsert: body.abilities.map((abilityItem: { id: string; name: string }) => ({
                        where: { id: abilityItem.id },
                        update: {
                            id: abilityItem.id,
                        },
                    })),
                },
            },
            include: {
                types: true,
                eggs: true,
                abilities: true,
                species: true,
                caughtPokemons: true,
            },
        });

        return NextResponse.json(updatedPokemon);
    } catch (error) {
        return new NextResponse('Error updating Pokemon', { status: 500 });
    }
}

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return new NextResponse('Unauthenticated', { status: 403 });
    }

    try {
        const body: CreatePokemonBody = await request.json();

        const createdPokemon = await prisma.pokemon.create({
            data: {
                name: body.name,
                description: body.description,
                height: body.height,
                weight: body.weight,
                gender: body.gender,
                level: body.level,
                xp: body.xp,
                hp: body.hp,
                attack: body.attack,
                defense: body.defense,
                specialAttack: body.specialAttack,
                specialDefense: body.specialDefense,
                speed: body.speed,
                previousEvolution: {
                    set: body.previousEvolution,
                },
                nextEvolution: {
                    set: body.nextEvolution,
                },
                sprite: body.sprite,
                thumbnail: body.thumbnail,
                types: {
                    connect: body.types,
                },
            },
            include: {
                types: true,
                eggs: true,
                abilities: true,
                species: true,
                caughtPokemons: true,
            },
        });

        return NextResponse.json(createdPokemon, { status: 201 });
    } catch (error) {
        return new NextResponse('Error creating Pokemon', { status: 500 });
    }
}