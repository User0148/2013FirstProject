import React, { useState, useEffect, useContext } from "react";
import { autocompleteCity } from "../../services/Api";
import { useMutation, useQueryClient } from "react-query";
import "./registerclub.scss";
import { makeRequest } from "../../axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { validateForm } from "../../utils/inputValidationRegister";

function RegisterClub() {
  const { logout } = useContext(AuthContext);
  const [stape, setStape] = useState(1);
  const [next, setNext] = useState("Suivant");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [effectif, setEffectif] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [err, setErr] = useState({});

  const message =
    "Cette étape n'est pas obligatoire, vous pouvez valider votre annonce si vous le souhaitez. Néanmoins, celle-ci permet de donner des informations intéressantes pour un futur membre.";

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "name":
        setName(value);
        break;
      case "city":
        setCity(value);

        if (value.trim() !== "" && value.trim().length >= 3) {
          autocompleteCity(value)
            .then((response) => {
              const suggestions = response.data.features.map((feature) => feature.properties.label);
              setSuggestions(suggestions);
            })
            .catch((error) => {
              console.error("Erreur lors de la récupération des suggestions :", error);
            });
        } else {
          setSuggestions([]);
        }

        break;
      case "description":
        setDescription(value);
        break;
      case "effectif":
        setEffectif(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "email":
        setEmail(value);
        break;
      default:
        break;
    }
  };

  const hideSuggestions = () => {
    setSuggestions([]);
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion);
    hideSuggestions();
  };

  useEffect(() => {
    const isFormValid = name.trim() !== "" && city.trim() !== "";
    setIsFormValid(isFormValid);
  }, [name, city]);

  const handleClick = (e) => {
    e.preventDefault();

    if (!isFormValid) {
      return;
    }

    switch (next) {
      case "Suivant":
        setNext("Précédent");
        setStape(2);
        break;
      case "Précédent":
        setNext("Suivant");
        setStape(1);
        break;
      default:
        break;
    }
  };

  const navigate = useNavigate();
  const QueryClient = useQueryClient();

  // Mutations
  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    {
      onSuccess: () => {
        // Iinvalidate and refetch
        QueryClient.invalidateQueries(["posts"]);
        navigate("/");
      },
      onError: (error) => {
        if ( error.response.status === 401 || error.response.status === 403) {
          // token expired / not logged in / not authorized
          logout();
          navigate("/login");
          }
          else{
            setErr(err.message="Une erreur est survenue veuillez réessayer plus tard"); 
          }
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = { name, city, description, effectif, phone, email };
    const errors = validateForm(formData);

    if (Object.keys(errors).length > 0) {
      setErr(errors);
      console.log("Erreurs de validation:", errors);
      return;
    }

    mutation.mutate(formData);
  };

  return (
    <section className="register-club">
      <div className="container">
        <h2>Enregistrer mon club</h2>
        
        <span>Etape {stape}/2</span>
          {/* error message  */}
          {err.name && <div className="error">{err.name}</div>}
          {err.description && <div className="error">{err.name}</div>}
          {err.email && <div className="error">{err.email}</div>}
          {err.effectif && <div className="error">{err.effectif}</div>}
          {err.phone && <div className="error">{err.phone}</div>}
          {err.message && <div className="error">{err.message}</div>}
          {stape === 2 && <span className="message">{message}</span>}
        
        <form onSubmit={handleSubmit}>
          {stape === 1 && (
            <>
              <label htmlFor="name">Nom du club</label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={handleInputChange}
                maxLength={25}
                required
              />

              <label htmlFor="city">Ville du club</label>
              <input
                type="text"
                name="city"
                id="city"
                value={city}
                onChange={handleInputChange}
                required
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

              <label htmlFor="description">Petite présentation de votre club</label>
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="10"
                value={description}
                onChange={handleInputChange}
                maxLength={200}
              ></textarea>
            </>
          )}

          {stape === 2 && (
            <>
              <label htmlFor="effectif">Combien de membres constitue votre club</label>
              <input
                type="number"
                id="effectif"
                name="effectif"
                value={effectif}
                onChange={handleInputChange}
              />
              <label htmlFor="phone">Numéro de téléphone du club</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={phone}
                onChange={handleInputChange}
              />

              <label htmlFor="email">Email du club</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleInputChange}
              />
            </>
          )}

          <div className="button">
            <button onClick={handleClick} disabled={!isFormValid}>
              {next}
            </button>
            {stape === 2 && (
              <>
                <button type="submit">Valider</button>
              </>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

export default RegisterClub;
