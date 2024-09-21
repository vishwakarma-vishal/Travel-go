const cron = require("cron");
const https = require('https');

const SERVER_URL = process.env.SERVER_URL;
const backendUrl = `${SERVER_URL}/properties`;
const job = new cron.CronJob('*/14 * * * *', function () {
    console.log('Pinging server to keep it awake');

    https.get(backendUrl, (res) => {
        if (res.statusCode === 200) {
            console.log('Server is awake!');
        } else {
            console.error(`Failed to ping server with status code: ${res.statusCode}`);
        }
    })
        .on('error', (err) => {
            console.error('Error during ping:', err.message);
        });
});

// Export the cron job
module.exports = job; 
