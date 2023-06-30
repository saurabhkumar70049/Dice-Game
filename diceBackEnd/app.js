import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import "./models/player.js";

import playerRoute from './routes/player.js';


const PORT = 8080;
const mongodbURL = 'mongodb://localhost:27017/Dice';
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(mongodbURL)
    .then((result)=> {
        console.log('sever is connected to Database');
    })
    .catch(err=> {
        console.log('data is not connected')
    })



app.use('/api', playerRoute);


app.listen(PORT, ()=> {
    console.log(`Server is running on PORT ${PORT}`);
})
