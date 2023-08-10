import { NextResponse } from "next/server";
import { auth } from '@clerk/nextjs';

import prisma from "@/lib/prismadb";

export async function POST(request: Request) {
    const { userId } = auth();

    if (!userId) {
        return new NextResponse("Unauthenticated", { status: 403 });
    }

    try {
        const body = await request.json();
console.log(body)
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

        const createPokemon = await prisma.pokemon.create({
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

        return NextResponse.json(createPokemon);
    } catch (error) {
        console.log(error);
        return new NextResponse('Error creating Pokemon', { status: 500 });
    }
}
