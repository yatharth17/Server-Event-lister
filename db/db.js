const mongoose = require("mongoose");

const db=require('../config/keys').mongoURI;

const connectDB = async () => {
  try {
    var client=await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    
    console.log("MongoDB Connected ");
   

  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;