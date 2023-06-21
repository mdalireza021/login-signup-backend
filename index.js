import express, { json, urlencoded } from "express";
import cors from "cors";
import db from './config/db.config.js';
import cookieSession from "cookie-session";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express();
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(
    cookieSession({
        name: "new-session",
        keys: [process.env.COOKIE_SECRET],
        httpOnly: true
    })
);

app.use('/demo460/api/auth', authRouter);
app.use('/demo460/api', userRouter);

// set port, listen for requests
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
