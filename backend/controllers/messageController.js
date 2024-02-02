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
            msg: "message added successfully",
            message,
        })
        return res.json({
            msg: "message not added into the database"
        })
    } catch (ex) {
        next(ex)

    }
}


export const getMessage = async (req, res, next) => {
    const { from, to } = req.body;
    const messages = await Message.find({
        users: {
            $all: [from, to]
        }
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
        return {
            fromSelf: msg.sender.toString() === from,
            message: msg.message.text
        };
    });
    res.json({
        success: true,
        msg: "we get the message",
        messages,
        projectedMessages,
    });

}