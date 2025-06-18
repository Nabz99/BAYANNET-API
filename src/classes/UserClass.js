const UserSchema = require("../models/UserModel");
const bcrypt = require("bcryptjs");

class User {
    static async create(user) {
        user.password = await bcrypt.hash(user.password, 10);
        const t = await UserSchema.create(user);
        return t;
    }

    static async find() {
        const t = await UserSchema.find().populate('region', 'region')
            .populate('wilaya', 'wilaya')
            .populate('commune', 'city')
            .populate('formulaire', 'titre')
            .populate('superviseur')
            .exec();
        return t;
    }

    static async findById(id) {
        const t = await UserSchema.findById(id).populate('region').populate('wilaya').populate("commune").populate('formulaire').populate('superviseur').exec();
        return t;
    }

    static async update(id, user) {
        if (user.password) {
            user.password = await bcrypt.hash(user.password, 10);
        }
        const t = await UserSchema.updateOne({ _id: id }, { $set: user }).exec();
        return t;
    }

    static async remove(id) {
        const t = await UserSchema.deleteOne({ _id: id }).exec();
        return t;
    }

    static async findById(user_id) {

        const t = await UserSchema.findById(user_id).populate('region').populate('wilaya').populate("commune").populate('formulaire').populate('superviseur').exec()
        return t
    }

    static async findByEmail(email) {
        const t = await UserSchema.findOne({ email: email }).exec();
        return t;
    }

    static async findByRole(role) {
        const t = await UserSchema.findOne({ role: role }).exec();
        return t;
    }

    static async findEnqueteursBySuperviseur(userId) {

        const t = await UserSchema.find({ superviseur: userId })
            .populate('region', 'region')
            .populate('wilaya', 'wilaya')
            .populate('commune', 'city')
            .exec()
        return t
    }
}

module.exports = User;
