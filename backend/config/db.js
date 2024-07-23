const mongoose = require('mongoose');

const ConnectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });

        console.log(`MongoDB Connected Successfully: ${connection.connection.host}` .cyan.underline);
    }
    catch(err) {
        console.log(`Error: ${err.message}` .red.bold);
        process.exit();

    }
}

module.exports = ConnectDB;