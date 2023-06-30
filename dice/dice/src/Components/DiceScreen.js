import React, {useState} from 'react';
import axios from 'axios';
const DiceScreen = () => {
    let [players, setPlayers] = useState({
        player1: '',player2: '',player3: '',player4: '',player5: ''
    });
    let [scores, setScores] = useState({
        player1: "",player2: "",player3: "",player4: "",player5: ""
    })

    let [winner, setWinner] = useState([]);
    let [winnerScore, setWinnerScore] = useState("");

    console.log(winner, winnerScore)


    function diceRoll(e) {
          let player_id = e.target.id.replace("p", "player");

        //   console.log(player_id, players[player_id])

          axios.post("http://localhost:8080/api/player", {name: players[player_id]})
            .then(res => setScores({...scores, [player_id]: res.data.data.player.score}))
            .catch(err => console.log("error is " , err))
         }

    function findWinner() {
          
        axios.get("http://localhost:8080/api/winner")
            .then(res => {
                setWinner(res.data.data.winnerArray);
                setWinnerScore(res.data.data.winnerScore);
                // console.log(winner);
            })
            .catch(err => console.log(err))

    }

    function reset() {
          axios.delete("http://localhost:8080/api/delete")
          .then(res => {
                setPlayers({
                    player1: '',player2: '',player3: '',player4: '',player5: ''
                });
                setScores({
                    player1: "",player2: "",player3: "",player4: "",player5: ""
                });
                setWinner([]);
                setWinnerScore("");
          }
          )
            .catch(err => console.log(err))
    }


    return(
        <div>
            <label>Person1: 
                <input type="text" name="person1" 
                   onChange={(e) => setPlayers({...players, player1: e.target.value})}
                    value={players.player1}
                />
                <button id="p1" onClick={diceRoll}>Roll</button>
                {
                    scores.player1 ? <span>Score: {scores.player1}</span> : null
                }
             </label>
            <label>Person2:
                <input type="text" name="person2" 
                     onChange={(e) => setPlayers({...players, player2: e.target.value})}
                     value={players.player2}
                />
                <button id="p2" onClick={diceRoll}>Roll</button>
                {
                    scores.player2 ? <span>Score: {scores.player2}</span> : null
                }
            </label>
            <label>Person3:
                <input type="text" name="person3" 
                        onChange={(e) => setPlayers({...players, player3: e.target.value})}
                        value={players.player3}
                />
                <button id="p3" onClick={diceRoll}>Roll</button>
                {
                    scores.player3 ? <span>Score: {scores.player3}</span> : null
                }
            </label>
            <label>Person4:
                <input type="text" name="person4" 
                        onChange={(e) => setPlayers({...players, player4: e.target.value})}
                        value={players.player4}
                />
                <button id="p4" onClick={diceRoll}>Roll</button>
                {
                    scores.player4 ? <span>Score: {scores.player4}</span> : null
                }
            </label>
            <label>Person5:
                <input type="text" name="person5" 
                        onChange={(e) => setPlayers({...players, player5: e.target.value})}
                        value={players.player5}
                />
                <button id="p5" onClick={diceRoll}>Roll</button>
                {
                    scores.player5 ? <span>Score: {scores.player5}</span> : null
                }
            </label>

            <button onClick={findWinner}> End Game </button>

            {
                winnerScore && (
                    <div> 
                        <h1>Winner: {winner.join(",")}</h1>
                        <h1>Score: {winnerScore}</h1>
                    </div>
                )
            }
            
            <button onClick={reset}>Reset</button>
        </div>
    )
} 

export default DiceScreen;