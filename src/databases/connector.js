const mongoose = require("mongoose");

module.exports = async (client) => {
    try {
        mongoose.set("strictQuery", false);
        mongoose.connect(client.config.mongoUri);

        console.log("[INFO] Database events loaded");
    } catch (error) {
        console.error(error);
    }
};

