import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/actions/get-current-user";

export async function POST(request: Request) {
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

        const createPokemon = await prisma.pokemon.create({
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
        
        return NextResponse.json(createPokemon);
    } catch (error) {
        return new NextResponse('Error creating Pokemon', { status: 500 });
    }
}
