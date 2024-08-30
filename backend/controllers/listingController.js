const Listing = require("../models/Listing");
const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

// Function to upload a single image
const uploadImage = async (imagePath) => {
    try {
        const result = await cloudinary.uploader.upload(imagePath, {
            use_filename: true,
            unique_filename: true,
            overwrite: false,
            folder: "Travel Go/Listings" // Optional: Define a folder in Cloudinary
        });
        console.log(`Uploaded ${imagePath}: ${result.secure_url}`);
        return result.secure_url; // Return the URL of the uploaded image
    } catch (error) {
        console.error(`Error uploading ${imagePath}:`, error.message);
        throw error; // Rethrow the error to handle it in the calling function
    }
};

// Function to upload multiple images
const uploadImages = async (paths) => {
    try {
        // Upload all images and collect their URLs
        const uploadPromises = paths.map(uploadImage);
        const urls = await Promise.all(uploadPromises);

        // Optionally: Remove temporary files after upload
        paths.forEach(filePath => {
            fs.unlink(filePath, (err) => {
                if (err) console.error(`Failed to delete ${filePath}:`, err.message);
            });
        });

        return urls; // Return an array of URLs
    } catch (error) {
        console.error("Error uploading images:", error.message);
        throw error; // Rethrow the error to handle it in the calling function
    }
};

// Create Listing function
const createListing = async (req, res) => {
    try {
        // Extract information from the form
        const {
            creator,
            category,
            type,
            streetAddress,
            aptSuite,
            city,
            province,
            country,
            guestCount,
            bedroomCount,
            bedCount,
            bathroomCount,
            amenities,
            title,
            description,
            highlight,
            highlightDesc,
            price,
        } = req.body;

        // Extract and handle uploaded files
        const listingPhotos = req.files.listingPhotos;

        if (!listingPhotos || listingPhotos.length === 0) {
            return res.status(400).send("No file uploaded.");
        }

        // Initialize array to hold paths
        let tempPaths = [];

        // Process files
        await Promise.all(listingPhotos.map(async (file) => {
            try {
                const tempPath = path.join(__dirname, 'uploads', file.name);
                await file.mv(tempPath);
                tempPaths.push(tempPath);
            } catch (err) {
                console.error(`Error moving file ${file.name}:`, err.message);
            }
        }));

        // Upload images to Cloudinary and get URLs
        const listingPhotoUrls = await uploadImages(tempPaths);

        // Create new listing
        const newListing = new Listing({
            creator,
            category,
            type,
            streetAddress,
            aptSuite,
            city,
            province,
            country,
            guestCount,
            bedroomCount,
            bedCount,
            bathroomCount,
            amenities,
            listingPhotoPaths: listingPhotoUrls,  // Save URLs instead of paths
            title,
            description,
            highlight,
            highlightDesc,
            price,
        });

        // Save listing to database
        await newListing.save();

        res.status(200).json(newListing);
    } catch (err) {
        console.error(err);
        res.status(409).json({ message: "Fail to create Listing", error: err.message });
    }
};

/* GET lISTINGS BY CATEGORY */
const getListingByCategory = async (req, res) => {
    const qCategory = req.query.category

    try {
        let listings
        if (qCategory) {
            listings = await Listing.find({ category: qCategory }).populate("creator")
        } else {
            listings = await Listing.find().populate("creator")
        }

        res.status(200).json(listings)
    } catch (err) {
        res.status(404).json({ message: "Fail to fetch listings", error: err.message })
        console.log(err)
    }
}

/* GET LISTINGS BY SEARCH */
const getListingBySearch = async (req, res) => {
    const { search } = req.params

    try {
        let listings = []

        if (search === "all") {
            listings = await Listing.find().populate("creator")
        } else {
            listings = await Listing.find({
                $or: [
                    { category: { $regex: search, $options: "i" } },
                    { title: { $regex: search, $options: "i" } },
                ]
            }).populate("creator")
        }

        res.status(200).json(listings)
    } catch (err) {
        res.status(404).json({ message: "Fail to fetch listings", error: err.message })
        console.log(err)
    }
}

/* LISTING DETAILS */
const getSingleListing = async (req, res) => {
    try {
        const { listingId } = req.params
        const listing = await Listing.findById(listingId).populate("creator")
        res.status(202).json(listing)
    } catch (err) {
        res.status(404).json({ message: "Listing can not found!", error: err.message })
    }
}

module.exports = { createListing, getListingByCategory, getListingBySearch, getSingleListing }
