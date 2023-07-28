"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Pokemon } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const columns: ColumnDef<Pokemon>[] = [
  {
    accessorKey: "name.english",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <Avatar className="w-7 h-7 rounded-none">
            <AvatarImage
              src={row?.original?.image.thumbnail}
              alt={row?.original?.name.english}
              title={row?.original?.name.english}
              className="w-7 h-7"
            />
            <AvatarFallback>P</AvatarFallback>
          </Avatar>
          <p>{row?.original?.name.english}</p>
        </div>
      )
    }
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const { type } = row.original;
      return (
        <div className="flex gap-1">
          {type.map((typeName) => (
            <Avatar key={typeName} className="w-5 h-5">
              <AvatarImage
                src={`https://raw.githubusercontent.com/raphaelandrews/table-crud-nextjs/f47d73995f8fcc6a44f2848caeace9725454937b/public/images/pokemons-types-icons/${typeName.toLowerCase()}.svg`}
                alt={typeName}
                title={typeName}
              />
              <AvatarFallback>T</AvatarFallback>
            </Avatar>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "profile.height",
    header: "Height",
  },
  {
    accessorKey: "profile.weight",
    header: "Weight",
  },
  {
    accessorKey: "id",
    header: "ID",
  },
]