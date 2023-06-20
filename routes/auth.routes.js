import express from "express";
import {verifySignUp} from '../middlewares/verifySignUp.js';
import { login, signup, signout } from '../controllers/auth.controller.js';
const authRouter = express.Router();

authRouter.use((req,res,next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
    );
    next();
})

authRouter.post("/auth/login", login);
authRouter.post("/auth/signup", verifySignUp, signup);
authRouter.post("/auth/signout", signout);

export default authRouter;