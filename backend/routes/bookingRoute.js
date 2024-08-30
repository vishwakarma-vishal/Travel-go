const router = require("express").Router()
const bookingController = require("../controllers/bookingController");

router.post("/create", bookingController);

module.exports = router