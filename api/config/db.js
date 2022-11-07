import mongoose from "mongoose";


// conect with mongodb server
const mongoDBConnection = async () => {

    try {

        const connection = await mongoose.connect(process.env.MONGO_STRING);
        console.log('MongoDB Server in Connected'.bgGreen.black)

    } catch (error) {
        console.log(error);
    }

}

export default mongoDBConnection;