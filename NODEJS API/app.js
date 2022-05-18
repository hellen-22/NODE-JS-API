const PORT = process.env.PORT | 4000;
const path = require("path");
const express = require("express");
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/static")));
app.use("/register", require("./routes/signup"));
app.use("/login",require("./routes/login"));
app.use("/logout",require("./routes/logout"));


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
