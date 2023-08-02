import { getPokemon } from "@/actions/get-pokemon";
import { getPokemons } from "@/actions/get-pokemon";
import { columns } from "@/components/poke-table/columns";
import { DataTable } from "@/components/poke-table/data-table";
import Poke from "./poke";

export default async function Home() {
  const pokemon = await getPokemon({ params: "64c879289fd56a347dd9f957" });
  const pokemons = await getPokemons();

  if (!pokemon) {
    return (
      null
    );
  }

  return (
    <main className="container min-h-screen">
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

      <Poke {...pokemon} />

      <DataTable columns={columns} data={pokemons} />
    </main>
  )
}
