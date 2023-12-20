import { useState , useEffect} from "react";
import axios from "axios";
import usePokemonList from "./usePokemonList";
function usePokemonDetail (id) {

        const [pokemon,setPokemon] =useState({});
    
        async function donloadPokemon() {
             const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            setPokemon({
                name: response.data.name,
                image: response.data.sprites.other.dream_world.front_default,
                weight : response.data.weight,
                height: response.data.height,
                types: response.data.types.map((t) =>t.type.name)
             });

             setPokemonListState ({...pokemonListState, url:`https://pokeapi.co/api/v2/type/${pokemon.types ? pokemon.types[0] : 'fire'}`});
    
        }
    

        const [pokemonListState , setPokemonListState] = usePokemonList( true);
        
    
        useEffect(() => {
            donloadPokemon();
            console.log("list" , pokemon.types);
            },[]);
       

            return [pokemon];
        }  

export default usePokemonDetail;