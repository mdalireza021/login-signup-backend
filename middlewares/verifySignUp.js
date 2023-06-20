import User from "../models/user.model.js";

export const verifySignUp = async (req, res, next) => {
    const { username, email } = req.body

    // check duplicate username
    try {
        const user = await User.findOne({ username }).exec();
        if (user) {
            return res.status(400).send({ message: "Failed! Username is already in use!" });
        }

        // check duplicate email
        const duplicateEmailUser = await User.findOne({ email }).exec();
        if (duplicateEmailUser) {
            return res.status(400).send({ message: "Failed! Email is already in use!" });
        }
        next();
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};
