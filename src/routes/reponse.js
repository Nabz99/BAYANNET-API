const express = require("express");
const Reponse = require("../classes/ReponseClass");
const Notification = require("../classes/NotificationClass");
const fs = require('fs');
const multer = require("multer");
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Use the filename that was sent from the client
    if (file.originalname) {
      cb(null, file.originalname);
    } else {
      // Fallback to the same pattern if no filename was provided
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  }
});

const upload = multer({ storage: storage });

// Create a Reponse with file handling
router.post("/", upload.array('files'), async (req, res) => {
  try {
    let reponseData = req.body;

    // Handle uploaded files
    if (req.files && req.files.length > 0) {
      const reponses = JSON.parse(reponseData.reponses || '[]');

      req.files.forEach((file, index) => {
        const placeholder = `upload_${index}`;
        const questionIndex = reponses.findIndex(r => r.valeur === placeholder);
        if (questionIndex !== -1) {
          reponses[questionIndex].valeur = file.path;
        }
      });

      reponseData.reponses = reponses;
    }

    // Create new reponse
    const newReponse = await Reponse.create(reponseData);

    // Build notification message
    const message = `Une reponse pour le formulaire " ${reponseData.titre} " a etait crée.`;

    // Create notification for enqueteur (admin-level)
    await Notification.create({
      user: null,
      sendToAllSuperviseurs: false,
      message: message,
      isAdmin: true,
      seen: false,
      sendToSupervisorAndEnqueteurs: false,
      sendToAllUsers: false,
      created_by: reponseData.enqueteur
    });

    // Create notification for superviseur
    await Notification.create({
      user: reponseData.superviseur,
      sendToAllSuperviseurs: false,
      message: message,
      isAdmin: false,
      seen: false,
      sendToSupervisorAndEnqueteurs: false,
      sendToAllUsers: false,
      created_by: reponseData.enqueteur
    });

    res.status(201).send(newReponse);

  } catch (error) {
    // Clean up uploaded files if there was an error
    if (req.files) {
      req.files.forEach(file => {
        fs.unlink(file.path, err => {
          if (err) console.error('Error deleting file:', err);
        });
      });
    }
    res.status(500).send(error.message);
  }
});

module.exports = router;

// Update a Reponse
router.put("/:id", async (req, res) => {
  try {
    const reponse = req.body;
    const _id = req.params.id;

    const result = await Reponse.update(_id, reponse);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a Reponse
router.delete("/:id", async (req, res) => {
  try {
    const reponse = req.params.id;
    const newReponse = await Reponse.remove(reponse);
    res.status(200).send(newReponse);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find a Reponse
// In your backend route
router.get("/", async (req, res) => {
  try {
    const responses = await Reponse.find()

    // Add full URL to image paths
    const responsesWithUrls = responses.map(response => {
      if (response.reponses) {
        response.reponses = response.reponses.map(r => {
          if (r.valeur && /\.(jpg|jpeg|png|gif)$/i.test(r.valeur)) {
            // Remove any leading slashes or backslashes
            const cleanPath = r.valeur.replace(/^[\\/]/, '');
            return {
              ...r._doc,
              valeurUrl: `${req.protocol}://${req.get('host')}/uploads/${cleanPath}`
            };
          }
          return r;
        });
      }
      return response;
    });

    res.status(200).send(responsesWithUrls);
  } catch (error) {
    console.error('Error fetching responses:', error);
    res.status(500).send({ message: 'Error fetching responses', error: error.message });
  }
});

// Find a Reponse by id
router.get("/find/:id", async (req, res) => {
  try {
    const  _id  = req.params.id;
    const newReponse = await Reponse.findById(_id);
    res.status(200).send(newReponse);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;