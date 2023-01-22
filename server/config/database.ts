import mongoose from "mongoose";

const URL = process.env.MONGODB_URL

mongoose.set('strictQuery', false);

mongoose.connect(`${URL}`,{
}, (error) => {
    if(error) throw error;
    console.log('Mongoose Connected Success')
});
