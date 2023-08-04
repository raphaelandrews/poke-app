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
    resistanceIds: z.array(z.string()),
    weaknessIds: z.array(z.string()),
});


const CreatePokemonTypeForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            resistanceIds: [''],
            weaknessIds: [''],
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const response = await axios.post('/api/pokemon-types', values)
            router.refresh();
            toast({
                title: "Pokemon type registered",
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
                            name="resistanceIds"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Resistance</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="resistanceIds"
                                            type="text"
                                            disabled={loading}
                                            placeholder="Resistance to"
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
                            name="weaknessIds"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Weak</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="weaknessIds"
                                            type="text"
                                            disabled={loading}
                                            placeholder="Weak to"
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
                    </div>
                </form>
                <Button
                    type="submit"
                    onClick={form.handleSubmit(onSubmit)}
                    className="mt-8"
                >
                    Create Pokémon Type
                </Button>
            </Form>
        </>
    );
}

export default CreatePokemonTypeForm;