import React from 'react'
import "./result.scss";
import { useQuery } from 'react-query';
import { makeRequest } from '../../axios';
import { useNavigate } from 'react-router-dom';
import IconeClub from "../../images/curling.jpg";

function Result({ city }) {

    const navigate = useNavigate();
    
    const { isLoading, error, data } = useQuery("city", () =>
      makeRequest
        .get(`/posts/city/${city}`)
        .then((res) => res.data)
        .catch((error) => {
          // Handle the error here without showing it in the console
          return { data: [] }; // Return an empty array to indicate no data
        })
    );
  
  
    if (isLoading) {
      return <p>Recherche des club pour : {city}</p>;
    }
  
    if (error) {
      return (
        <p>
          Malheureusement pour l'instant aucun club n'est enregistrer pour : {city}
        </p>
      );
    }

    const handleClick = (postId) => {
        navigate(`/club/${postId}`);
      };
  
    // Render the data only if there are results available
    return (
      <div className="result">
        {data.length > 0 ? (
          data.map((post) => (
            <div key={post.id} onClick={() => handleClick(post.id)} className='result-info'>
              <div className='info-left'>
                <img src={IconeClub} alt="image zone centrale curling" />
              </div>
              <div className='info-right'>
                <h2>{post.name}</h2>
                <p>{post.city}</p>
              </div>
              
            </div>
          ))
        ) : (
          <p>Malheuresement pour l'instant il n'y a aucun club d'enregistré pour la ville de {city}.</p>
        )}
      </div>
    );
  }
  
export default Result