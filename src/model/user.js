const mongoose = require("mongoose")
const schema = mongoose.Schema;

const userSchema = new schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: Number,
    },
    phoneNo: {
        type: Number,
        require: true
    }

},{timestamps:true})

const user =mongoose.model("user",userSchema)
module.exports=user