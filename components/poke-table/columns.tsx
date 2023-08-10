"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Pokemon, PokemonType } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PokemonWithTypes extends Pokemon {
  types: PokemonType[];
}

export const columns: ColumnDef<PokemonWithTypes>[] = [
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
    accessorKey: "typeId",
    header: "Types",
    cell: ({ row }) => {
    const { types } = row.original;

      return (
        <div className="flex gap-1">
          {types.map((type: { name: string | undefined }) => (
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
  },
  {
    accessorKey: "weight",
    header: "Weight",
  },
  {
    accessorKey: "id",
    header: "ID",
  },
]