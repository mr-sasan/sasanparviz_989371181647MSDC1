const mongoose = require("mongoose");

class dbConnector {
  static connect() {
    mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on("error", (e) => console.error(e));
    db.once("open", () => console.log("Mongoose connected to DB"));
  }
}

module.exports = dbConnector;
