const ReponseSchema = require("../models/ReponseModel")

class Reponse {

    static async create(reponse) {

        const t = await ReponseSchema.create(reponse)
        return t
    }

    static async find() {

        const t = await ReponseSchema.find().populate('superviseur').populate('enqueteur').populate('region').populate('wilaya').populate('commune').sort({ $natural: -1 }).exec()
        return t
    }

    static async findById(reponse_id) {

        const t = await ReponseSchema.findById(reponse_id).exec()
        return t
    }

    static async update(id, reponse) {

        const t = await ReponseSchema.updateOne({ _id: id }, { $set: reponse }).exec()
        return t
    }

    static async remove(reponse) {

        const t = await ReponseSchema.deleteOne({ _id: reponse }).exec()
        return t
    }

}

module.exports = Reponse