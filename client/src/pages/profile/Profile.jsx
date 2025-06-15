import { useQuery, useMutation, useQueryClient } from "react-query";
import { AuthContext } from "../../context/authContext";

import "./profile.scss";
import { useContext, useState } from "react";
import { makeRequest } from "../../axios";
import UpdatePost from "../../components/update/UpdatePost";
import Event from "../../components/event/Event";

function Profile() {
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  //RENDER USER POST
  const { isLoading, error, data } = useQuery(["userPosts", currentUser.id], async () => {
    try {
      const response = await makeRequest.get(`/posts/user/${currentUser.id}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch user posts.");
    }
  });

  //DELETE POST
  const deletePostMutation = useMutation(
    (postId) => makeRequest.delete(`/posts/${postId}`),
    {
      onSuccess: () => {
        // Invalidate the userPosts query in the cache
        queryClient.invalidateQueries("userPosts");
      },
      /* onError: () => {
        logout();
        navigate(`/`)
    } */
  }
  );

  const [openUpdate, setOpenUpdate] = useState(false);
  const [openEvent, setOpenEvent] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
//DELETE POST
  const handleDeletePost = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
        
        deletePostMutation.mutate(postId, {
          onError: (error) => {
            if (error.response.status === 401) {
              console.log("Unauthorized: User is not logged in.");
            }
            else {
              console.error("Error while deleting post:", error);
            }
          }
        });
      
    }
  };

  return (
    <div className="profile">
      <h2>Votre profil </h2>
      <span>{currentUser.username}</span>

      <p>
        Vous trouverez ici la liste des clubs que vous avez ajouté sur notre site.
        Vous pouvez ainsi modifier les informations si nécessaire.
      </p>
      <div className="club-list">
        {data.map((post) => (
          <div className="club-info" key={post.id}>
            <div className="top">
              <div className="top-left">
                <h3>{post.name}</h3>
              </div>
            </div>
            <div className="top-bottom">
              <p><strong>Description</strong> : {post.description}</p>
              <p><strong>Ville</strong> : {post.city}</p>
            </div>
            <div className="number">
              <p><strong>Effectif</strong> : {post.effectif}</p>
            </div>
            <div className="contact">
              <p><strong>Téléphone</strong> : {post.phone}</p>
              <p><strong>Email</strong> : {post.email}</p>
            </div>
            <div className="button">
                <button className="deletebtn" onClick={() => handleDeletePost(post.id)}>Supprimer</button>
                <button className="updatebtn" onClick={() => { setSelectedPostId(post.id); setOpenUpdate(true);}}>Modifier</button>
                <button className="updatebtn" onClick={() => { setSelectedPostId(post.id); setOpenEvent(true);}}>Evenement</button>
              </div>
          </div>
            
        ))}
      </div>
      {openUpdate && <UpdatePost
      setOpenUpdate={setOpenUpdate}
      selectedPostId={selectedPostId}
      postData={data.find(post => post.id === selectedPostId)}
    />}
    {openEvent && <Event
      setOpenEvent={setOpenEvent}
      selectedPostId={selectedPostId} 
      postData={data.find(post => post.id === selectedPostId)}
    />}
    </div>
  );
}

export default Profile;
