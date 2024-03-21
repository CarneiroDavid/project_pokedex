import React from 'react';

const PokemonCard = ({ name, id }) => {
    const pokemonId = id.split('/').slice(-2, -1)[0];
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
    const pokemonUrl = `/pokemon/${pokemonId}`;

    return (
        <div className="card">
            <a href={pokemonUrl}>
                <img src={imageUrl} className="card-img-top" alt={`${name} sprite`} />
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p>ID: {pokemonId}</p>
                </div>
            </a>
        </div>
    );
};

export default PokemonCard;