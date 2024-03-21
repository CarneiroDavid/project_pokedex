import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PokemonInfo from './PokemonInfo';
import PokemonCard from '../components/pokemon/PokemonCard';

export default function Pokedex(){

    const [pokedex, setPokedex] = useState([]);
    const [pokelist,setPokeList] = useState([]);
    const [recherche, setRecherche] = useState('');
    const deleteFromPokedex = (target)=>{
        var newPokedex = pokedex
        console.log(target.target.id)
        var newPokedex = newPokedex.filter((pokemon) => pokemon.id != target.target.id);
        setPokedex(newPokedex);
        localStorage.setItem('pokedex',JSON.stringify(newPokedex))
    };
    const clearPokedex = ()=>{
        setPokedex([])
        localStorage.setItem('pokedex','[]')
    };
    const doSearch = async (event) => {
        const isWritableKey = event.key.length === 1;
        console.log(event.key)
        console.log(recherche)
        if(isWritableKey || event.key === "Backspace"){
            var name = event.target.value;
            setRecherche(name);
            console.log(name);
        }
    };
    useEffect(() => {
        const fetchPokedex = async () => {
            // Implémentez ici la logique pour récupérer les données du Pokédex depuis le serveur ou localStorage
            var localPokedex = localStorage.getItem('pokedex')
            // var localPokedex = null
            var local;
            console.log(localPokedex)
            if(localPokedex)
                local = JSON.parse(localPokedex);
            else
                local = [];
            setPokedex(local)
        };

        fetchPokedex();
    }, []);

    return (
        <div>
            <h1  className="text-center">Pokedex</h1>
            <input type='text' onKeyUp={doSearch}/>
            <br/>
            <button className='btn btn-danger' onClick={clearPokedex} >Vider le Pokedex</button>
            {/* <div>
                { console.log("recherche", recherche , recherche.length, typeof recherche)}
                { pokelist.filter(poke => (poke.name.toLowerCase().includes(recherche.toLowerCase()) || recherche.length == 0)).map((pokemonInfo,index)=>(
                        <PokemonCard
                        name={pokemonInfo.name}
                        id={pokemonInfo.url}
                        />
                ))}
            </div> */}
            <div className='row home-row'>
                { pokedex.filter(poke => poke.name.toLowerCase().includes(recherche.toLowerCase())  || recherche.length === 0).map((pokemon,index)=>(
                        <div key={index} className="col-lg-3 col-md-4 col-sm-6 mt-4">
                            <h1>{pokemon.name}</h1>
                            <img src={pokemon.sprites.front_default} alt={`${pokemon.name} sprite`} />
                            <p>ID: {pokemon.id}</p>
                            <div>Type:</div>
                            <ul>
                                {pokemon.types.map((type, index) => (
                                    <li key={index}>{type.type.name}</li>
                                ))}
                            </ul>
                            <button id={pokemon.id} onClick={deleteFromPokedex}>Supprimer du pokedex</button>
                        </div>
                ))}
            </div>
        </div>
    )
}