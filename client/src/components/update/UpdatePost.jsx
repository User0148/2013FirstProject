import { useContext, useState } from "react";
import "./update.scss";
import { useMutation, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import { validateInputs } from "../../utils/inputValidationUpdate";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const UpdatePost = ({ setOpenUpdate, postData }) => {
    const { logout } = useContext(AuthContext);

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        name: postData.name,
        description: postData.description,
        effectif: postData.effectif,
        email: postData.email,
        phone: postData.phone,
    });

    const [err, setErr] = useState({});


    const mutation = useMutation(
        (post) => {
            return makeRequest.put(`/posts/${postData.id}`, post);
        },
        
        {
            
            onSuccess:() =>{
                // Invalidate and refetch the userPosts query in the cache
                queryClient.invalidateQueries("userPosts");
            },
            onError: (error) => {
                if ( error.response.status === 401 || error.response.status === 403) {
                    // token expired / not logged in / not authorized
                    logout();
                    navigate("/login");
                    
                }
                },
        }
    );


    const handleChange = (e) => {
        e.preventDefault();
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };

    const handleSubmit = async (e) => {
        e.preventDefault();

    const validationErrors = validateInputs(inputs);

        if (Object.keys(validationErrors).length > 0) {
            setErr(validationErrors);
            return;
        }
            await mutation.mutateAsync(inputs);
            
        setOpenUpdate(false);
    };


  return (
    <div className="update">
        <div className="updatetop">
            <h2>Modification</h2>
            <button className="closebtn" onClick={() => setOpenUpdate(false)}>X</button>
        </div>
        <form onSubmit={handleSubmit} className="formcard">
            {/* error message  */}
                {err.name && <div className="error">{err.name}</div>}
                {err.email && <div className="error">{err.email}</div>}
                {err.effectif && <div className="error">{err.effectif}</div>}
                {err.phone && <div className="error">{err.phone}</div>}
        <label htmlFor="name">Nom du club</label>
            <input type="text" id="name" name="name" value={inputs.name} onChange={handleChange}/>
            <label htmlFor="description">Description</label>
            <textarea type="text" id="description" name="description" cols="30" rows="10" value={inputs.description} onChange={handleChange}/>
            <label htmlFor="effectif">Nombre de membre</label>
            <input type="number" name="effectif" id="effectif" value={inputs.effectif} onChange={handleChange}/>
            <label htmlFor="email" >Email</label>
            <input type="email" name="email" id="email" value={inputs.email} onChange={handleChange} />
            <label htmlFor="phone">Téléphone</label>
            <input type="text" name="phone" id="phone" value={inputs.phone} onChange={handleChange}/>
            <button className="validatebtn" type="submit" >Valider</button>
        </form>
    </div>
  )
}

export default UpdatePost