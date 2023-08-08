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

        const {
            name,
            resistanceIds,
            weaknessIds,
        } = body;

        const createPokemonType = await prisma.pokemonType.create({
            data: {
                name,
                resistances: {
                    connect: resistanceIds.map((resistanceId: string) => ({ id: resistanceId })),
                },
                weaknesses: {
                    connect: weaknessIds.map((weaknessId: string) => ({ id: weaknessId })),
                },
            },
        });

        return NextResponse.json(createPokemonType);
    } catch (error) {
        console.log(error);
        return new NextResponse('Error creating Pokemon Type', { status: 500 });
    }
}
