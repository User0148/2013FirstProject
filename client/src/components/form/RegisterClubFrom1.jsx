import React, { useState } from "react";
import { autocompleteCity } from "../../services/Api";

function RegisterClubFrom1() {
  const [clubName, setClubName] = useState("");
  const [city, setCity] = useState("");
  const [bio, setBio] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "clubName":
        setClubName(value);
        break;
      case "city":
        setCity(value);
        if (value.trim() !== "") {
          autocompleteCity(value)
            .then((response) => {
              const suggestions = response.data.features.map(
                (feature) => feature.properties.label
              );
              setSuggestions(suggestions);
            })
            .catch((error) => {
              console.error(
                "Erreur lors de la récupération des suggestions :",
                error
              );
            });
        } else {
          setSuggestions([]);
        }

        setSelectedSuggestion(null); // Réinitialiser la suggestion sélectionnée lorsqu'une nouvelle recherche est effectuée
        break;

      case "bio":
        setBio(value);
        break;

      default:
        break;
    }
  };


  const handleSuggestionClick = (suggestion) =>{
    setCity(suggestion);
    setSuggestions([]);
    setSelectedSuggestion(suggestion);

  }


  return (
    <>
      <label htmlFor="clubName">Le nom de votre club</label>
      <input
        type="text"
        name="clubName"
        id="clubName"
        value={clubName}
        onChange={handleInputChange}
      />
      <label htmlFor="city">Ville de votre club</label>
      <input
        type="text"
        name="city"
        id="city"
        value={city}
        onChange={handleInputChange}
      />
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      <label htmlFor="bio">Petite présentation de votre club</label>
      <input
        type="text"
        name="bio"
        id="bio"
        value={bio}
        onChange={handleInputChange}
      />
    </>
  );
}

export default RegisterClubFrom1;
