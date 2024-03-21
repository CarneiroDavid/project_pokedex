import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PokemonInfo() {
    const [pokemonInfo, setPokemonInfo] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchPokemonInfo = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                setPokemonInfo(response.data);
            } catch (error) {
                console.error('Erreur de récupération:', error);
            }
        };

        fetchPokemonInfo();
    }, [id]);
    const pokedexManager = (evt) => {
        var pokedex = localStorage.getItem('pokedex')
        if(pokedex)
            pokedex = JSON.parse(pokedex);
        else
            pokedex = []

        pokedex.push({
            'name':pokemonInfo.name,
            'id': pokemonInfo.id,
            'sprites': { 'front_default': pokemonInfo.sprites.front_default},
            'types': pokemonInfo.types,
        })
        console.log(pokedex);

        localStorage.setItem('pokedex',JSON.stringify(pokedex));

    }

    if (!pokemonInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{pokemonInfo.name}</h1>
            <img src={pokemonInfo.sprites.front_default} alt={`${pokemonInfo.name} sprite`} />
            <p>ID: {pokemonInfo.id}</p>
            <div>Type:</div>
            <ul>
                {pokemonInfo.types.map((type, index) => (
                    <li key={index}>{type.type.name}</li>
                ))}
            </ul>
            <button id={pokemonInfo.id} onClick={pokedexManager}>Ajouter au pokedex</button>
        </div>
    );
}

export default PokemonInfo;
