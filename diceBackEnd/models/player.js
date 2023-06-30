import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
    name: {
        type:String,
        require:true
    },
    score: {
        type:Number
    }
})

mongoose.model("Player", playerSchema);