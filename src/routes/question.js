const express = require("express");
const Question = require("../classes/QuestionClass");
const router = express.Router();

// Create a Question
router.post("/", async (req, res) => {
  try {
    const question = req.body;
    const newQuestion = await Question.create(question);
    res.status(201).send(newQuestion);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a Question
router.put("/:id", async (req, res) => {
  try {
    const question = req.body;
    const _id = req.params.id;

    const result = await Question.update(_id, question);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a Question

router.delete("/:id", async (req, res) => {
  try {
    const question = req.params.id;
    const newQuestion = await Question.remove(question)
    res.status(200).send(newQuestion)
  } catch (error) {
    res.status(500).send(error)
  }
});

// Find a Question
router.get("/", async (req, res) => {
  try {
    const newQuestion = await Question.find();
    res.status(200).send(newQuestion);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find a Question by id
router.get("/find/:id", async (req, res) => {
  try {
    const  _id  = req.params.id;
    const newQuestion = await Question.findById(_id);
    res.status(200).send(newQuestion);
  } catch (error) {
    res.status(500).send(error);
  }
});



module.exports = router;