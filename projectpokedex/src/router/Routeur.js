import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../layout/layout'; // Assurez-vous d'importer Layout correctement

const Routeur = () => { // Supprimez le texte non utilisé du composant Routeur
    return (
        <Router>
            <div className='App'>
                <Layout>
                    <Routes>
                        <Route exact path='/' element={<HomePage />} />
                    </Routes>
                </Layout>
            </div>
        </Router>
    );
}

export default Routeur;
