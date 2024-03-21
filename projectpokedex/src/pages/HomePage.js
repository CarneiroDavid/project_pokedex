import React, { useState, useEffect } from 'react';
import axios from 'axios';
import file from '../assets/data/data.json';
import PokemonCard from '../components/pokemon/PokemonCard';

function HomePage() {
    const [originalData, setOriginalData] = useState([]);
    const [pokemonCards, setPokemonCards] = useState([]);

    useEffect(() => {
        const fetchData = async (url) => {
            const response = await axios.get(url);
            setOriginalData(response.data.results);
            console.log(response.data.results)
        };
        fetchData(file.pokemon_list);
    }, []);


    return (
        <div className='row home-row'>
            {originalData.map((pokemon, index) => (<PokemonCard
                key = { index }
                name = {pokemon.name}
                id = {pokemon.url}
            />))}
        </div>
    );
}

export default HomePage;
