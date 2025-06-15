import "./join.scss";
import curling from "../../images/curlingcartoon.jpg";
const Join = () => {
  return (
    <section className="section introSection" id="intro">
      <div className="intro">
        <div className="left">
          <div className="leftcontent">
            <div>
              <h3>Ajouter un club</h3>
              <p>Ajoutez facilement les informations de votre club par ville</p>
            </div>
            <div>
              <h3>Trouver des clubs</h3>
              <p>Recherchez et localisez rapidement les clubs par ville</p>
            </div>
            <div>
              <h3>Rejoignez nous</h3>
              <p>Ne manquez pas le monde passionnant du curling</p>
            </div>
          </div>
        </div>
        <div className="right">
          <img src={curling} alt="curling" className="astro" />
        </div>
      </div>
    </section>
  );
};

export default Join;
