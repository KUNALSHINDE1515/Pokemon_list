
import { useParams } from "react-router-dom";
import './PokemonDetails.css';
import usePokemonDetail from "../hooks/usepokemonDetails";

function PokemonDetails() {

    const{id}  =useParams();
    const[pokemon] =usePokemonDetail(id);


    return (

        <div className="pokemon-details-wrapper">
            <img className="pokemon-details-image" src={pokemon.image}/>
           <div className="pokemon-details-name">  <span> {pokemon.name}</span></div>
           
           <div className="pokemon-details-name">Height: {pokemon.height} </div>
           <div className="pokemon-details-name">Weight: {pokemon.weight}  </div>

           <div className="pokemon-details-types">
           { pokemon.types && pokemon.types.map((t) => <div key={t}> {t}</div>)}
           </div>


           {pokemon.types &&
           <div>
              More {pokemon.types[0]}types pokemons

               <ul>
                   {pokemonListHookResponse && pokemonListState.pokemonList && pokemonListState.pokemonList.map((p) => <li key={p.pokemon.url}>{p.pokemon.name}</li>)}
               </ul>
           </div>
           }
        </div>
    );
}

export default PokemonDetails;