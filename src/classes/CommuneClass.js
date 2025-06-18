const CommuneSchema = require("../models/CommuneModel")

class Commune {


    static async find() {

        const t = await CommuneSchema.find().exec()
        return t
    }

    static async findById(commune_id) {

        const t = await CommuneSchema.findById(commune_id).exec()
        return t
    }

    static async findCommunesByWilaya(wcode) {

        const t = await CommuneSchema.find({wcode: wcode}).exec()
        return t
    }

}

module.exports = Commune