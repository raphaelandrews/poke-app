import { NextResponse } from "next/server";
import { auth } from '@clerk/nextjs';

import prisma from "@/lib/prismadb";

interface Params {
    pokemonId: string;
}

export async function PUT(request: Request, { params }: { params: Params }) {
    const { userId } = auth();

    if (!userId) {
        return new NextResponse("Unauthenticated", { status: 403 });
    }


    try {
        const body = await request.json();

        const {
            name,
            description,
            height,
            weight,
            hp,
            attack,
            defense,
            specialAttack,
            specialDefense,
            speed,
            sprite,
            thumbnail,
            previousEvolutionIds,
            nextEvolutionIds,
            typeIds,
            eggIds,
            abilityIds,
            generationId,
            speciesId,
        } = body;

        const parts = request.url.split("/");
        const id = parts[parts.length - 1]

        const updatePokemon = await prisma.pokemon.update({
            where: {
                id: id
            },
            data: {
                name,
                description,
                height,
                weight,
                hp,
                attack,
                defense,
                specialAttack,
                specialDefense,
                speed,
                sprite,
                thumbnail,
                previousEvolutions: {
                    connect: previousEvolutionIds.map((previousEvolutionId: string) => ({ id: previousEvolutionId })),
                },
                nextEvolutions: {
                    connect: nextEvolutionIds.map((nextEvolutionId: string) => ({ id: nextEvolutionId })),
                },
                types: {
                    connect: typeIds.map((typeId: string) => ({ id: typeId })),
                },
                eggs: {
                    connect: eggIds.map((eggId: string) => ({ id: eggId })),
                },
                abilities: {
                    connect: abilityIds.map((abilityId: string) => ({ id: abilityId })),
                },
                generations: {
                    connect: { id: generationId },
                },
                species: {
                    connect: { id: speciesId },
                },
            },
        });

        return NextResponse.json(updatePokemon);
    } catch (error) {
        return new NextResponse('Error updating Pokemon', { status: 500 });
    }
}