import React, { useState, useEffect } from 'react';
import axios from 'axios';
import file from '../assets/data/data.json';
import PokemonCard from '../components/pokemon/PokemonCard';

function HomePage() {
    const [originalData, setOriginalData] = useState([]);
    const [displayedData, setDisplayedData] = useState([]);
    const [numberOfPokemonDisplayed, setNumberOfPokemonDisplayed] = useState(151);

    useEffect(() => {
        const fetchData = async (url) => {
            const response = await axios.get(url);
            setOriginalData(response.data.results);
            setDisplayedData(response.data.results.slice(0, numberOfPokemonDisplayed));
        };
        fetchData(file.pokemon_list);
    }, [numberOfPokemonDisplayed]);

    const loadMorePokemon = () => {
        setNumberOfPokemonDisplayed(prevCount => prevCount + 50);
    };

    return (
        <div className='row home-row'>
            <h1 className="text-center">Liste Pokémon</h1>
            {displayedData.map((pokemon, index) => (
                <div key={index} className="col-lg-3 col-md-4 col-sm-6 mt-4">
                    <PokemonCard
                        name={pokemon.name}
                        id={pokemon.url}
                    />
                </div>
            ))}
            {originalData.length > numberOfPokemonDisplayed && (
                <button onClick={loadMorePokemon}>Charger plus de Pokémon</button>
            )}
        </div>
    );
}

export default HomePage;
