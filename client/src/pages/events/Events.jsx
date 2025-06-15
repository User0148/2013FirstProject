import React from 'react'

import { useEffect, useState } from "react";
import { autocompleteCity } from "../../services/Api";

import "./events.scss";
import ResultEvent from '../../components/result/ResultEvent';

function Events() {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCity(value);

    if (value.trim() !== "" && value.trim().length >= 3) {
      autocompleteCity(value)
        .then((response) => {
          const suggestions = response.data.features.map(
            (feature) => feature.properties.label
          );
          setSuggestions(suggestions);
        })
        .catch((error) => {
          /* Gérer les erreurs ici si nécessaire */
        });
    } else {
      setSuggestions([]);
    }

    setSelectedSuggestion(null);
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion);
    setSuggestions([]);
    setSelectedSuggestion(suggestion);
    setShowError(false); // Réinitialiser l'état d'erreur
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSuggestion) {
      setShowResults(true);
    } else {
      setShowError(true); // Afficher un message d'erreur si aucune suggestion n'est sélectionnée
    }
  };

  // Reset showResults et showError lorsque le city state change
  useEffect(() => {
    setShowResults(false);
    setShowError(false);
  }, [city]);

  return (
    <div className="search">
      <h2>Rechercher</h2>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <label htmlFor="address">Rechercher des évènements par ville</label>
          <input
            type="text"
            placeholder="Renseigner une ville"
            name="address"
            id="address"
            value={city}
            onChange={handleInputChange}
            required
          />
          {suggestions.length > 0 && (
            <ul className="suggestions">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
          {showError && (
            <p className="error-message">
              Veuillez sélectionner une suggestion avant de rechercher.
            </p>
          )}
          <button type="submit">Rechercher</button>
        </form>
      </div>
      {showResults && <ResultEvent city={city} />}
    </div>
  );
}


export default Events