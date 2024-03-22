import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from '../components/pokemon/PokemonCard';

export default function Pokedex(){

    const [pokedex, setPokedex] = useState([]);
    const [pokelist,setPokeList] = useState([]);
    const [recherche, setRecherche] = useState('');
    const deleteFromPokedex = (target)=>{
        var newPokedex = pokedex
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

        if(isWritableKey || event.key === "Backspace"){
            var name = event.target.value;
            setRecherche(name);
        }
    };
    useEffect(() => {
        const fetchPokedex = async () => {
            var localPokedex = localStorage.getItem('pokedex')
            var local;
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
            <input className='form-control' type='text' onKeyUp={doSearch}/>
            <br/>
            <button className='btn btn-danger' onClick={clearPokedex} >Vider le Pokedex</button>
            <div className='row justify-content-center'>
                { pokedex.filter(poke => poke.name.toLowerCase().includes(recherche.toLowerCase())  || recherche.length === 0).map((pokemon,index)=>(
                        <div key={index} className="col-lg-3 col-md-4 col-sm-6 mt-4">
                            <div className="card text-center">
                                <div className='card-body'>

                                    <h1>{pokemon.name}</h1>
                                    <img src={pokemon.sprites.front_default} alt={`${pokemon.name} sprite`} />
                                    <p>N° {pokemon.id}</p>
                                    {pokemon.types.map((type, index) => (
                                        <p key={index}>{type.type.name}</p>
                                    ))}
                                    <button className='btn btn-danger' id={pokemon.id} onClick={deleteFromPokedex}>Supprimer du pokedex</button>
                                </div>
                            </div>
                        </div>
                ))}
            </div>
        </div>
    )
}