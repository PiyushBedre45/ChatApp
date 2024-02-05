import bcrypt from 'bcrypt';
import { User } from "../models/userModel.js";

// USER REGISTRATION 

export const userRegister = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const checkUser = await User.findOne({ name })
        if (checkUser) return res.json({
            status: false,
            message: "Username allready exist"
        })
        const checkEmail = await User.findOne({ email })
        if (checkEmail) return res.json({
            status: false,
            message: "Email allready exist"
        })

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name, email, password: hashedPassword
        })
        delete user.password;
        res.json({
            status: true,
            message: "User Register Successfully",
            user,
        })
    } catch (ex) {
        next(ex);
    }
}

// USER LOGIN

export const userLogin = async (req, res, next) => {
    try {
        const { name, password } = req.body;
        let user = await User.findOne({ name }).select("+password") /// Important
        if (!user) return res.json({
            status: false,
            message: "Incorrect username or password"
        })
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) return res.json({
            message: 'Incorrect username or password',
            status: false
        })
        delete user.password;
        return res.json({
            status: true,
            user,
        })
    } catch (ex) {
        next(ex);
    }
}

// Set Avatar

export const setAvatar = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatarImage,
        })
        return res.json({
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage
        })
    } catch (ex) {
        next(ex)
    }
}

//  Get Users

export const getUser = async (req, res, next) => {
    try {
        const user = await User.find({ _id: { $ne: req.params.id } }).select([
            "email",
            "name",
            "avatarImage",
            "_id"
        ])

        // if (!user) {
        //     res.json({
        //         success: false,
        //         message: "User not found",
        //     })
        // }
        res.json({
            success: true,
            message: "Get all users",
            user,
        })
    } catch (ex) {
        next(ex);

    }
}


