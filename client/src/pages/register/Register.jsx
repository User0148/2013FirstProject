import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import { useState } from "react";
import axios from "axios";
import logo from "../../images/logo.png";

function Register() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!inputs.email || !inputs.username || !inputs.password) {
      setErr("Veuillez remplir tous les champs.");
      return;
    }

    // Username length validation
    if (inputs.username.length > 20) {
      setErr("Le pseudo ne peut pas dépasser 20 caractères.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputs.email)) {
      setErr("Veuillez saisir une adresse email valide.");
      return;
    }

    try {
      await axios.post("http://localhost:8800/api/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="register">
      <Link to="/">
      <img src={logo} alt="logo du site" />
      </Link>
      <div className="card">
        <div className="top">
          <h2>Créer un compte</h2>
          {err && <p className="error">{err}</p>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" onChange={handleChange} required />
            <label htmlFor="username">Pseudo</label>
            <input type="text" name="username" id="username" onChange={handleChange} maxLength={10} required />
            <label htmlFor="password">Mot de passe</label>
            <input type="password" name="password" id="password" onChange={handleChange} required />
            <button className="button" type="submit">
              S'enregistrer
            </button>
          </form>
        </div>
        <div className="bottom">
          <span>Déjà membre ?</span>
          <Link to="/login">
            <button className="button">Connexion</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
