const mongoose = require('mongoose');


const connectToDB =async() => {
    const dbConnect = await mongoose.connect(process.env.mongodbString)
        .then(() => console.log("Database connect successfully"))
        .catch((err) => console.log(err));
    return dbConnect
};

module.exports = connectToDB;