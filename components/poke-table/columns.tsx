"use client"

import Image from "next/image";
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
        <div>
          {type.map((typeName) => (
            <span key={typeName}>
              <Image
                src={`https://raw.githubusercontent.com/raphaelandrews/table-crud-nextjs/443a858d2697936312b72fc3f5bb70de456d8789/public/images/pokemons-types-icons/${typeName.toLowerCase()}.svg`}
                alt={typeName}
                width={16}
                height={16}
              />
            </span>
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