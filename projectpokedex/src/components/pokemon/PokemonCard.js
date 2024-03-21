import { Link } from 'react-router-dom'

const PokemonCard = ({ name, id }) => {
    return (
        <div>
            <p> {name} </p>
        <p> {id} </p>
        </div>
        
    )
}

export default PokemonCard
