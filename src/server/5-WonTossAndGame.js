// 5. Find the number of times each team won the toss and also won the match

let jsonMatchesData = require("./matches.json");
const fs = require("fs");

function findWonTossAndGame(match) {
  let wonTossAndGame = {};
  // team name = key and value = total count of won where both toss and match happens

  for (let index = 0; index < match.length; index++) {
    // iterating over matches object array
    if (match[index].toss_winner === match[index].winner) {
      if (wonTossAndGame[match[index].winner]) {
        //checking if tosswinner is the winner of the game then increment the value
        wonTossAndGame[match[index].winner]++;
      } else {
        wonTossAndGame[match[index].winner] = 1;
      }
    }
  }
  // console.log(wonTossAndGame;
  delete wonTossAndGame[""]; // to remove undefined
  return wonTossAndGame;
}

let wonTossAndGame = findWonTossAndGame(jsonMatchesData);
// console.log(wonTossAndGame);
fs.writeFileSync(
  "src/public/output/5-wonTossAndGame.json",
  JSON.stringify(wonTossAndGame, null, 2),
  "utf-8",
  (error) => {
    if (error) {
      console.log(error);
    }
  }
);
