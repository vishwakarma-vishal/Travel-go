const router = require("express").Router();
const multer = require("multer");

const { createListing, getListingByCategory, getListingBySearch, getSingleListing } = require("../controllers/listingController")

router.post("/create", createListing);
router.get("/", getListingByCategory)
router.get("/search/:search", getListingBySearch)
router.get("/:listingId", getSingleListing)

module.exports = router
