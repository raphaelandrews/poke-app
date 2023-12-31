export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      avatars: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id?: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      caught_pokemons: {
        Row: {
          attack: number | null
          defense: number | null
          hp: number | null
          id: string
          level: number | null
          pokemon_id: number | null
          special_attack: number | null
          special_defense: number | null
          speed: number | null
          trainer_id: string | null
          xp: number | null
        }
        Insert: {
          attack?: number | null
          defense?: number | null
          hp?: number | null
          id?: string
          level?: number | null
          pokemon_id?: number | null
          special_attack?: number | null
          special_defense?: number | null
          speed?: number | null
          trainer_id?: string | null
          xp?: number | null
        }
        Update: {
          attack?: number | null
          defense?: number | null
          hp?: number | null
          id?: string
          level?: number | null
          pokemon_id?: number | null
          special_attack?: number | null
          special_defense?: number | null
          speed?: number | null
          trainer_id?: string | null
          xp?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "caught_pokemons_pokemon_id_fkey"
            columns: ["pokemon_id"]
            referencedRelation: "pokemons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "caught_pokemons_trainer_id_fkey"
            columns: ["trainer_id"]
            referencedRelation: "trainers"
            referencedColumns: ["id"]
          }
        ]
      }
      pokemon_abilities: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id?: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      pokemon_eggs: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id?: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      pokemon_evolutions: {
        Row: {
          first_next_evolution_id: number | null
          first_previous_evolution_id: number | null
          id: number
          second_next_evolution_id: number | null
          second_previous_evolution_id: number | null
        }
        Insert: {
          first_next_evolution_id?: number | null
          first_previous_evolution_id?: number | null
          id?: number
          second_next_evolution_id?: number | null
          second_previous_evolution_id?: number | null
        }
        Update: {
          first_next_evolution_id?: number | null
          first_previous_evolution_id?: number | null
          id?: number
          second_next_evolution_id?: number | null
          second_previous_evolution_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "pokemon_evolutions_first_next_evolution_id_fkey"
            columns: ["first_next_evolution_id"]
            referencedRelation: "pokemons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pokemon_evolutions_first_previous_evolution_id_fkey"
            columns: ["first_previous_evolution_id"]
            referencedRelation: "pokemons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pokemon_evolutions_second_next_evolution_id_fkey"
            columns: ["second_next_evolution_id"]
            referencedRelation: "pokemons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pokemon_evolutions_second_previous_evolution_id_fkey"
            columns: ["second_previous_evolution_id"]
            referencedRelation: "pokemons"
            referencedColumns: ["id"]
          }
        ]
      }
      pokemon_generations: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id?: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      pokemon_species: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id?: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      pokemon_to_pokemon_abilities: {
        Row: {
          pokemon_ability_id: number
          pokemon_id: number
        }
        Insert: {
          pokemon_ability_id: number
          pokemon_id: number
        }
        Update: {
          pokemon_ability_id?: number
          pokemon_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "pokemon_to_pokemon_abilities_pokemon_ability_id_fkey"
            columns: ["pokemon_ability_id"]
            referencedRelation: "pokemon_abilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pokemon_to_pokemon_abilities_pokemon_id_fkey"
            columns: ["pokemon_id"]
            referencedRelation: "pokemons"
            referencedColumns: ["id"]
          }
        ]
      }
      pokemon_to_pokemon_eggs: {
        Row: {
          pokemon_egg_id: number
          pokemon_id: number
        }
        Insert: {
          pokemon_egg_id: number
          pokemon_id: number
        }
        Update: {
          pokemon_egg_id?: number
          pokemon_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "pokemon_to_pokemon_eggs_pokemon_egg_id_fkey"
            columns: ["pokemon_egg_id"]
            referencedRelation: "pokemon_eggs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pokemon_to_pokemon_eggs_pokemon_id_fkey"
            columns: ["pokemon_id"]
            referencedRelation: "pokemons"
            referencedColumns: ["id"]
          }
        ]
      }
      pokemon_to_pokemon_types: {
        Row: {
          pokemon_id: number
          pokemon_type_id: number
        }
        Insert: {
          pokemon_id: number
          pokemon_type_id: number
        }
        Update: {
          pokemon_id?: number
          pokemon_type_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "pokemon_to_pokemon_types_pokemon_id_fkey"
            columns: ["pokemon_id"]
            referencedRelation: "pokemons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pokemon_to_pokemon_types_pokemon_type_id_fkey"
            columns: ["pokemon_type_id"]
            referencedRelation: "pokemon_types"
            referencedColumns: ["id"]
          }
        ]
      }
      pokemon_types: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id?: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      pokemon_types_interactions: {
        Row: {
          interaction_type: boolean | null
          interaction_type_id: number
          type_id: number
        }
        Insert: {
          interaction_type?: boolean | null
          interaction_type_id: number
          type_id: number
        }
        Update: {
          interaction_type?: boolean | null
          interaction_type_id?: number
          type_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "pokemon_types_interactions_interaction_type_id_fkey"
            columns: ["interaction_type_id"]
            referencedRelation: "pokemon_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pokemon_types_interactions_type_id_fkey"
            columns: ["type_id"]
            referencedRelation: "pokemon_types"
            referencedColumns: ["id"]
          }
        ]
      }
      pokemons: {
        Row: {
          attack: number | null
          defense: number | null
          description: string | null
          evolution_first_id: string | null
          evolution_second_id: string | null
          generation_id: string | null
          height: string | null
          hp: number | null
          id: number
          level: number | null
          name: string | null
          special_attack: number | null
          special_defense: number | null
          species_id: string | null
          speed: number | null
          sprite: string | null
          thumbnail: string | null
          weight: string | null
          xp: number | null
        }
        Insert: {
          attack?: number | null
          defense?: number | null
          description?: string | null
          evolution_first_id?: string | null
          evolution_second_id?: string | null
          generation_id?: string | null
          height?: string | null
          hp?: number | null
          id?: number
          level?: number | null
          name?: string | null
          special_attack?: number | null
          special_defense?: number | null
          species_id?: string | null
          speed?: number | null
          sprite?: string | null
          thumbnail?: string | null
          weight?: string | null
          xp?: number | null
        }
        Update: {
          attack?: number | null
          defense?: number | null
          description?: string | null
          evolution_first_id?: string | null
          evolution_second_id?: string | null
          generation_id?: string | null
          height?: string | null
          hp?: number | null
          id?: number
          level?: number | null
          name?: string | null
          special_attack?: number | null
          special_defense?: number | null
          species_id?: string | null
          speed?: number | null
          sprite?: string | null
          thumbnail?: string | null
          weight?: string | null
          xp?: number | null
        }
        Relationships: []
      }
      trainers: {
        Row: {
          avatar_id: number | null
          id: string
          name: string | null
          user_id: string | null
        }
        Insert: {
          avatar_id?: number | null
          id?: string
          name?: string | null
          user_id?: string | null
        }
        Update: {
          avatar_id?: number | null
          id?: string
          name?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trainers_avatar_id_fkey"
            columns: ["avatar_id"]
            referencedRelation: "avatars"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
