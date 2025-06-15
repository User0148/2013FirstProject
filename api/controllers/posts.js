import moment from "moment/moment.js";
import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();
// Access environment variables
const secretkey = process.env.SECRET_KEY;


export const addPost = (req, res) => {
    const token = req.cookies.accessToken;
    // not logged in
    if (!token) return res.status(401).json("not logged in");
  
    jwt.verify(token, secretkey, (err, userInfo) => {
      //token is not valid
      if (err) return res.status(403).json("token is not valid");
  
      const q =
        "INSERT INTO posts(`name`, `city`,`description`,`effectif`,`phone`,`email`,`createdAt`,`uid`) VALUES (?)";
      const values = [
        req.body.name,
        req.body.city,
        req.body.description,
        req.body.effectif,
        req.body.phone,
        req.body.email,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        userInfo.id,
      ];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Post has been created.");
      });
    });
  };

export const getPosts = (req, res) => {
    /* ORDER BY createdAt */
    const q = `SELECT * FROM posts ORDER BY createdAt DESC LIMIT 4`;


    db.query(q, (err,data) => {
        if(err) return res.status(500).json(err);

    return res.status(200).json(data);
    })
}

export const getUserPosts = (req, res) => {
  const userId = req.params.userId; 

  const q = "SELECT * FROM posts WHERE uid = ? ORDER BY createdAt DESC";
  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};


export const getPostById = (req, res) => {
  const postId = parseInt(req.params.id); 

  const q = "SELECT * FROM posts WHERE id = ?";
  db.query(q, [postId], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length === 0) {
      return res.status(404).json("Post not found!");
    }

    const postData = data[0];
    return res.status(200).json(postData);
  });
  
};



export const getPostsByCity = (req, res) => {
  const city = req.params.city; // Get the city from the URL parameter

  // Make a database query to fetch posts with the specified city
  const q = "SELECT * FROM posts WHERE city = ?";
  db.query(q, [city], (err, data) => {
    if (err) return res.status(500).json(err);

    // If no posts are found for the specified city, return "aucun résultat"
    if (data.length === 0) {
      console.log("aucun résultat");
      return res.status(404).json("aucun résultat");
    }

    // Return the list of posts that match the specified city
    return res.status(200).json(data);
  });
};




export const deletePost = (req, res) => {
  const token = req.cookies.accessToken;
  //not logged in
  if (!token) return res.status(401).json("not logged in");

  jwt.verify(token, secretkey, (err, userInfo) => {
    //token not valid
    if (err) return res.status(403).json("tokker not valid");

    const qSelect = "SELECT * FROM posts WHERE `id`=?";
    db.query(qSelect, [req.params.id], (err, result) => {
      if (err) return res.status(500).json(err);
      
      if (result.length === 0) {
        return res.status(404).json("Post not found");
      }

      // Check if the user is an admin or the owner of the post
      if (userInfo.admin === 1 || userInfo.id === result[0].uid) {
        const qDelete = "DELETE FROM posts WHERE `id`=?";

        db.query(qDelete, [req.params.id], (err, data) => {
          if (err) return res.status(500).json(err);
          if (data.affectedRows > 0) return res.status(200).json("Post has been deleted.");
          return res.status(500).json("Failed to delete post");
        });
      } else {
        //not an admin or not the owner of the post
        return res.status(403).json("Not authorized");
      }
    });
  });
};



export const updatePost = (req, res) => {
  const token = req.cookies.accessToken;
  //not logged in
  if (!token) return res.status(401).json("not logged in");
  
  jwt.verify(token, secretkey, (err, userInfo) => {
    //token not valid
    if (err) return res.status(403).json("not valid");

    const q = "UPDATE posts SET `name`=?, `description`=?, `effectif`=?, `phone`=?, `email`=? WHERE `id`=? AND `uid` =?";
    
    db.query(q, [req.body.name, req.body.description, req.body.effectif, req.body.phone, req.body.email, req.params.id,userInfo.id], (err, data) => {
      if(err) return res.status(500).json(err);
      if(data.affectedRows>0) return res.status(200).json("Post has been updated.");
      return res.status(403).json("You can update only your post")})});
};



export const Event = (req, res) => {
  const token = req.cookies.accessToken;
  // not logged in
  if (!token) return res.status(401).json("not logged in");

  jwt.verify(token, secretkey, (err, userInfo) => {
    //token is not valid
    if (err) return res.status(403).json("token is not valid");

    const q =
      "INSERT INTO events (`name`,`description`,`pid`,`uid`) VALUES (?)";
    const values = [
      req.body.name,
      req.body.description,
      req.body.postId,
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been created.");
    });
  });
}



export const getEventByCity = (req, res) => {
  const city = req.params.city; // Get the city from the URL parameter

  // Make a database query to fetch posts with the specified city
  const q = "SELECT e.name, e.description FROM events as e left JOIN posts ON e.pid = posts.id WHERE posts.city = ? ";
  db.query(q, [city], (err, data) => {
    if (err) return res.status(500).json(err);

    // If no posts are found for the specified city, return "aucun résultat"
    if (data.length === 0) {
      console.log("aucun résultat");
      return res.status(404).json("aucun résultat");
    }

    // Return the list of posts that match the specified city
    return res.status(200).json(data);
  });
}