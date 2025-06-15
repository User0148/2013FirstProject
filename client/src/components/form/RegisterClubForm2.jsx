import { useState } from "react";

function RegisterClubForm2() {

    const [effectif, setEffectif] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        switch(name){
            case "effectif":
                setEffectif(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "phone":
                setPhone(value);
                break;
            default:
                break;
            
        }

    }


  return (
    <>
      <label htmlFor="effectif">Quel est le nombre d'inscrit dans votre club ?</label>
      <input type="number" name="effecitf" id="effecitf" value={effectif} onChange={handleInputChange}/>
      <label htmlFor="email">Email de contact du club</label>
      <input type="email" name="email" id="email" value={email} onChange={handleInputChange} />
      <label htmlFor="phone">Téléphone du club</label>
      <input type="text" name="phone" id="phone" value={phone} onChange={handleInputChange}/>
    </>
  );
}

export default RegisterClubForm2;
