import { columns } from "@/components/poke-table/columns";
import { DataTable } from "@/components/poke-table/data-table";
import { pokemons } from "@/data/pokemons";

export default function Home() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-center mt-8 leading-tight lg:leading-[1.1] tracking-tighter">Pokétable</h1>
        <DataTable columns={columns} data={pokemons} />
    </main>
  )
}
