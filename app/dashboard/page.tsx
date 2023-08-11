import CreatePokemonForm from "@/components/forms/create-pokemon-form";
import CreatePokemonTypeForm from "@/components/forms/create-pokemon-type-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

const Dashboard = () => {
    return (
        <>
            <Tabs defaultValue="create-pokemon" className="w-full">
                <TabsList className="grid max-w-[400px] grid-cols-2">
                    <TabsTrigger value="create-pokemon">Create Pokémon</TabsTrigger>
                    <TabsTrigger value="create-pokemon-type">Create Pokémon Type</TabsTrigger>
                </TabsList>
                <TabsContent value="create-pokemon" className="mt-4">
                    <CreatePokemonForm />
                </TabsContent>
                <TabsContent value="create-pokemon-type" className="mt-4">
                    <CreatePokemonTypeForm />
                </TabsContent>
            </Tabs>
        </>
    );
}

export default Dashboard;