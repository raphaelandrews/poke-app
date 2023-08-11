"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pokemons } from "@/types";

export const columns: ColumnDef<Pokemons>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <Avatar className="w-7 h-7 rounded-none">
            <AvatarImage
              src={row?.original?.thumbnail}
              alt={row?.original?.name}
              title={row?.original?.name}
              className="w-7 h-7"
            />
            <AvatarFallback>P</AvatarFallback>
          </Avatar>
          <p>{row?.original?.name}</p>
        </div>
      )
    }
  },
  {
    accessorKey: "pokemon_types",
    header: "Types",
    cell: ({ row }) => {
    const { pokemon_types } = row.original;

      return (
        <div className="flex gap-1">
          {pokemon_types?.map((type: { name: string | undefined }) => (
            <Avatar key={type.name} className="w-5 h-5">
              <AvatarImage
                src={`https://raw.githubusercontent.com/raphaelandrews/table-crud-nextjs/f47d73995f8fcc6a44f2848caeace9725454937b/public/images/pokemons-types-icons/${type?.name?.toLowerCase()}.svg`}
                alt={type.name}
                title={type.name}
              />
              <AvatarFallback>T</AvatarFallback>
            </Avatar>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "height",
    header: "Height",
    cell: ({ row }) => {
      return (
         <div>{row.original.height} m</div>
      )
    }
  },
  {
    accessorKey: "weight",
    header: "Weight",
    cell: ({ row }) => {
      return (
         <div>{row.original.weight} kg</div>
      )
    }
  },
  {
    accessorKey: "pokemon_generations.generation",
    header: "Generation",
  },
]