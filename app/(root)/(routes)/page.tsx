"use client"

import { useState } from "react";
import { useAuth } from '@clerk/clerk-react';
import { supabaseClientAuth } from '@/utils/supabaseClient';

import { columns } from "@/components/poke-table/columns";
import { DataTable } from "@/components/poke-table/data-table";
import { Button } from "@/components/ui/button";
import usePokemonModal from "@/hooks/use-create-pokemon-modal";

import { getCaughtPokemons } from "@/actions/get-caught-pokemons";

export default function Home() {
  const { getToken } = useAuth();
  const [pokemon, setPokemon] = useState<any[] | null>([])
  const fetchData = async () => {
    const supabaseAccessToken = await getToken({ template: 'supabase' });
    const supabase = await supabaseClientAuth(supabaseAccessToken);
    const { data, error } = await supabase.from('_PokemonEvolutions')
      .select(`previousEvolutionId`)
    console.log(data)
    setPokemon(data);
    if (!data) return [];

    return data.map((item) => ({
      ...item.previousEvolutionId
    }))
  };

const pokes = getCaughtPokemons();

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

      <Button onClick={() => pokes}>
        Create Pokemon
      </Button>
      {pokemon?.map((p) => (
        <div key={p.url}>{p.url}</div>
      ))}
      {/*<DataTable columns={columns} data={pokemons} />*/}
    </>
  )
}
