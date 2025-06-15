import React, { useState } from "react";
import "./event.scss";
import { QueryClient, useMutation } from "react-query";
import { makeRequest } from "../../axios";

const Event = ({ setOpenEvent, postData }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const queryClient = new QueryClient(); // Create a new QueryClient

  const mutation = useMutation(
    (event) => {
      return makeRequest.post(`/posts/event`, event);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch the "event" query in the cache
        queryClient.invalidateQueries("event");
      },
      onError: (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          // Handle token expiration or unauthorized errors here
        }
      },
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === "" || description.trim() === "") {
      setErrorMessage("Le nom et la description sont obligatoires");
    } else {
      setErrorMessage("");
      
      // Send a mutation to update the event on the backend
      mutation.mutate({
        name,
        description,
        postId: postData.id,
      });
    }
  };

  return (
    <div className="event">
      <div className="eventtop">
        <h2>Modification</h2>
        <button className="closebtn" onClick={() => setOpenEvent(false)}>
          X
        </button>
      </div>
      <form onSubmit={handleSubmit} className="formcard">
        <label htmlFor="name">Nom de l'événement</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
          value={description}
          onChange={handleChange}
        />
        {errorMessage && (
          <p style={{ color: "red" }} className="error-message">
            {errorMessage}
          </p>
        )}
        <button className="validatebtn" type="submit">
          Valider
        </button>
      </form>
    </div>
  );
};

export default Event;
