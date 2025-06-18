
const express = require("express");
const User = require("../classes/UserClass");
const router = express.Router();

// Create a User (Superviseur or Enqueteur)
router.post("/", async (req, res) => {
  try {
    const user = req.body;
    const newUser = await User.create(user);
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a User
router.put("/:id", async (req, res) => {
  try {
    const user = req.body;
    const _id = req.params.id;

    const result = await User.update(_id, user);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a User
router.delete("/:id", async (req, res) => {
  try {
    const user = req.params.id;
    const newUser = await User.remove(user);
    res.status(200).send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find all Users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find a User by ID
router.get("/find/:id", async (req, res) => {
  try {
     const _id = req.params.id;
    const user = await User.findById(_id);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/role/:role", async (req, res) => {
    try {
      const { role } = req.params;
      const users = await User.findByRole(role);
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.get("/findenqueteurbysuperviseur/:userId", async (req, res) => {
      try {
          const { userId } = req.params; // Get from URL params
          const newUser = await User.findEnqueteursBySuperviseur(userId)
          res.status(200).send(newUser)
      } catch (error) {
          res.status(500).send(error)
      }
  });
  
module.exports = router;