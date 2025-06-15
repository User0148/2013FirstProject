import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import logo from "../../images/logo.png";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validation
    const validationErrors = {};
    if (!inputs.email) {
      validationErrors.email = "Email is required";
    }
    if (!inputs.password) {
      validationErrors.password = "Password is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear any previous validation errors
    setErrors({});

    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setErrors({ login: "email ou mot de passe incorrect" }); // Set a generic error message
    }
  };

  return (
    <div className="login">
      <Link to="/">
      <img src={logo} alt="logo du site" />
      </Link>
      <div className="card">
        <div className="top">
          <h2>Se connecter</h2>
          <form onSubmit={handleSubmit}>
            {errors.login && <div className="error">{errors.login}</div>}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={inputs.email}
                onChange={handleChange}
                required
              />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                name="password"
                id="password"
                value={inputs.password}
                onChange={handleChange}
                required
              />
              {errors.password && (
                <div className="error">{errors.password}</div>
              )}
            </div>
            <button className="button" type="submit">Connexion</button>
          </form>
        </div>
        <div className="bottom">
          <span>Vous n'avez pas de compte ?</span>
          <Link to="/register">
            <button className="button">Créer un compte</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
