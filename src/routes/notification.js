const express = require("express");
const Notification = require("../classes/NotificationClass");
const User = require("../classes/UserClass");

const router = express.Router();

// Create a Notification
router.post("/", async (req, res) => {
  try {
    const notificationData = req.body;

    // Case 1: Notification for a specific user
    if (notificationData.user && !notificationData.sendToSupervisorAndEnqueteurs && !notificationData.sendToAllUsers) {
      const user = await User.findById(notificationData.user);
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      const newNotification = await Notification.create(notificationData);
      return res.status(201).send(newNotification);
    }

    // Case 2: Notification for a Superviseur and all their Enqueteurs
    if (notificationData.user && notificationData.sendToSupervisorAndEnqueteurs) {
      const superviseurId = notificationData.user;

      const superviseur = await User.findById(superviseurId);
      if (!superviseur) {
        return res.status(404).send({ message: "Superviseur not found" });
      }

      if (superviseur.role !== 'Superviseur') {
        return res.status(400).send({ message: "Specified user must be a Superviseur" });
      }

      // Create notification for the superviseur
      const superviseurNotification = await Notification.create({
        ...notificationData,
        user: superviseur._id
      });

      // Find users with role 'Enqueteur' and supervised by this specific superviseur
      const enqueteurs = await User.findEnqueteursBySuperviseur(superviseur._id);

      // Filter out users who might be duplicate
      const filteredEnqueteurs = enqueteurs.filter(enq => enq._id.toString() !== superviseur._id.toString());

      // Create notifications only for filtered enqueteurs
      const enqueteurNotifications = await Promise.all(
        filteredEnqueteurs.map(enqueteur =>
          Notification.create({
            ...notificationData,
            user: enqueteur._id
          })
        )
      );

      return res.status(201).send([superviseurNotification, ...enqueteurNotifications]);
    }

    // Case 3: Notification to all Superviseurs
    if (notificationData.sendToAllSuperviseurs) {
      const superviseurs = await User.find({ role: 'Superviseur' });

      const notifications = await Promise.all(
        superviseurs.map(superviseur =>
          Notification.create({
            ...notificationData,
            user: superviseur._id
          })
        )
      );

      return res.status(201).send(notifications);
    }

    // Case 4: Notification to all users in the system
    if (notificationData.sendToAllUsers) {
      const allUsers = await User.find({});

      const notifications = await Promise.all(
        allUsers.map(user =>
          Notification.create({
            ...notificationData,
            user: user._id
          })
        )
      );

      return res.status(201).send(notifications);
    }

    // Default case: invalid request
    return res.status(400).send({
      message: "Invalid notification request. Must specify either:" +
        "\n- A user (for single notification)" +
        "\n- A superviseur user with sendToSupervisorAndEnqueteurs=true" +
        "\n- sendToAllSuperviseurs=true for all superviseurs" +
        "\n- sendToAllUsers=true for all users"
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
});

// Update a Notification
router.put("/:id", async (req, res) => {
  try {
    const notification = req.body;
    const _id = req.params.id;

    const result = await Notification.update(_id, notification);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a Notification
router.delete("/:id", async (req, res) => {
  try {
    const notification = req.params.id;
    const newNotification = await Notification.remove(notification);
    res.status(200).send(newNotification);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find a Notification
router.get("/", async (req, res) => {
  try {
    const newNotification = await Notification.find();
    res.status(200).send(newNotification);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find a Notification by id
router.get("/find/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const newNotification = await Notification.findById(_id);
    res.status(200).send(newNotification);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find a Notification by user
router.get("/findnotificationbyuser/:user", async (req, res) => {
  try {
    const { user } = req.params;
    const notifications = await Notification.findNotificationbyUser(user);
    res.status(200).json({
      success: true,
      data: notifications
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notifications',
      error: error.message
    });
  }
});

router.patch("/markallasread/:user", async (req, res) => {
  try {
    const { user } = req.params;
    const result = await Notification.markAllAsRead(user);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark notifications as read',
      error: error.message
    });
  }
});


module.exports = router;