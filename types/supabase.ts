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
      _CaughtPokemonToTrainer: {
        Row: {
          caughtPokemonId: string
          trainerId: string
        }
        Insert: {
          caughtPokemonId: string
          trainerId: string
        }
        Update: {
          caughtPokemonId?: string
          trainerId?: string
        }
        Relationships: [
          {
            foreignKeyName: "_CaughtPokemonToTrainer_caughtPokemonId_fkey"
            columns: ["caughtPokemonId"]
            referencedRelation: "CaughtPokemon"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_CaughtPokemonToTrainer_trainerId_fkey"
            columns: ["trainerId"]
            referencedRelation: "Trainer"
            referencedColumns: ["id"]
          }
        ]
      }
      _PokemonEvolutions: {
        Row: {
          nextEvolutionId: string
          previousEvolutionId: string
        }
        Insert: {
          nextEvolutionId: string
          previousEvolutionId: string
        }
        Update: {
          nextEvolutionId?: string
          previousEvolutionId?: string
        }
        Relationships: [
          {
            foreignKeyName: "_PokemonEvolutions_nextEvolutionId_fkey"
            columns: ["nextEvolutionId"]
            referencedRelation: "Pokemon"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_PokemonEvolutions_previousEvolutionId_fkey"
            columns: ["previousEvolutionId"]
            referencedRelation: "Pokemon"
            referencedColumns: ["id"]
          }
        ]
      }
      _PokemonToPokemonAbility: {
        Row: {
          pokemonAbilityId: string
          pokemonId: string
        }
        Insert: {
          pokemonAbilityId: string
          pokemonId: string
        }
        Update: {
          pokemonAbilityId?: string
          pokemonId?: string
        }
        Relationships: [
          {
            foreignKeyName: "_PokemonToPokemonAbility_pokemonAbilityId_fkey"
            columns: ["pokemonAbilityId"]
            referencedRelation: "PokemonAbility"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_PokemonToPokemonAbility_pokemonId_fkey"
            columns: ["pokemonId"]
            referencedRelation: "Pokemon"
            referencedColumns: ["id"]
          }
        ]
      }
      _PokemonToPokemonEgg: {
        Row: {
          pokemonEggId: string
          pokemonId: string
        }
        Insert: {
          pokemonEggId: string
          pokemonId: string
        }
        Update: {
          pokemonEggId?: string
          pokemonId?: string
        }
        Relationships: [
          {
            foreignKeyName: "_PokemonToPokemonEgg_pokemonEggId_fkey"
            columns: ["pokemonEggId"]
            referencedRelation: "PokemonEgg"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_PokemonToPokemonEgg_pokemonId_fkey"
            columns: ["pokemonId"]
            referencedRelation: "Pokemon"
            referencedColumns: ["id"]
          }
        ]
      }
      _PokemonToPokemonType: {
        Row: {
          pokemonId: string
          pokemonTypeId: string
        }
        Insert: {
          pokemonId: string
          pokemonTypeId: string
        }
        Update: {
          pokemonId?: string
          pokemonTypeId?: string
        }
        Relationships: [
          {
            foreignKeyName: "_PokemonToPokemonType_pokemonId_fkey"
            columns: ["pokemonId"]
            referencedRelation: "Pokemon"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_PokemonToPokemonType_pokemonTypeId_fkey"
            columns: ["pokemonTypeId"]
            referencedRelation: "PokemonType"
            referencedColumns: ["id"]
          }
        ]
      }
      _ResistanceWeakness: {
        Row: {
          resistanceId: string
          weaknessId: string
        }
        Insert: {
          resistanceId: string
          weaknessId: string
        }
        Update: {
          resistanceId?: string
          weaknessId?: string
        }
        Relationships: [
          {
            foreignKeyName: "_ResistanceWeakness_resistanceId_fkey"
            columns: ["resistanceId"]
            referencedRelation: "PokemonType"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_ResistanceWeakness_weaknessId_fkey"
            columns: ["weaknessId"]
            referencedRelation: "PokemonType"
            referencedColumns: ["id"]
          }
        ]
      }
      Avatar: {
        Row: {
          avatar: string | null
          id: number
        }
        Insert: {
          avatar?: string | null
          id?: number
        }
        Update: {
          avatar?: string | null
          id?: number
        }
        Relationships: []
      }
      CaughtPokemon: {
        Row: {
          attack: number | null
          defense: number | null
          hp: number | null
          id: string
          level: number | null
          pokemonId: string | null
          specialAttack: number | null
          specialDefense: number | null
          speed: number | null
          xp: number | null
        }
        Insert: {
          attack?: number | null
          defense?: number | null
          hp?: number | null
          id?: string
          level?: number | null
          pokemonId?: string | null
          specialAttack?: number | null
          specialDefense?: number | null
          speed?: number | null
          xp?: number | null
        }
        Update: {
          attack?: number | null
          defense?: number | null
          hp?: number | null
          id?: string
          level?: number | null
          pokemonId?: string | null
          specialAttack?: number | null
          specialDefense?: number | null
          speed?: number | null
          xp?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "CaughtPokemon_pokemonId_fkey"
            columns: ["pokemonId"]
            referencedRelation: "Pokemon"
            referencedColumns: ["id"]
          }
        ]
      }
      Pokemon: {
        Row: {
          attack: number | null
          defense: number | null
          description: string | null
          generationId: string | null
          height: string | null
          hp: number | null
          id: string
          level: number | null
          name: string | null
          specialAttack: number | null
          specialDefense: number | null
          speciesId: string | null
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
          generationId?: string | null
          height?: string | null
          hp?: number | null
          id?: string
          level?: number | null
          name?: string | null
          specialAttack?: number | null
          specialDefense?: number | null
          speciesId?: string | null
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
          generationId?: string | null
          height?: string | null
          hp?: number | null
          id?: string
          level?: number | null
          name?: string | null
          specialAttack?: number | null
          specialDefense?: number | null
          speciesId?: string | null
          speed?: number | null
          sprite?: string | null
          thumbnail?: string | null
          weight?: string | null
          xp?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Pokemon_generationId_fkey"
            columns: ["generationId"]
            referencedRelation: "PokemonGeneration"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Pokemon_speciesId_fkey"
            columns: ["speciesId"]
            referencedRelation: "PokemonSpecies"
            referencedColumns: ["id"]
          }
        ]
      }
      PokemonAbility: {
        Row: {
          id: string
          name: string | null
        }
        Insert: {
          id?: string
          name?: string | null
        }
        Update: {
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      PokemonEgg: {
        Row: {
          id: string
          name: string | null
        }
        Insert: {
          id?: string
          name?: string | null
        }
        Update: {
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      PokemonGeneration: {
        Row: {
          generation: string | null
          id: string
        }
        Insert: {
          generation?: string | null
          id?: string
        }
        Update: {
          generation?: string | null
          id?: string
        }
        Relationships: []
      }
      PokemonSpecies: {
        Row: {
          id: string
          name: string | null
        }
        Insert: {
          id?: string
          name?: string | null
        }
        Update: {
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      PokemonType: {
        Row: {
          id: string
          name: string | null
        }
        Insert: {
          id?: string
          name?: string | null
        }
        Update: {
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      Trainer: {
        Row: {
          avatarId: number | null
          id: string
          name: string | null
          userId: string | null
        }
        Insert: {
          avatarId?: number | null
          id?: string
          name?: string | null
          userId?: string | null
        }
        Update: {
          avatarId?: number | null
          id?: string
          name?: string | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Trainer_avatarId_fkey"
            columns: ["avatarId"]
            referencedRelation: "Avatar"
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
