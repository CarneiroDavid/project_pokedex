import React, { useState, useEffect } from 'react';
import axios from 'axios';
import file from '../assets/data/data.json';
import PokemonCard from '../components/pokemon/PokemonCard';

function HomePage() {
    const [originalData, setOriginalData] = useState([]);
    const [displayedData, setDisplayedData] = useState([]);
    const [nbPokemonAfficher, setNbPokemon] = useState(151);
    const [recherche, recherchePokemon] = useState('');

    // Récupération des pokémons
    useEffect(() => {
        const fetchData = async (url) => {
            const response = await axios.get(url);
            setOriginalData(response.data.results);
            console.log(response.data.results);
            setDisplayedData(response.data.results.slice(0, nbPokemonAfficher));
        };
        fetchData(file.pokemon_list);
    }, [nbPokemonAfficher]);

    // Filtrage des pokémon en fonction du terme de recherche
    useEffect(() => {
        const filtrePokemon = originalData.filter(pokemon =>
            pokemon.name.toLowerCase().includes(recherche.toLowerCase())
        );
        setDisplayedData(filtrePokemon.slice(0, nbPokemonAfficher));
    }, [recherche, nbPokemonAfficher, originalData]);

    // Chargement de plus de pokémon sur la page    
    const rechargePokemon = () => {
        setNbPokemon(prevCount => prevCount + 50);
    };

    return (
        <div className='row home-row'>
            <h1 className="text-center">Liste Pokémon</h1>
            <input
                type="text"
                className='form-control'
                placeholder="Rechercher un Pokémon"
                value={recherche}
                onChange={(e) => recherchePokemon(e.target.value)}
            />
            {displayedData.map((pokemon, index) => (
                <div key={index} className="col-lg-3 col-md-4 col-sm-6 mt-4 ">
                    <PokemonCard
                        name={pokemon.name}
                        id={pokemon.url}
                    />
                </div>
            ))}
            {originalData.length > nbPokemonAfficher && (
                <button onClick={rechargePokemon}>Charger plus de Pokémon</button>
            )}
        </div>
    );
}

export default HomePage;
