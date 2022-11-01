import express  from "express";
import connection from "./Database/db.js";
import Routes from "./routes/UserRoute.js"
import HomeRoute from "./routes/HomeRoute.js"
import cors from "cors"
import dotenv from "dotenv"
import bodyParser from "body-parser";

const app= express();

dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors());
// app.use('/user',UserRoute)
// app.use('/',HomeRoute)
app.use('/user',Routes)
const PORT= 8000;

const username=process.env.DB_USERNAME;
const password=process.env.DB_PASSWORD;

connection(username,password)

app.listen(PORT, ()=> console.log(`Server is running on port number: ${PORT}`))