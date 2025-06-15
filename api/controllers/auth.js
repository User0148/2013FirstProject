import { db } from "../connect.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();
// Access environment variables
const secretkey = process.env.SECRET_KEY;


export const register = (req, res) => {
    //CHECK USER IF EXISTS
    const q = "SELECT * FROM users WHERE email = ?";
  
    db.query(q, [req.body.email], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(409).json("Votre mail est déjà associé à un compte!");
      //CREATE A NEW USER
      //Hash the password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  
      const q =
        "INSERT INTO users (`username`,`email`,`password`) VALUE (?)";
  
      const values = [
        req.body.username,
        req.body.email,
        hashedPassword,
      ];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Utilisateur crée.");
      });
    });
  };

  export const login = (req, res) => {
    const q = "SELECT * FROM users WHERE email = ?";
    
  
    db.query(q, [req.body.email], (err, data) => {
      if (err) return res.status(500).json(err);
  
      // Check if a user with the provided email exists
      if (data.length === 0) {
        return res.status(400).json("Mot de passe ou identifiant incorrect");
      }
  
      const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);
  
      if (!checkPassword) {
        return res.status(400).json("Mot de passe ou identifiant incorrect");
      }
  
      const token = jwt.sign({ id: data[0].id, admin: data[0].admin }, secretkey);
  
      const { password, ...others } = data[0];
  
      // Set the expiration time for the cookie
      const expiresIn = 3600 // 1h in seconds
      const expirationDate = new Date(Date.now() + expiresIn * 1000); // convertir en millisecondes
      res.cookie("accessToken", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        expires: expirationDate, // Set the expiration date
      }).status(200).json(others);
    });
};
  


export const logout = (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  }).status(200).json('Utilisateur déconnecté');
};

  export const me = (req, res) => {
    const token = req.cookies.accessToken;
    //not login
    if (!token) return res.status(401);

    jwt.verify(token, secretkey, (err, userInfo) => {
      //token is not valid
      if (err) return res.status(403);

      // Fetch the user data from the database using the user ID in the token
      const q = "SELECT * FROM users WHERE id = ?";
      db.query(q, [userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);

        if (!data.length) return res.status(404).json("User not found!");

        // Remove the password from the user data before sending it in the response
        const { password, ...userData } = data[0];
        return res.status(200).json(userData);
      });
    });
  };


