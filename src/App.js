// Importation de React et de ses hooks nécessaires.
import React from "react";
import { useState, useEffect } from "react";

// Importation du composant MovieCard et des ressources CSS et SVG.
import MovieCard from './MovieCard';
import './App.css';
import SearchIcon from './search.svg';

// Constante contenant l'URL de base de l'API avec la clé API.
const API_URL = 'http://www.omdbapi.com?apikey=5f2ec130';

// Déclaration du composant App.
const App = () => {
    // Déclaration des états pour stocker les films et le terme de recherche.
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Fonction asynchrone pour rechercher des films basée sur un titre.
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`) // Requête à l'API avec le titre spécifié.
        const data = await response.json(); // Conversion de la réponse en JSON.

        setMovies(data.Search); // Mise à jour de l'état 'movies' avec les films trouvés.
    }

    // Utilisation de useEffect pour déclencher une recherche initiale au chargement du composant.
    useEffect(() => {
        searchMovies('') // Recherche initiale avec 'Spiderman' comme terme.
    }, []); // Le tableau vide signifie que cet effet ne s'exécutera qu'une seule fois, au montage du composant.

    // Le rendu du composant, incluant un champ de recherche et la liste des films.
    return (
        <div className="app">
            <h1>Netflux</h1> {/* Titre de l'application. */}

            <div className="search">
                <input
                    placeholder="Search for movies" // Champ de texte pour la saisie du terme de recherche.
                    value={searchTerm} // La valeur est liée à l'état 'searchTerm'.
                    onChange={(e) => setSearchTerm(e.target.value)} // Mise à jour de 'searchTerm' à chaque changement.
                />

                <img
                    src={SearchIcon} // Icône de recherche.
                    alt="search icon"
                    onClick={() => searchMovies(searchTerm)} // Déclenche la recherche des films à l'entrée du terme de recherche.
                />
            </div>

            {
                movies?.length > 0
                ? (
                <div className="container">
                    {movies.map((movie) => ( // Mapping de chaque film trouvé vers un composant MovieCard.
                        <MovieCard movie={movie}/>
                    ))}
                </div>
                ) : (
                    <div className="empty"> {/* Affichage d'un message si aucun film n'est trouvé. */}
                        <h2>No movies found</h2>
                    </div>
                )
            }
            
        </div>
    );
}

export default App; // Exportation du composant App pour utilisation dans d'autres parties de l'application.
