import mongoose from "mongoose"

const connection= async (username,password)=>{
    const URL=`mongodb://${username}:${password}@cluster0-shard-00-00.c9vaf.mongodb.net:27017,cluster0-shard-00-01.c9vaf.mongodb.net:27017,cluster0-shard-00-02.c9vaf.mongodb.net:27017/?ssl=true&replicaSet=atlas-rd61ti-shard-0&authSource=admin&retryWrites=true&w=majority`

    try {
        await mongoose.connect(URL,{useUnifiedtopology:true , useNewUrlParser: true});
        // await mongoose.connect(URL);
        console.log('Database is connected');
        
    } catch (error) {
        console.log(`Error while connecting with database`, error)
        
    }
}

export default connection