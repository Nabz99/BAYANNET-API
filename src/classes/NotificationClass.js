const NotificationSchema = require("../models/NotificationModel")

class Notification {

    static async create(notification) {

        const t = await NotificationSchema.create(notification)
        return t
    }

    static async find() {

        const t = await NotificationSchema.find().populate('created_by').sort({ $natural: -1 }).exec()
        return t
    }

    static async findById(notification_id) {

        const t = await NotificationSchema.findById(notification_id).exec()
        return t
    }

    static async update(id, notification) {

        const t = await NotificationSchema.updateOne({ _id: id }, { $set: notification }).exec()
        return t
    }

    static async remove(notification) {

        const t = await NotificationSchema.deleteOne({ _id: notification }).exec()
        return t
    }

    static async findNotificationbyUser(userId) {

        const t = await NotificationSchema.find({user: userId}).sort({ $natural: -1 }).exec()
        return t
    }
    
    // static async findNotificationbyUser(userId) {
    //     // Find notifications where:
    //     // - user is the userId (regular user notifications)
    //     // OR superviseur is the userId (supervisor notifications)
    //     // OR sendToAllSuperviseurs is true (broadcast to all supervisors)
    //     const notifications = await NotificationSchema.find({
    //         $or: [
    //             { user: userId },
    //             { superviseur: userId },
    //             { sendToAllSuperviseurs: true }
    //         ]
    //     })
    //     .sort({ createdAt: -1 }, { $natural: -1 }) // Sort by newest first
    //     .exec();
        
    //     return notifications;
    // }
    
    static async markAllAsRead(userId) {
        // Update all unread notifications for this user where:
        // - user is the userId (regular user notifications)
        // OR superviseur is the userId (supervisor notifications)
        // OR sendToAllSuperviseurs is true (broadcast to all supervisors)
        const result = await NotificationSchema.updateMany(
            {
                $or: [
                    { user: userId, seen: false },
                    { superviseur: userId, seen: false },
                    { sendToAllSuperviseurs: true, seen: false }
                ]
            },
            { 
                $set: { 
                    seen: true,
                    updated_at: new Date() 
                } 
            }
        ).exec();
        
        return result;
    }

}


module.exports = Notification