const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoUri');

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: true
        });
    }
    catch (err) {

        console.error(err.message);
        process.exit(1);

    }
    console.log("Mongoose connnected");

};

module.exports = connectDB;