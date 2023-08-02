'use client'

import { Pokemon } from "@prisma/client";

const Poke = ({ ...pokemon }: Pokemon) => {
    return (
        <section>
            {pokemon.name}
            {pokemon.id}
        </section>
    );
}

export default Poke;