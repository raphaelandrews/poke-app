import { getPokemon } from "@/actions/get-pokemon";
import { columns } from "@/components/poke-table/columns";
import { DataTable } from "@/components/poke-table/data-table";
import { pokemons } from "@/data/pokemons";

export default function Home() {
  const getPokemons = getPokemon({ params: "64c879289fd56a347dd9f957" });
console.log(getPokemons);
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

      {/*<DataTable columns={columns} data={pokemons} />*/}
    </main>
  )
}
