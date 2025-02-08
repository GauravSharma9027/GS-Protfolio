const mongoose = require('mongoose');
const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL,{
            useNewUrlParser:true,
            // useCreateIndex:true,
            useUnifiedTopology:true,
            // useFindAndModify:false
        });
            console.log("Database is connected successfully");
    } catch (error) {
        console.log("Some error in database connection", error);
    }
}

module.exports = connectDB;

