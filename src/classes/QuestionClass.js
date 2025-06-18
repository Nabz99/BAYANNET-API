const QuestionSchema = require("../models/QuestionModel")

class Question {

    static async create(question) {

        const t = await QuestionSchema.create(question)
        return t
    }

    static async find() {

        const t = await QuestionSchema.find().sort({ $natural: -1 }).exec()
        return t
    }

    static async findById(question_id) {

        const t = await QuestionSchema.findById(question_id).exec()
        return t
    }

    static async update(id, question) {

        const t = await QuestionSchema.updateOne({ _id: id }, { $set: question }).exec()
        return t
    }

    static async remove(question) {

        const t = await QuestionSchema.deleteOne({ _id: question }).exec()
        return t
    }

}

module.exports = Question