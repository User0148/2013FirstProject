import  express  from "express";
const app = express();
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config();
// Access environment variables
const local = process.env.LOCAL;



//middlewares
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Credentials",true)
    next()
})
app.use(express.json())
app.use(cors({
    origin:`${local}`,
    credentials: true,
}))
app.use(cookieParser())

app.use("/api/auth",authRoutes);
app.use("/api/posts",postRoutes);

app.listen(8800, () => {
    console.log('API Working')
});
