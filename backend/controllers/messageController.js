import Message from "../models/messageModel.js";

export const addMessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;
        const data = await Message.create({
            message: { text: message },
            users: [from, to],
            sender: from,
        })

        if (data) return res.json({
            msg: "message added successfully"
        })
        return res.json({
            msg: "message not added into the database"
        })
    } catch (ex) {
        next(ex)

    }
}
export const getMessage = (req, res, next) => {
    res.json({
        success: true,
        msg: "we get the message"
    })

}