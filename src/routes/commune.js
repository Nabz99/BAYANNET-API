const express = require("express");
const Commune = require("../classes/CommuneClass");
const router = express.Router()


// Find a Commune
router.get("/", async (req, res) => {
    try {
        const newCommune = await Commune.find()
        res.status(200).send(newCommune)
    } catch (error) {
        res.status(500).send(error)
    }
});

// Find a Commune by id
router.get("/find/:id", async (req, res) => {
    try {
        const commune = req.body
        const newCommune = await Commune.findById(commune.commune_id)
        res.status(200).send(newCommune)
    } catch (error) {
        res.status(500).send(error)
    }
});

// Find an Commune by id
router.get("/findcommunebywilaya/:wcode", async (req, res) => {
    try {
        const { wcode } = req.params; // Get from URL params
        const newCommune = await Commune.findCommunesByWilaya(wcode)
        res.status(200).send(newCommune)
    } catch (error) {
        res.status(500).send(error)
    }
});

module.exports = router