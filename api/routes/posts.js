import  express  from "express";
import { addPost, deletePost, getPostById, getPosts, getPostsByCity, getUserPosts, updatePost, Event,getEventByCity} from "../controllers/posts.js";

const router = express.Router();

router.get("/",getPosts);
router.post("/",addPost);
router.get("/user/:userId",getUserPosts);
router.get("/city/:city",getPostsByCity);
router.get("/:id", getPostById);
router.delete("/:id",deletePost);
router.put("/:id",updatePost);
router.post("/event",Event);
router.get("/event/:city",getEventByCity);




export default router;