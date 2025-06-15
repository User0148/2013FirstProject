import React from 'react';
import { useQuery } from 'react-query';
import { makeRequest } from '../../axios';
import { useNavigate } from 'react-router-dom';
import back from "../../images/curling.jpg"
import "./posts.scss";

const Posts = () => {
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery("posts", () =>
    makeRequest.get("/posts").then(res => res.data)
  );

  const handleClick = (postId) => {
    navigate(`/club/${postId}`);
  };

  if (isLoading) {
    return <p>Recherche des derniers ajouts...</p>; // show loading msg
  }

  if (error) {
    return <p>Une erreur s'est produite lors de la récupération des données.</p>; // show error msg
  }

  return (
    <section className='posts'>
      <div className='postinfo'>
      <h2>Derniers clubs ajoutés</h2>
      <div className='card'>
      {data.map((post) => (
        <article className='postcontent' post={post} key={post.id} onClick={() => handleClick(post.id)}>
          <img className="inconeclub" src={back} alt="icone par défaut des clubs" />
          <div className='clubinfo'>
            <h2>{post.name}</h2>
            <p>{post.city}</p>
          </div>
        </article>
      ))}
      </div>
      </div>
      
      
      
    </section>
  );
};

export default Posts;
