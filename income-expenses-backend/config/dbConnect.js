const mongoose = require("mongoose");

//connect

const dbConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://vishnukumta:T3W9CJHWGEudaL3X@income-expense-app.cdjzb2d.mongodb.net/income-expense-app?retryWrites=true&w=majority"
    );
    console.log("Db connected Successfully");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

dbConnect();
