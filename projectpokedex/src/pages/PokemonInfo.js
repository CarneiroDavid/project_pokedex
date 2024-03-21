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
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching Pokemon info:', error);
            }
        };

        fetchPokemonInfo();
    }, [id]);

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
            <button>Ajouter au pokedex</button>
        </div>
    );
}

export default PokemonInfo;
