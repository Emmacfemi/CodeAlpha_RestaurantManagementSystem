require("dotenv").config();


const dns = require("dns");

dns.setServers([
    "8.8.8.8",
    "1.1.1.1"
]);


const app = require("./app");

const PORT = process.env.PORT || 3002;

const database = require("./config/database")

const startServer = async () => {
    try {

        await database();

        app.on("error", error => {
            console.log(`ERROR`, error);
            throw error
        });

        app.listen(PORT, () => {
            console.log(`Listening from localhost https://localhost${PORT}`);
        });
        
    } catch (error) {
        console.log(`MONGODB CONNECTION FAILED`, error);
        
    }
}
startServer();