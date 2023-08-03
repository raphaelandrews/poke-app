import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";
import getCurrentUser from "@/actions/get-current-user";

interface Params {
    pokemonId: string;
}

export async function PUT(request: Request, { params }: { params: Params }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return new NextResponse('Unauthenticated', { status: 403 });
    }

    try {
        const body = await request.json();

        const {
            name,
            description,
            height,
            weight,
            gender,
            hp,
            attack,
            defense,
            specialAttack,
            specialDefense,
            speed,
            previousEvolution,
            nextEvolution,
            sprite,
            thumbnail,
            typeIds,
            eggIds,
            abilityIds,
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
                gender,
                hp,
                attack,
                defense,
                specialAttack,
                specialDefense,
                speed,
                previousEvolution,
                nextEvolution,
                sprite,
                thumbnail,
                types: {
                    connect: typeIds.map((typeId: string) => ({ id: typeId })),
                },
                eggs: {
                    connect: eggIds.map((eggId: string) => ({ id: eggId })),
                },
                abilities: {
                    connect: abilityIds.map((abilityId: string) => ({ id: abilityId })),
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