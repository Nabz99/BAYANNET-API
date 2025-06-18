const WilayaModel = require("../models/WilayaModel")

class Wilaya {


    static async find() {

        const t = await WilayaModel.find().exec()
        return t
    }

    static async findById(wilaya_id) {

        const t = await WilayaModel.findById(wilaya_id).exec()
        return t
    }

    static async findWilayasByRegion(rcode) {

        const t = await WilayaModel.find({rcode: rcode}).exec()
        return t
    }


}

module.exports = Wilaya