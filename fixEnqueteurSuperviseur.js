const mongoose = require("mongoose");
const User = require("./src/models/UserModel"); // adjust path if needed

mongoose.connect("mongodb://localhost:27017/infollect")
    .then(async () => {
        const usersToFix = await User.find({
            role: 'Enqueteur',
            superviseur: { $exists: true, $not: { $type: 'objectId' } }
        });

        console.log(`Found ${usersToFix.length} users to fix`);

        for (const user of usersToFix) {
            try {
                user.superviseur = new mongoose.Types.ObjectId(user.superviseur);
                await user.save();
                console.log(`Fixed user: ${user._id}`);
            } catch (err) {
                console.error(`Error fixing user ${user._id}:`, err.message);
            }
        }

        console.log("✅ All done!");
        mongoose.disconnect();
    })
    .catch(err => console.error("Connection error:", err));
