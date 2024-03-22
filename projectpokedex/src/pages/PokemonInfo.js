import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PokemonInfo() {
    const [pokemonInfo, setPokemonInfo] = useState(null);
    const [showSuccessNotification, setShowSuccessNotification] = useState(false); // Nouvel état pour la notification de succès
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

        localStorage.setItem('pokedex',JSON.stringify(pokedex));

        setShowSuccessNotification(true);
    }

    if (!pokemonInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container text-center mt-4">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card mx-auto w-75">
                        <div className='card-body'>
                            <div>
                                <span> N° {pokemonInfo.id}</span>
                                <h1>{pokemonInfo.name}</h1>
                            </div>
                            <img className='w-75' src={pokemonInfo.sprites.front_default} alt={`${pokemonInfo.name} sprite`} />
                            {pokemonInfo.types.map((type, index) => (
                                <p key={index}>{type.type.name}</p>
                            ))}
                            <button className='btn btn-success' id={pokemonInfo.id} onClick={pokedexManager}>Ajouter au pokedex</button>
                            {showSuccessNotification && ( 
                                <div className="alert alert-success mt-3" role="alert">
                                    Pokémon ajouté au Pokédex avec succès!
                                </div>
                            )}
                        </div>  
                    </div>
                </div>
            </div>
        </div>
    
    );
}

export default PokemonInfo;
