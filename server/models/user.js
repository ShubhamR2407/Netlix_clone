const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50
    },
    likedMovies: {
        type: Array
    }
})

module.exports = mongoose.model("User", UserSchema);