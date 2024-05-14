import User from "../models/userModel.js";

const isAuthenticated = (email, password, user) => {
    return (email === user.email && password === user.password)
}

export const authenticate = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (user) {
            const autherized = isAuthenticated(email, password, user);
            if (autherized) {
                res.status(200).send({ autherized, id: user._id })
            } else {
                res.send({ message: 'Invalid password' })
            };
        } else {
            res.send({ message: 'Invalid User' })
        }
    } catch (error) {
        res.status(500).json({ error })
    }
}