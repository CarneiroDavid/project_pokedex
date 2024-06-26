import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import PokemonInfo from '../pages/PokemonInfo'
import Layout from '../layout/layout'
import Pokedex from '../pages/Pokedex'

import '../styles/App.css'

const Routeur = ({ text }) => {
    return (
        <Router>
            <div className='App'>
                <Layout>
                    <Routes>
                        <Route exact path='/' element={<HomePage />} />
                        <Route path='pokemon/:id' element={<PokemonInfo />} />
                        <Route path='pokedex' element={<Pokedex />} />
                    </Routes>
                </Layout>
            </div>
        </Router>
    )
}

export default Routeur
