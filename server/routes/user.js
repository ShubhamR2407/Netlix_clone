const express = require("express")

const userControllers = require("../controllers/user")

const router = express.Router()

router.post("/add",userControllers.addToLikedMovies)

router.get("/liked/:email", userControllers.getLikedMovies)

router.put("/delete", userControllers.removeFromLiked)

module.exports = router