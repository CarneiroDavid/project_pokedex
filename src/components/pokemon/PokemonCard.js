import React from 'react';
import axios from 'axios';
const PokemonCard = ({ name, id }) => {
    const pokemonId = id.split('/').slice(-2, -1)[0];
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
    const pokemonUrl = `/pokemon/${pokemonId}`;

    const pokedexManager = async (evt) => {
        
        var pokedex = localStorage.getItem('pokedex');
        var id = evt.target.id;
        if(pokedex)
            pokedex = JSON.parse(pokedex);
        else
            pokedex = []
        try{
            if(pokedex.filter((a)=> a.id === id).length === 0){
                const pokemonInfo = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
                console.log(pokemonInfo);
                pokedex.push({
                    'name':pokemonInfo.data.name,
                    'id': pokemonInfo.data.id,
                    'sprites': { 'front_default': pokemonInfo.data.sprites.front_default},
                    'types': pokemonInfo.data.types,
                });
                console.log(pokedex);

                localStorage.setItem('pokedex',JSON.stringify(pokedex));
            }
        }catch(error){
            console.error('Erreur de récupération:', error);
        }


    }
    return (
        <div className="card total-card">
            <a href={pokemonUrl} className='lien-pokemon'>
                <img src={imageUrl} className="card-img-top" alt={`${name} sprite`} />
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p>ID: {pokemonId}</p>
                </div>
            </a>
            <button id={pokemonId} onClick={pokedexManager}>Ajouter au pokedex</button>
        </div>
    );
};

export default PokemonCard;