import { connect, ConnectOptions } from "mongoose";

const connectMongo = async () => {
    try {
        const mongoUri = process.env.MONGO_URI
        const options: ConnectOptions = {

        }
        await connect(mongoUri, options)
        console.log("[i] Mongo DB connected")
    }
    catch (err) {
        console.warn(err)
        process.exit(1)
    }
}


export default connectMongo