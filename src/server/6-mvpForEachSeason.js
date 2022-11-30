// // 6. Find a player who has won the highest number of Player of the Match awards for each season

let jsonMatchesData = require("./matches.json");
const fs = require("fs");

// function
function playerOfTheMatch(array) {
  return array.reduce((object, element) => {
    //defining object for each season
    if (!object[element["season"]]) {
      object[element["season"]] = {};

      let player = {};
      //map function to count player of the match won by players in a particular season
      array.map((object2) => {
        if (object2["season"] === element["season"]) {
          if (!player[object2["player_of_match"]]) {
            player[object2["player_of_match"]] = 1;
          } else {
            player[object2["player_of_match"]]++;
          }
        }
      });

      //accessing player with highest player of match
      highestScorer = Object.keys(player).reduce((a, b) =>
        player[a] > player[b] ? a : b
      );

      //if multiple players have same number of player of match
      let forSameCount = [];
      Object.keys(player).map((ele) => {
        if (player[ele] === player[highestScorer]) {
          forSameCount.push(ele);
          //forSameCount[ele] = player[ele];
        }
      });

      //storing value in object
      object[element["season"]] = forSameCount;
    }
    return object;
  }, {});
}

let playerOfMatchCount = playerOfTheMatch(jsonMatchesData);
// console.log(playerOfMatchCount);
fs.writeFileSync(
  "src/public/output/6-playerOfTheMatch.json",
  JSON.stringify(playerOfMatchCount, null, 2),
  "utf-8",
  (error) => {
    if (error) {
      console.log(error);
    }
  }
);
