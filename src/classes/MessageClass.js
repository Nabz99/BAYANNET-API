const MessageSchema = require("../models/MessageModel");

class Message {
    static async create(message) {
        try {
            // Ensure required fields are present
            if (!message.sender || !message.receiver || !message.content) {
                throw new Error('Missing required fields');
            }

            // Create a new message document
            const newMessage = new MessageSchema({
                sender: message.sender,
                receiver: message.receiver,
                content: message.content,
                read: message.read || false
            });

            // Let the pre-save hook handle conversationId
            const savedMessage = await newMessage.save();

            // Populate sender/receiver if needed
            return await MessageSchema.findById(savedMessage._id)
                .populate('sender', 'username')
                .populate('receiver', 'username')
                .exec();
        } catch (error) {
            console.error('Error creating message:', error);
            throw error;
        }
    }
    static async find() {
        return await MessageSchema.find().sort({ $natural: -1 }).exec();
    }

    static async findById(message_id) {
        return await MessageSchema.findById(message_id).exec();
    }

    static async update(id, message) {
        message.updated_at = Date.now();
        return await MessageSchema.updateOne({ _id: id }, { $set: message }).exec();
    }

    static async remove(message) {
        return await MessageSchema.deleteOne({ _id: message }).exec();
    }

    static async findMessagesBySuperviseur(userId) {
        return await MessageSchema.find({ superviseur: userId }).exec();
    }

    // In your MessageClass.js
    static async findMessagesByParticipants(user1Id, user2Id) {
        try {
            return await MessageSchema.find({
                $or: [
                    // Messages where user1 is sender and user2 is receiver
                    { sender: user1Id, receiver: user2Id },
                    // Messages where user2 is sender and user1 is receiver
                    { sender: user2Id, receiver: user1Id }
                ]
            })
                .sort({ created_at: 1 }) // Sort by creation date (oldest first)
                .populate('sender', 'nom prenom') // Populate sender details
                .populate('receiver', 'nom prenom') // Populate receiver details
                .exec();
        } catch (error) {
            console.error('Error finding messages:', error);
            throw error;
        }
    }

    static async markMessagesAsRead(senderId, receiverId) {
        try {
            const result = await MessageSchema.updateMany(
                {
                    sender: senderId,
                    receiver: receiverId,
                    read: false
                },
                {
                    $set: {
                        read: true,
                        updated_at: Date.now()
                    }
                }
            ).exec();

            return result;
        } catch (error) {
            console.error('Error marking messages as read:', error);
            throw error;
        }
    }
}

module.exports = Message;