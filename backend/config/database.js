const mongoose = require("mongoose");

/* Database connection  */
const dbConnect = () => {
    mongoose
        .connect(process.env.MONGO_URL)
        .then(() => {
            console.log(`Connection successful with DB`);
        })
        .catch((err) => console.log(`Error while connection with the DB, ${err}`));
}

module.exports = dbConnect;