const mongoose = require('mongoose')

const connectionUrl =  `mongodb://localhost:27017/Login`;
mongoose.connect(connectionUrl)
const db = mongoose.connection;
db.once("open", function () {
  console.log("Connected successfully");
});

module.exports = db;