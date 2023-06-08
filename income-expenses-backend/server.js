const express = require("express");
const globalErrHandler = require("./middlewares/globalErrHandler");
const cors= require("cors");
require("./config/dbConnect");
const accountRoute = require("./routes/accounts/accountRoute");
const transactionsRoute = require("./routes/transactions/transactionsRoute");
const usersRoute = require("./routes/users/usersRoute");

const app = express();

//middlewares
app.use(express.json()); //pass incoming data
//corse middleware
//cors
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Welcome to the Income/Expenses Tracker API",
    course:
      'This project is used to track the income and expense',
  });
});
//users route
app.use("/api/v1/users", usersRoute);
//account routes
app.use("/api/v1/accounts", accountRoute);

//transactions route
app.use("/api/v1/transactions", transactionsRoute);

//Error handlers
app.use(globalErrHandler);
//listen to server
const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`Server is up and runing on port ${PORT}`));
