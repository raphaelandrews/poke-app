export interface PokemonTypesWithInteractions {
    name: string;
    pokemon_types_interactions: {
        interaction_type_id: {
            name: string;
        }[];
    }[];
}
