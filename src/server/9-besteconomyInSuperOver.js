let jsonDeliveriesData = require("./deliveries.json");
const fs = require("fs");

function economyInSuperOver(array) {
  let bowler = {};
  //let economy = {};
  array.map((obj) => {
    if (obj["is_super_over"] === "1") {
      if (!bowler[obj["bowler"]]) {
        bowler[obj["bowler"]] = {};
        bowler[obj["bowler"]]["ball"] = 1;
        bowler[obj["bowler"]]["over"] = 1;
        bowler[obj["bowler"]]["runs"] = Math.floor(obj["total_runs"]);
        let eco = bowler[obj["bowler"]]["runs"] / bowler[obj["bowler"]]["over"];
        bowler[obj["bowler"]]["economy"] = eco.toFixed(3);
      } else {
        //checking ball must not be a wide ball or no ball
        if (obj["wide_runs"] === "0" && obj["noball_runs"] === "0") {
          bowler[obj["bowler"]]["ball"]++;
        }
        bowler[obj["bowler"]]["over"] = Math.ceil(
          bowler[obj["bowler"]]["ball"] / 6
        );
        bowler[obj["bowler"]]["runs"] += Math.floor(obj["total_runs"]);
        eco = bowler[obj["bowler"]]["runs"] / bowler[obj["bowler"]]["over"];
        bowler[obj["bowler"]]["economy"] = eco.toFixed(3);
      }
    }
  });

  //accessing player with best economy match
  bestEconomyPlayer = Object.keys(bowler).reduce((a, b) =>
    Math.floor(bowler[a]["economy"]) < Math.floor(bowler[b]["economy"]) ? a : b
  );

  //if multiple players have same economy
  let forMultiPlayer = [];
  Object.keys(bowler).map((ele) => {
    if (bowler[ele]["economy"] === bowler[bestEconomyPlayer]["economy"]) {
      forMultiPlayer.push(ele);
    }
  });

  return forMultiPlayer;
  //return bestEconomyPlayer;
  //return bowler;
}

let superOverEconomyCount = economyInSuperOver(jsonDeliveriesData);
// console.log(superOverEconomyCount);
fs.writeFileSync(
  "src/public/output/9-economyInSuperOver.json",
  JSON.stringify(superOverEconomyCount, null, 2),
  "utf-8",
  (error) => {
    if (error) {
      console.log(error);
    }
  }
);
