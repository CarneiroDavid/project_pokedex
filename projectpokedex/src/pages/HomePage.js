import React, { useState, useEffect } from 'react';
import axios from 'axios';
import file from '../assets/data/data.json';
import PokemonCard from '../components/pokemon/PokemonCard';

function HomePage() {
    const [originalData, setOriginalData] = useState([]);
    const [pokemonCards, setPokemonCards] = useState([]);

    useEffect(() => {
        fetchData(file.pokemon_list);
    }, []);

    const fetchData = async (url) => {
        const response = await axios.get(url);
        setOriginalData(response.data.results);
        console.log(response.data.results)
    };

    useEffect(() => {
        const cards = originalData.map((pokemon) => (
            <PokemonCard 
                name={pokemon.name}
                id={pokemon.url}
            />
        ));
        setPokemonCards(cards);
    }, [originalData]);

    return (
        <div className='row home-row'>
            {/* {pokemonCards} */}
        </div>
    );
}

export default HomePage;
