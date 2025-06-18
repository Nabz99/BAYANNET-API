const express = require("express");
const Wilaya = require("../classes/WilayaClass");
const router = express.Router()


// Find a Wilaya
router.get("/", async (req, res) => {
    try {
        const newWilaya = await Wilaya.find()
        res.status(200).send(newWilaya)
    } catch (error) {
        res.status(500).send(error)
    }
});

// Find a Wilaya by id
router.get("/find/:id", async (req, res) => {
    try {
        const wilaya = req.body
        const newWilaya = await Wilaya.findById(wilaya.wilaya_id)
        res.status(200).send(newWilaya)
    } catch (error) {
        res.status(500).send(error)
    }
});

// Find an Wilaya by id
router.get("/findwilayabyregion/:rcode", async (req, res) => {
    try {
        const { rcode } = req.params; // Get from URL params
        const newWilaya = await Wilaya.findWilayasByRegion(rcode)
        res.status(200).send(newWilaya)
    } catch (error) {
        res.status(500).send(error)
    }
});

module.exports = router