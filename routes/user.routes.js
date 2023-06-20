import express from 'express';
import {verifyToken} from '../middlewares/verifyToken.js';
import { allAccess, userBoard } from "../controllers/user.controller.js";
const userRouter = express.Router();

userRouter.use(() => {
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
    );
    next();
})

// simple route
userRouter.get("/", (req, res) => {
    res.json({ message: "Welcome to new world!" });
});

userRouter.get("/all", allAccess);
userRouter.get("/user", verifyToken, userBoard);

export default userRouter;