import { NavLink } from 'react-router-dom'

function Navigation() {
    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
                <div className='navbar-nav'>
                    <NavLink className='nav-item nav-link' to='/'>
                        Accueil
                    </NavLink>
                    <NavLink className='nav-item nav-link' to='/pokedex'>
                        Pokedex
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Navigation
