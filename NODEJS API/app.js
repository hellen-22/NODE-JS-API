const PORT = process.env.PORT | 4000
const express = require("express");
const app = express();


app.use(express.json())
app.use("/register", require("./routes/signup"));
app.use("/login",require("./routes/login"));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
