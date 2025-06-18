const express = require("express");
const Message = require("../classes/MessageClass");
const router = express.Router();

// Create a Message
router.post("/", async (req, res) => {
  try {
    const message = req.body;

    // Basic validation
    if (!message.sender || !message.receiver || !message.content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newMessage = await Message.create(message);
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({
      error: 'Failed to create message',
      details: error.message
    });
  }
});

// Update a Message
router.put("/:id", async (req, res) => {
  try {
    const message = req.body;
    const _id = req.params.id;
    const result = await Message.update(_id, message);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a Message
router.delete("/:id", async (req, res) => {
  try {
    const message = req.params.id;
    const newMessage = await Message.remove(message);
    res.status(200).send(newMessage);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get all Messages
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).send(messages);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find a Message by id
router.get("/find/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findById(id);
    res.status(200).send(message);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get messages between two users
router.get('/between/:user1Id/:user2Id', async (req, res) => {
  try {
    const { user1Id, user2Id } = req.params;
    const messages = await Message.findMessagesByParticipants(user1Id, user2Id);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/mark-as-read', async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    await Message.markMessagesAsRead(senderId, receiverId);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = router;