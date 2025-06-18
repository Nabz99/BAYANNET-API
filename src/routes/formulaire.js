const express = require("express");
const Formulaire = require("../classes/FormulaireClass");
const router = express.Router();

// Create a Formulaire
router.post("/", async (req, res) => {
  try {
    const formulaire = req.body;
    const newFormulaire = await Formulaire.create(formulaire);
    res.status(201).send(newFormulaire);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a Formulaire
router.put("/:id", async (req, res) => {
  try {
    const formulaire = req.body;
    const _id = req.params.id;

    const result = await Formulaire.update(_id, formulaire);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a Formulaire
router.delete("/:id", async (req, res) => {
  try {
    const formulaire = req.params.id;
    const newFormulaire = await Formulaire.remove(formulaire);
    res.status(200).send(newFormulaire);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find a Formulaire
router.get("/", async (req, res) => {
  try {
    const newFormulaire = await Formulaire.find();
    res.status(200).send(newFormulaire);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find a Formulaire by id
router.get("/find/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const newFormulaire = await Formulaire.findById(_id);
    res.status(200).send(newFormulaire);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;