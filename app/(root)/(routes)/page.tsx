"use client"

import { getPokemon } from "@/actions/get-pokemons";
import { columns } from "@/components/poke-table/columns";
import { DataTable } from "@/components/poke-table/data-table";
import { Button } from "@/components/ui/button";
import usePokemonModal from "@/hooks/use-create-pokemon-modal";

import { useAuth } from '@clerk/clerk-react';
import { supabaseClientAuth } from '@/utils/supabaseClient';
import { useState } from "react";
import { getPokemons, getPokemonTypes, getTypeInteractions } from "@/actions/get-pokemon";
import { getPokemonTypesWithInteractions } from "@/actions/get-pokemon-types";

export default function Home() {
  {/*const pokemons = await getPokemons();*/ }
  const PokemonModal = usePokemonModal();
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

  const fetchData2 = async () => {
    const supabaseAccessToken = await getToken({ template: 'supabase' });
    const supabase = await supabaseClientAuth(supabaseAccessToken);
    const { data, error } = await supabase.from('Pokemon')
      .select('*')
    console.log(data)
    setPokemon(data);
    if (!data) return [];

    return data.map((item) => ({
      ...item.name
    }))
  };

  //const getPoke = getPokemons();
  //const getPokeType = getPokemonTypes();
 // const getPokeTypeRW = getTypeInteractions('1f365c9f-37e9-472b-b04b-cd45420d1566');
const Pokes = getPokemonTypesWithInteractions()

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

      <Button onClick={() => Pokes}>
        Create Pokemon
      </Button>
      {pokemon?.map((p) => (
        <div key={p.name}>{p.name}{p.id}</div>
      ))}
      {/*<DataTable columns={columns} data={pokemons} />*/}
    </>
  )
}
