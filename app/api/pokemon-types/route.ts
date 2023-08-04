import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/actions/get-current-user";

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return new NextResponse('Unauthenticated', { status: 401 });
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
                    connect:  resistanceIds.map((resistanceId: string) => ({ id: resistanceId })),
                },
                weaknesses: {
                    connect:  weaknessIds.map((weaknessId: string) => ({ id: weaknessId })),
                },
            },
        });
        
        return NextResponse.json(createPokemonType);
    } catch (error) {
        console.log(error);
        return new NextResponse('Error creating Pokemon Type', { status: 500 });
    }
}
