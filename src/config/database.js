require("dotenv").config();

const mongoose = require("mongoose");

const database = async () => {
    try{
        const connectIoInstance = await mongoose.connect(
            process.env.MONGODB_URI
        );

        console.log(
            `\n MONGODB CONNECTED SUCCESSFULLY
            ${connectIoInstance.connection.host}`
        );

    }catch(error){
        console.log(`MONGODB Connection Failed: `, error.message);
        process.exit(1);
    }

}


module.exports = database;