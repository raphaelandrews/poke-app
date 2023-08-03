import { User, Pokemon, PokemonType } from "@prisma/client";

export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
};

export interface PokemonWithTypes extends Pokemon {
    types: PokemonType[];
}