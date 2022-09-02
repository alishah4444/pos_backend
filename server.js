const http = require("http")
const PORT = 3000
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const User = require("./src/model/user")


const applicationServer = express()
applicationServer.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
applicationServer.use(bodyParser.json({ limit: '5mb', extended: true }));

const httpServer = http.createServer(applicationServer);
const dbKey = `mongodb+srv://alishahdsu:Admin123@cluster0.f5kbbga.mongodb.net/node-pos?retryWrites=true&w=majority`

// const httpsServer = https.createServer(httpsCredentials, applicationServer);

applicationServer.get("/test-user", (req, res) => {

    let user = new User({
        username: "admin@gmail.com",
        password: "Admin@12",
        phoneNo: "+124569386",
        role: 1
    })

    user.save().then((result) => res.send(result)).catch((err) => res.send(err))
})

mongoose.connect(dbKey).then((result) => {
    httpServer.listen(PORT)
    console.log("success")
}).catch((err) => {
    console.log(err)
    console.log("failed")
});




