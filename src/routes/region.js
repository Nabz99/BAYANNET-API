const express = require("express");
const Region = require("../classes/RegionClass");
const router = express.Router()


// Find a Region
router.get("/", async (req, res) => {
    try {
        const newRegion = await Region.find()
        res.status(200).send(newRegion)
    } catch (error) {
        res.status(500).send(error)
    }
});

// Find an Region by id
router.get("/find/:id", async (req, res) => {
    try {
        const region = req.body
        const newRegion = await Region.findById(region.region_id)
        res.status(200).send(newRegion)
    } catch (error) {
        res.status(500).send(error)
    }
});

module.exports = router