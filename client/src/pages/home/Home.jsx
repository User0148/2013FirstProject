import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";
import "./home.scss";
import Posts from "../../components/posts/Posts";
import Partners from "../../components/partners/Partners";
import Test from "../../components/test/test";
import Join from "../../components/Join/Join";

function Home() {
  return (
    <div className="home">
      <Test />
        <section className="who">
          <article className="intro-article container">
          <h2>
            <Typewriter
              options={{
                strings: "Qui sommes nous ?",
                autoStart: true,
                loop: true,
                deleteSpeed: 50,
              }}
            />
          </h2>
            <div className="content-intro">
              <p>
                Nous sommes un site collaboratif et d'entraide qui vise à
                promouvoir les clubs de curling français afin d'améliorer
                l'accessibilité à ce sport pour tous. Chaque personne faisant
                partie d'un club peut créer un compte sur notre plateforme et
                promouvoir son club sur notre site. Ainsi, lorsqu'un utilisateur
                effectue une recherche par ville, s'il trouve votre club, il
                pourra accéder aux informations que vous avez choisies de
                partager, telles que les contacts et l'effectif.
              </p>
            </div>
          </article>
        </section>
        <Join />
        <Posts />
        <Partners />
      </div>
  );
}

export default Home;
