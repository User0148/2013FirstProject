import React, { useState, useEffect, useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { makeRequest } from '../../axios';
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import { HiOutlineUserGroup } from 'react-icons/hi';

import './club.scss';
import { AuthContext } from '../../context/authContext';

function Club() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const id = parseInt(useLocation().pathname.split("/")[2]);
  const [clubData, setClubData] = useState(null);
  const [showPhonePopup, setShowPhonePopup] = useState(false);

  const { isLoading, error, data } = useQuery(["post", id], () =>
    makeRequest.get(`/posts/${id}`).then((res) => {
      return res.data;
    })
  );

     //DELETE POST
     const deletePostMutation = useMutation(
      (postId) => makeRequest.delete(`/posts/${postId}`),
      {
        onSuccess: () => {
          // Invalidate posts query in the cache
          queryClient.invalidateQueries("posts");
        },
      }
    );

  useEffect(() => {
    if (!isLoading && !error) {
      setClubData(data);
    }
  }, [isLoading, error, data]);

  const openPhonePopup = () => {
    setShowPhonePopup(true);
  };

  const closePhonePopup = () => {
    setShowPhonePopup(false);
  };

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

 
    //DELETE POST
  const handleDeletePost = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePostMutation.mutate(postId);
      navigate("/");
    }
  };

  return (
    <section className='club'>
      {clubData && (
        <article>
          <div className='top'>
            <h2>{clubData.name}</h2>
            <p>{clubData.city}</p>
          </div>
          <div className='description'>
            <h3>Le club en quelques mots</h3>
            <p>{clubData.description}</p>
          </div>
          <div className='effectif'>
            <h3>Effectif du club</h3>
            <HiOutlineUserGroup/>
            <p>{clubData.effectif}</p>
          </div>
          <div className='contact'>
            <h3>Une question ?</h3>
            <p>Contactez le club pour en savoir plus.</p>
            <div className='icon'>
             <AiOutlineMail onClick={() => window.open(`mailto:${clubData.email}`)} style={{ cursor: 'pointer' }} />
             <AiOutlinePhone onClick={openPhonePopup} style={{ cursor: 'pointer' }} />
            </div>
            {currentUser && currentUser.admin === 1 && (<button className='deletebtn' onClick={() => handleDeletePost(clubData.id)}>Supprimer ce club</button>)}         
          </div>
        </article>
      )}

      {showPhonePopup && (
        <div className="popup">
          <p>Numéro de téléphone : {clubData.phone}</p>
          <button className="closebtn" onClick={closePhonePopup}>Fermer</button>
        </div>
      )}
    </section>
  );
}

export default Club;
