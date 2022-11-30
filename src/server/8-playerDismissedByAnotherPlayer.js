let jsonDeliveriesData = require("./deliveries.json");
const fs = require("fs");

function playerDismissedByAnotherPlayer(array) {
  return array.reduce((object, element) => {
    if (element["palyer_dismissed"] !== "") {
      if (!object[element["player_dismissed"]]) {
        object[element["player_dismissed"]] = {};

        let disPlayer = {};
        array.map((object2) => {
          if (object2["player_dismissed"] === element["player_dismissed"]) {
            if (!disPlayer[object2["bowler"]]) {
              disPlayer[object2["bowler"]] = 1;
            } else {
              disPlayer[object2["bowler"]]++;
            }
          }
        });
        //BELOW COMMENTED CODE IS ALSO WORKING

        //finding which player dismissed another player highest number of times
        HightCountPlayer = Object.keys(disPlayer).reduce((a, b) =>
          disPlayer[a] > disPlayer[b] ? a : b
        );

        //storing value
        object[element["player_dismissed"]] = HightCountPlayer;

        // //showing how many times a palyers is dismissed by another player
        // object[element['player_dismissed']] = disPlayer;
      }
      return object;
    }
  }, {});
}

let playerDismissedCount = playerDismissedByAnotherPlayer(jsonDeliveriesData);
// console.log(playerDismissedCount);
fs.writeFileSync(
  "src/public/output/8-playerDismissedCount.json",
  JSON.stringify(playerDismissedCount, null, 2),
  "utf-8",
  (error) => {
    if (error) {
      console.log(error);
    }
  }
);
