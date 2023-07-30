import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";
import getCurrentUser from "@/actions/get-current-user";

interface Params {
    pokemonId: string;
}

export async function GET(request: Request, { params }: { params: Params }) {
    try {
        const parts = request.url.split("/");
        const playerId = parts[parts.length - 1]

        const response = await prisma.pokemon.findUnique({
            where: {
                id: playerId
            },
            include: {
                name: true,
                base: true,
                profile: true,
                evolution: true,
                image: true,
            },
        });

        return NextResponse.json(response)
    } catch (error) {
        return NextResponse.json(error)
    }
}

export async function PUT(request: Request, { params }: { params: Params }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return new NextResponse("Unauthenticated", { status: 403 });
    }

    try {
        const body = await request.text();
        const {
            name,
            type,
            base,
            species,
            description,
            evolution,
            profile,
            image
        } = JSON.parse(body);

        const parts = request.url.split("/");
        const playerId = parts[parts.length - 1]

        const response = await prisma.pokemon.update({
            where: {
                id: playerId
            },
            data: {
                name,
                type,
                base,
                species,
                description,
                evolution,
                profile,
                image
            }
        });

        return NextResponse.json(response)
    } catch (error) {
        return NextResponse.json(error)
    }
}