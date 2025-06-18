const RegionSchema = require("../models/RegionModel")

class Region {


    static async find() {

        const t = await RegionSchema.find().exec()
        return t
    }

    static async findById(region_id) {

        const t = await RegionSchema.findById(region_id).exec()
        return t
    }


}

module.exports = Region