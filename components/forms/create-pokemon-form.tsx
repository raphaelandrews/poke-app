'use client';

import * as z from "zod"
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
    previousEvolutionIds: z.array(z.string()),
    nextEvolutionIds: z.array(z.string()),
    typeIds: z.array(z.string()),
    eggIds: z.array(z.string()),
    abilityIds: z.array(z.string()),
    generationId: z.string(),
    speciesId: z.string(),
});


const CreatePokemonForm = () => {
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
            previousEvolutionIds: [''],
            nextEvolutionIds: [''],
            typeIds: [''],
            eggIds: [''],
            abilityIds: [''],
            generationId: '',
            speciesId: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const response = await axios.post('/api/pokemons', values)
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
                            name="eggIds"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Eggs</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="eggIds"
                                            type="text"
                                            disabled={loading}
                                            placeholder="Monster, Grass"
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
                                    <FormLabel>Abilities</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="abilityIds"
                                            type="text"
                                            disabled={loading}
                                            placeholder="Overgrow, Chlorophyll"
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
                            name="generationId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Generation</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="generationId"
                                            type="text"
                                            disabled={loading}
                                            placeholder="1"
                                            required
                                            {...field} />
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
                            name="previousEvolutionIds"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Previous Evolutions</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="previousEvolutionIds"
                                            type="text"
                                            disabled={loading}
                                            placeholder="Previous Evolutions"
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
                            name="nextEvolutionIds"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Next Evolutions</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="nextEvolutionIds"
                                            type="text"
                                            disabled={loading}
                                            placeholder="Ivysaur, Venusaur"
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
                            name="typeIds"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Types</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="typeIds"
                                            type="text"
                                            disabled={loading}
                                            placeholder="Grass, Poison"
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
                                    <FormLabel>Species</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="speciesId"
                                            type="text"
                                            disabled={loading}
                                            placeholder="Seed"
                                            required
                                            {...field} />
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