const express = require("express");
const {connectMongoDb} = require("./connection");
const {logReqRes} = require("./Middleware")
const userRouter = require('./routes/user');

const app = express();
const PORT = 8000;

// connection
connectMongoDb('mongodb://127.0.0.1:27017/youtube-app-1')
.then(() => console.log("MonogoDB Connected") );

// Middelware - pulgin
app.use(express.urlencoded( { extended: false } ))
app.use( logReqRes("log.txt") );

app.use((req, res, next) => {
    console.log("Hello from middleware 1");
    next();
    // return res.end("hey");
})

// routes
app.use("/api/users", userRouter);


app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));