const AdminSchema = require("../models/AdminModel")
const bcrypt = require("bcryptjs")

class Admin {

    static async create(admin) {
        admin.password = await bcrypt.hash(admin.password, 10)
        const t = await AdminSchema.create(admin)
        return t
    }

    static async find() {

        const t = await AdminSchema.find().exec()
        return t
    }

    static async findById(admin_id) {

        const t = await AdminSchema.findById(admin_id).exec()
        return t
    }

    static async update(id, admin) {
        
        admin.password = await bcrypt.hash(admin.password, 10)
        const t = await AdminSchema.updateOne({ _id: id }, { $set: admin }).exec();
        return t;
    }

    static async remove(admin) {
        const t = await AdminSchema.deleteOne({ _id: admin }).exec()
        return t
    }

    static async findByEmail(email) {
        const t = await AdminSchema.findOne({ email: email }).exec()
        return t
    }

}

module.exports = Admin