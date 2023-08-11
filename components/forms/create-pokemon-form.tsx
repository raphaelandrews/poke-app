'use client';

import * as z from "zod"
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from '@clerk/clerk-react';

import { supabaseClientAuth } from '@/utils/supabaseClient';
import { useToast } from "@/hooks/use-toast";

import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Pokemons } from "@/types";

const formSchema = z.object({
    name: z.string(),
    description: z.string(),
    height: z.string(),
    weight: z.string(),
    hp: z.number(),
    attack: z.number(),
    defense: z.number(),
    specialAttack: z.number(),
    specialDefense: z.number(),
    speed: z.number(),
    sprite: z.string(),
    thumbnail: z.string(),
    typesIds: z.array(z.string()),
    eggsIds: z.array(z.string()),
    abilitiesIds: z.array(z.string()),
    generationId: z.number(),
    specieId: z.number(),
    firstNextEvolutionId: z.number(),
    secondNextEvolutionId: z.number(),
    firstPreviousEvolutionId: z.number(),
    secondPreviousEvolutionId: z.number(),
});


const CreatePokemonForm = () => {
    const { getToken } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description: '',
            height: '',
            weight: '',
            hp: 0,
            attack: 0,
            defense: 0,
            specialAttack: 0,
            specialDefense: 0,
            speed: 0,
            sprite: '',
            thumbnail: '',
            generationId: 0,
            specieId: 0,
            typesIds: [''],
            eggsIds: [''],
            abilitiesIds: [''],
            firstNextEvolutionId: 0,
            secondNextEvolutionId: 0,
            firstPreviousEvolutionId: 0,
            secondPreviousEvolutionId: 0,
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
        const supabaseAccessToken = await getToken({ template: 'supabase' });
        const supabase = await supabaseClientAuth(supabaseAccessToken);
        try {
            setLoading(true);
            const { data: pokemons, error: pokemonsError } = await supabase
                .from('pokemons')
                .insert({
                    name: values.name,
                    description: values.description,
                    height: values.height,
                    weight: values.weight,
                    hp: values.hp,
                    attack: values.attack,
                    defense: values.defense,
                    special_attack: values.specialAttack,
                    special_defense: values.specialDefense,
                    speed: values.speed,
                    sprite: values.sprite,
                    thumbnail: values.thumbnail,
                    generation_id: values.generationId,
                    specie_id: values.specieId,
                })
                .select()

            if (pokemonsError) {
                console.error(pokemonsError)
                return (
                    toast({
                        title: "Error registering Pokemon",
                    })
                )
            }
            console.log(pokemons)
            const pokemonsId = pokemons as unknown as Pokemons[];
            console.log(pokemonsId)
            if (pokemonsId != null) {
                const { data: evolutions, error: evolutionsError } = await supabase
                    .from('pokemon_evolutions')
                    .insert({
                        pokemon_id: pokemonsId[0].id,
                        first_next_evolution_id: values.firstNextEvolutionId,
                        second_next_evolution_id: values.secondNextEvolutionId,
                        first_previous_evolution_id: values.firstPreviousEvolutionId,
                        second_previous_evolution_id: values.secondPreviousEvolutionId,
                    })

                const typesIds = values.typesIds.map(Number);
                const eggsIds = values.eggsIds.map(Number);
                const abilitiesIds = values.abilitiesIds.map(Number);
                console.log(typesIds, eggsIds, abilitiesIds)
                const { data: types, error: typesError } = await supabase
                    .from('pokemon_to_pokemon_types')
                    .insert(typesIds.map(typeId => ({
                        pokemon_id: pokemonsId[0].id,
                        pokemon_type_id: typeId,
                    })));
                if (typesError) {
                    console.log(typesError)
                }
                const { data: eggs, error: eggsError } = await supabase
                    .from('pokemon_to_pokemon_eggs')
                    .insert(eggsIds.map(eggId => ({
                        pokemon_id: pokemonsId[0].id,
                        pokemon_egg_id: eggId,
                    })));
                if (eggsError) {
                    console.log(eggsError)
                }
                const { data: abilities, error: abilitiesError } = await supabase
                    .from('pokemon_to_pokemon_abilities')
                    .insert(abilitiesIds.map(abilityId => ({
                        pokemon_id: pokemonsId[0].id,
                        pokemon_ability_id: abilityId,
                    })));
                if (abilitiesError) {
                    console.log(abilitiesError)
                }
            }


            router.refresh();
            toast({
                title: "Pokemon registered",
            })
            form.reset();
        } catch (error) {

            toast({
                title: error instanceof Error ? error.message : "An error occurred",
            })
        } finally {
            setLoading(false);
        }
    };

    const arrayToString = (arr: string[]): string => arr.join(", ");

    return (
        <>
            <h1 className="text-2xl font-bold">Create Pokémon</h1>
            <Form {...form}>
                <form className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
                    <div className="space-y-2">
                        <h2 className="text-lg font-semibold">Profile</h2>
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
                                            placeholder="Bulbasaur"
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
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="description"
                                            type="text"
                                            disabled={loading}
                                            placeholder="Bulbasaur can be seen napping in bright sunlight."
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
                                    <FormLabel>Height</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="height"
                                            type="text"
                                            disabled={loading}
                                            placeholder="0.7"
                                            required
                                            {...field}
                                        />
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
                                    <FormLabel>Weight</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="weight"
                                            type="text"
                                            disabled={loading}
                                            placeholder="6.9"
                                            required
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="eggsIds"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Eggs</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="eggsIds"
                                            type="text"
                                            disabled={loading}
                                            placeholder="Monster, Grass"
                                            value={Array.isArray(field.value) ? field.value.join(', ') : field.value}
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
                            name="abilitiesIds"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Abilities</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="abilitiesIds"
                                            type="text"
                                            disabled={loading}
                                            placeholder="Overgrow, Chlorophyll"
                                            required
                                            value={Array.isArray(field.value) ? field.value.join(', ') : field.value}
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
                            name="generationId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Generation</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="generationId"
                                            type="number"
                                            disabled={loading}
                                            placeholder="1"
                                            min={0}
                                            step="any"
                                            required
                                            value={Number(field.value)}
                                            onChange={(e) => {
                                                const newValue = parseFloat(e.target.value);
                                                field.onChange(newValue);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-lg font-semibold">Base Stats</h2>
                        <FormField
                            control={form.control}
                            name="hp"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>HP</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="hp"
                                            type="number"
                                            disabled={loading}
                                            placeholder="45"
                                            min={0}
                                            step="any"
                                            required
                                            value={Number(field.value)}
                                            onChange={(e) => {
                                                const newValue = parseFloat(e.target.value);
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
                            name="attack"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Attack</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="attack"
                                            type="number"
                                            disabled={loading}
                                            placeholder="49"
                                            min={0}
                                            step="any"
                                            required
                                            value={Number(field.value)}
                                            onChange={(e) => {
                                                const newValue = parseFloat(e.target.value);
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
                            name="defense"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Defense</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="defense"
                                            type="number"
                                            disabled={loading}
                                            placeholder="49"
                                            min={0}
                                            step="any"
                                            required
                                            value={Number(field.value)}
                                            onChange={(e) => {
                                                const newValue = parseFloat(e.target.value);
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
                            name="specialAttack"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Special Attack</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="specialAttack"
                                            type="number"
                                            disabled={loading}
                                            placeholder="65"
                                            min={0}
                                            step="any"
                                            required
                                            value={Number(field.value)}
                                            onChange={(e) => {
                                                const newValue = parseFloat(e.target.value);
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
                            name="specialDefense"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Special Defense</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="specialDefense"
                                            type="number"
                                            disabled={loading}
                                            placeholder="65"
                                            min={0}
                                            step="any"
                                            required
                                            value={Number(field.value)}
                                            onChange={(e) => {
                                                const newValue = parseFloat(e.target.value);
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
                            name="speed"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Speed</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="speed"
                                            type="number"
                                            disabled={loading}
                                            placeholder="45"
                                            min={0}
                                            step="any"
                                            required
                                            value={Number(field.value)}
                                            onChange={(e) => {
                                                const newValue = parseFloat(e.target.value);
                                                field.onChange(newValue);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-lg font-semibold">Info</h2>
                        <FormField
                            control={form.control}
                            name="firstNextEvolutionId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>1st Next Evolution</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="firstNextEvolutionId"
                                            type="number"
                                            disabled={loading}
                                            placeholder="1st Next Evolution"
                                            min={0}
                                            step="any"
                                            required
                                            value={Number(field.value)}
                                            onChange={(e) => {
                                                const newValue = parseFloat(e.target.value);
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
                            name="secondNextEvolutionId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>2nd Next Evolution</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="secondNextEvolutionId"
                                            type="number"
                                            disabled={loading}
                                            placeholder="2nd Next Evolution"
                                            min={0}
                                            step="any"
                                            required
                                            value={Number(field.value)}
                                            onChange={(e) => {
                                                const newValue = parseFloat(e.target.value);
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
                            name="firstPreviousEvolutionId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>1st Previous Evolution</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="firstPreviousEvolutionId"
                                            type="number"
                                            disabled={loading}
                                            placeholder="1st Previous Evolution"
                                            min={0}
                                            step="any"
                                            required
                                            value={Number(field.value)}
                                            onChange={(e) => {
                                                const newValue = parseFloat(e.target.value);
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
                            name="secondPreviousEvolutionId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>2nd Previous Evolution</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="secondPreviousEvolutionId"
                                            type="number"
                                            disabled={loading}
                                            placeholder="2nd Previous Evolution"
                                            min={0}
                                            step="any"
                                            required
                                            value={Number(field.value)}
                                            onChange={(e) => {
                                                const newValue = parseFloat(e.target.value);
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
                                    <FormLabel>Sprite</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="sprite"
                                            type="text"
                                            disabled={loading}
                                            placeholder="Sprite URL"
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
                                    <FormLabel>Thumbnail</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="thumbnail"
                                            type="text"
                                            disabled={loading}
                                            placeholder="Thumbnail URL"
                                            required
                                            {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="typesIds"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Types</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="typesIds"
                                            type="text"
                                            disabled={loading}
                                            placeholder="Grass, Poison"
                                            required
                                            value={Array.isArray(field.value) ? field.value.join(', ') : field.value}
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
                            name="specieId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Specie</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="specieId"
                                            type="number"
                                            disabled={loading}
                                            placeholder="Seed"
                                            min={0}
                                            step="any"
                                            required
                                            value={Number(field.value)}
                                            onChange={(e) => {
                                                const newValue = parseFloat(e.target.value);
                                                field.onChange(newValue);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </form>
                <Button
                    type="submit"
                    onClick={form.handleSubmit(onSubmit)}
                    className="mt-8"
                >
                    Create Pokémon
                </Button>
            </Form>
        </>
    );
}

export default CreatePokemonForm;