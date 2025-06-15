import  express  from "express";
import { login, register, logout, me } from "../controllers/auth.js";

const router = express.Router()

router.post("/login",login)
router.post("/register",register)
router.post("/logout",logout)
router.get("/",me)


export default router;
