const { default: mongoose } = require("mongoose");

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.DB_URL}/chat`);
        console.log(`MongoDb connected: ${conn.connection.host}`)
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = connectDb;