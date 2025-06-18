const FormulaireSchema = require("../models/FormulaireModel")

class Formulaire {

    static async create(formulaire) {

        const t = await FormulaireSchema.create(formulaire)
        return t
    }

    static async find() {

        const t = await FormulaireSchema.find().populate('questions.question', 'titre').sort({ $natural: -1 }).exec()
        return t
    }

    static async findById(formulaire_id) {

        const t = await FormulaireSchema.findById(formulaire_id).populate('questions.question', 'titre').exec()
        return t
    }

    static async update(id, formulaire) {

        const t = await FormulaireSchema.updateOne({ _id: id }, { $set: formulaire }).exec()
        return t
    }

    static async remove(formulaire) {

        const t = await FormulaireSchema.deleteOne({ _id: formulaire }).exec()
        return t
    }

}

module.exports = Formulaire