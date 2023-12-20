import axios from "axios";
import { useEffect, useState } from "react";


function usePokemonList( type) {

    const[pokemonListState, setPokemonListState] = useState({
        pokemonList:[],
        isLoading: true,
        pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
        nextUrl: '',
        prevUrl: ''
    });

    async function downloadPokemons(){
        // setIsLoading(true);
        setPokemonListState((state) => ({...state, isLoading: true}));
        const response = await axios.get(pokemonListState.pokedexUrl); // download 20 pokemons list

        const pokemonResult = response.data.results; //we get the array of pokemons from result

        console.log("response ise", response.data.pokemon)
        console.log(response.data);
        setPokemonListState( (state) =>({
            ...state, 
            nextUrl : response.data.next, 
            prevUrl : response.data.previous
        }));
    

        // iterating over the array of pokemons, and using their url, to  create an array of promises
        //that will download  those 20 pokemons

        if(type){
            setPokemonListState((state) => ({
                ...state,
                pokemonList: response.data.pokemon ?.slice(0,5)

            }))

        }

        else{

        const pokemonResultPromise = pokemonResult.map((pokemon) => axios.get(pokemon.url));
 
        //passing that  promise array to axios.all
        const pokemonData = await axios.all(pokemonResultPromise); // array of 20 pokemon detailed data
        console.log(pokemonData);

        // now iterate on the data each pokemon , and extract id, name, image, types
        const pokeListResult = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                id: pokemon.id,
                name : pokemon.name, 
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default: pokemon.sprites.front_shiny,
                types: pokemon.types
            }
        });
        console.log(pokeListResult);
        setPokemonListState((state) =>({
            ...state, 
            pokemonList : pokeListResult, 
            isLoading : false
        }));
    }

    

    }

    useEffect(() => {

        downloadPokemons();

    },[pokemonListState.pokedexUrl]);


    return[pokemonListState, setPokemonListState]


}

export default usePokemonList;