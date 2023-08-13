"use client"

import { useEffect, useState } from "react";
import { useAuth } from '@clerk/clerk-react';

import { supabaseClientAuth } from '@/utils/supabaseClient';

import { columns } from "@/components/poke-table/columns";
import { DataTable } from "@/components/poke-table/data-table";
import { Button } from "@/components/ui/button";
import usePokemonModal from "@/hooks/use-create-pokemon-modal";

import { getPokemons } from "@/actions/get-pokemons";
import { Pokemons } from "@/types";

export default function Home() {
  const { getToken } = useAuth();
  const [pokemon, setPokemon] = useState<Pokemons[]>([]);
  const fetchData = async () => {
    const supabaseAccessToken = await getToken({ template: 'supabase' });
    const supabase = await supabaseClientAuth(supabaseAccessToken);
    const { data, error } = await supabase.from('_PokemonEvolutions')
      .select(`previousEvolutionId`)
    console.log(data)
    
    if (!data) return [];

    return data.map((item) => ({
      ...item.previousEvolutionId
    }))
  };


  const getData = async () => {
    const pokemons = await getPokemons();
    setPokemon(pokemons);
    console.log(pokemons)
  }

  useEffect(() => {
    getData();
  }, []);
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

      <Button onClick={() => 'pokes'}>
        Create Pokemon
      </Button>

      <DataTable columns={columns} data={pokemon} />
    </>
  )
}
