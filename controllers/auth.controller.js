import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js'
const saltRounds = 10;

export const login = (req, res) => {

};
export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hash = bcrypt.hashSync(password, saltRounds);
        const user = new User({
            username,
            email,
            password: hash,
        });

        const savedUser = await user.save();
        return res.status(201).json({ message: 'Signup successfully!' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const signout = async (req, res) => {
    try {
        req.session = null;
        return res.status(200).send({ message: "You've been signed out!" });
    } catch (err) {
        this.next(err);
    }
};
