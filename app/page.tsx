"use client"

import { getPokemon } from "@/actions/get-pokemon";
import { getPokemons } from "@/actions/get-pokemon";
import { columns } from "@/components/poke-table/columns";
import { DataTable } from "@/components/poke-table/data-table";
import { Button } from "@/components/ui/button";
import usePokemonModal from "@/hooks/use-create-pokemon-modal";

export default function Home() {
  {/*const pokemons = await getPokemons();*/ }
  const PokemonModal = usePokemonModal();

  return (
    <>
      <h1
        className="
          text-2xl 
          md:text-3xl 
          font-bold 
          text-center 
          mt-6
          md:mt-8 
          leading-tight 
          lg:leading-[1.1] 
          tracking-tighter
        "
      >
        Pokétable
      </h1>

      <Button onClick={PokemonModal.onOpen}>
        Create Pokemon
      </Button>

      {/*<DataTable columns={columns} data={pokemons} />*/}
    </>
  )
}
