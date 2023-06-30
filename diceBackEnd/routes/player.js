import express from 'express';
import mongoose from 'mongoose';

const Player = mongoose.model("Player");

const playerRoute = express.Router();

playerRoute.post('/player', (req, res)=> {
    const {name} = req.body;
    if(!name){
        res.status(500).json({
            success:false,
            error:"please enter player name",
        })
    }
    const score = parseInt(Math.random()*7) + 1;

    const newPlayer = new Player({
        name,
        score
    })
    newPlayer.save()
        .then((player)=> {
            res.status(200).json({
                message:"Player add to database",
                data: {player}
            })
        })
        .catch(err=> {
            res.status(500).json({
                message:"player not added",
                error:err
            })
        })
})


playerRoute.get('/winner', (req, res)=> {
    const winnerArray = [];
    Player.find().sort({'score':-1}).limit(1)
        .then((userFound)=> {
            var winnerScore = userFound[0].score;
            console.log(userFound[0].score);
            Player.find({score:userFound[0].score})
                .then((winners)=> {
                    winners.forEach(winners=> {
                        winnerArray.push(winners.name);
                    })
                    res.status(200).json({
                        success:true,
                        message:"Winner found",
                        data:{winnerArray, winnerScore}
                    })
                })
                .catch(err=> {
                    console.log(`error found : ${err}`);
                })
        })
        .catch(err=> {
            res.status(500).json({
                success:false,
                message:"error occur",
                error:err
            })
        })
})

playerRoute.delete('/delete', (req, res)=>{
    Player.deleteMany({})
        .then((result)=> {
            res.status(200).json({
                success:true,
                message:"players deleted",
                data:result
            })
        })
        .catch(err=> {
            res.status(500).json({
                success:false,
                message:"error occure to delete player",
                error:err
            })
        })
})


export default playerRoute;

