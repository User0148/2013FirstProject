import React, { useContext, useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./navbar.scss";
import { AuthContext } from "../../context/authContext";
import logo from "../../images/logo.png";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const closeMenu = () => {
    setOpen(false);
  };





  return (
    <nav className="navbar">
      <div className="nav-container">
      <Link to="/" className="nav-logo" onClick={() => setOpen(false)}>
        <img src={logo} alt="logo du site" />
      </Link>
      <div onClick={handleClick} className="nav-icon">
        {open ? <FiX /> : <FiMenu />}
      </div>
      <ul className={open ? "nav-links active" : "nav-links"}>
        <li className="nav-item">
          <Link to="/search" className="nav-link" onClick={closeMenu}>
            Rechercher
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register_club" className="nav-link" onClick={closeMenu}>
            Ajouter mon club
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/events" className="nav-link" onClick={closeMenu}>
            Evenements
          </Link>
        </li>
        {currentUser ? (
          <>
            <li className="nav-item">
              <Link
                to={`/profile/${currentUser.id}`}
                className="nav-link"
                onClick={closeMenu}
              >
                Profile
              </Link>
            </li>
			<li className="nav-item">
				<button className="decobtn"onClick={logout}>Déconnexion</button>
			</li>
          </>
        ) : (
          <li className="nav-item">
            <Link to="/login" className="nav-link" onClick={closeMenu}>
              Connexion/Inscription
            </Link>
          </li>
        )}
      </ul>
      </div>
      
    </nav>
  );
};

export default Navbar;
