const express = require('express')
const cors = require("cors")
const mongoose = require("mongoose")

const userRoutes = require('./routes/user')

const app = express()

const URL = "mongodb+srv://admin:0000@cluster0.w0tuvob.mongodb.net/netflix?retryWrites=true&w=majority"

app.use(cors());
app.use(express.json())

app.use("/api/user", userRoutes)

//id: testEmail
mongoose.connect(URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(response => {
    app.listen(5000,()=>{
        console.log("running at 5000" );
    })
    console.log("DB connected");
}).catch(err => console.log(err)) 