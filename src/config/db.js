const mongoose = require("mongoose");

const mongoDB = mongoose
  .connect('mongodb+srv://teamx:test123@cluster.djakmym.mongodb.net/feedme')
  .then(() =>
    console.log(`DB Connection Successfull`)
  )
  .catch((err) => {
    console.log(err.message);
  });

module.exports = mongoDB;
