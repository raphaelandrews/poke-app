'use client';

import * as z from "zod"
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

import useCreatePokemonModal from "@/hooks/use-create-pokemon-modal";
import { useToast } from "@/hooks/use-toast";

import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  height: z.number(),
  weight: z.number(),
  gender: z.string(),
  hp: z.number(),
  attack: z.number(),
  defense: z.number(),
  specialAttack: z.number(),
  specialDefense: z.number(),
  speed: z.number(),
  previousEvolution: z.array(z.string()),
  nextEvolution: z.array(z.string()),
  sprite: z.string(),
  thumbnail: z.string(),
  typeIds: z.array(z.string()),
  eggIds: z.array(z.string()),
  abilityIds: z.array(z.string()),
  speciesId: z.string(),
});


const CreatePokemonModal = () => {
  const createPokemonModal = useCreatePokemonModal();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      height: 1,
      weight: 1,
      gender: '',
      hp: 1,
      attack: 1,
      defense: 1,
      specialAttack: 1,
      specialDefense: 1,
      speed: 1,
      previousEvolution: [''],
      nextEvolution: [''],
      sprite: '',
      thumbnail: '',
      typeIds: [''],
      eggIds: [''],
      abilityIds: [''],
      speciesId: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/pokemons', values)
      router.refresh();
      console.log("resposta" + response);
      toast({
        title: "Pokemon registered",
      })
      createPokemonModal.onClose();
    } catch (error) {
      console.log("resposta" +  error);
      toast({
        title: error instanceof Error ? error.message : "An error occurred",
      })
    } finally {
      setLoading(false);
    }
  };

  const arrayToString = (arr: string[]): string => arr.join(", ");

  const bodyContent = (
    <div className="flex flex-col gap-4 !max-h-[80vh] overflow-scroll">
      <div className="text-2xl font-bold">
        Insert Pokémon data
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    id="name"
                    type="text"
                    disabled={loading}
                    placeholder="Name"
                    required
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    id="description"
                    type="text"
                    disabled={loading}
                    placeholder="description"
                    required
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    id="height"
                    type="number"
                    disabled={loading}
                    placeholder="height"
                    required
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    id="weight"
                    type="number"
                    disabled={loading}
                    placeholder="weight"
                    required
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    id="gender"
                    type="text"
                    disabled={loading}
                    placeholder="gender"
                    required
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    id="hp"
                    type="number"
                    disabled={loading}
                    placeholder="hp"
                    required
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="attack"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    id="attack"
                    type="number"
                    disabled={loading}
                    placeholder="attack"
                    required
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="defense"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    id="defense"
                    type="number"
                    disabled={loading}
                    placeholder="defense"
                    required
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="specialAttack"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    id="specialAttack"
                    type="number"
                    disabled={loading}
                    placeholder="specialAttack"
                    required
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="specialDefense"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    id="specialDefense"
                    type="number"
                    disabled={loading}
                    placeholder="specialDefense"
                    required
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="speed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    id="speed"
                    type="text"
                    disabled={loading}
                    placeholder="speed"
                    required
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="previousEvolution"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    id="previousEvolution"
                    type="text"
                    disabled={loading}
                    placeholder="previousEvolution"
                    required
                    value={arrayToString(field.value)}
                    onChange={(e) => {
                      const newValue = e.target.value.split(", ");
                      field.onChange(newValue);
                    }}
                     />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nextEvolution"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    id="nextEvolution"
                    type="text"
                    disabled={loading}
                    placeholder="nextEvolution"
                    required
                    value={arrayToString(field.value)}
                    onChange={(e) => {
                      const newValue = e.target.value.split(", ");
                      field.onChange(newValue);
                    }}
                     />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sprite"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    id="sprite"
                    type="text"
                    disabled={loading}
                    placeholder="sprite"
                    required
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    id="thumbnail"
                    type="text"
                    disabled={loading}
                    placeholder="thumbnail"
                    required
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="typeIds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Types</FormLabel>
                <FormControl>
                  <Input
                    id="typeIds"
                    type="text"
                    disabled={loading}
                    placeholder="typeIds"
                    required
                    value={arrayToString(field.value)}
                    onChange={(e) => {
                      const newValue = e.target.value.split(", ");
                      field.onChange(newValue);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="eggIds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    id="eggIds"
                    type="text"
                    disabled={loading}
                    placeholder="eggIds"
                    required
                    value={arrayToString(field.value)}
                    onChange={(e) => {
                      const newValue = e.target.value.split(", ");
                      field.onChange(newValue);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="abilityIds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    id="abilityIds"
                    type="text"
                    disabled={loading}
                    placeholder="abilityIds"
                    required
                    value={arrayToString(field.value)}
                    onChange={(e) => {
                      const newValue = e.target.value.split(", ");
                      field.onChange(newValue);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="speciesId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    id="speciesId"
                    type="text"
                    disabled={loading}
                    placeholder="speciesId"
                    required
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">

    </div>
  )

  return (
    <Modal
      disabled={loading}
      isOpen={createPokemonModal.isOpen}
      title="Create Pokémon"
      actionLabel="Create Pokémon"
      onClose={createPokemonModal.onClose}
      onSubmit={form.handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default CreatePokemonModal;