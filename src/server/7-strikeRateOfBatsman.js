let jsonMatchesData = require("./matches.json");
let jsonDeliveriesData = require("./deliveries.json");
const fs = require("fs");

function strikeRateOfBatsman(array, array1) {
  return array.reduce((object, element) => {
    if (!object[element["season"]]) {
      //let matchId = element['id'];
      //creating object for eacah season
      object[element["season"]] = {};

      //calculating strike rate of batsman in particular season
      let strikeRate = {};
      array.map((obj) => {
        if (obj["season"] === element["season"]) {
          matchId = obj["id"];

          //checking deliveries file of scores
          array1.map((obj2) => {
            if (obj2["match_id"] === matchId) {
              if (!strikeRate[obj2["batsman"]]) {
                strikeRate[obj2["batsman"]] = {};

                strikeRate[obj2["batsman"]]["ball"] = 1;
                strikeRate[obj2["batsman"]]["runs"] = Math.floor(
                  obj2["batsman_runs"]
                );
                let rate =
                  (strikeRate[obj2["batsman"]]["runs"] /
                    strikeRate[obj2["batsman"]]["ball"]) *
                  100;
                strikeRate[obj2["batsman"]]["strike_rate"] = rate.toFixed(3);
              } else {
                strikeRate[obj2["batsman"]]["ball"]++;
                strikeRate[obj2["batsman"]]["runs"] += Math.floor(
                  obj2["batsman_runs"]
                );
                rate =
                  (strikeRate[obj2["batsman"]]["runs"] /
                    strikeRate[obj2["batsman"]]["ball"]) *
                  100;
                strikeRate[obj2["batsman"]]["strike_rate"] = rate.toFixed(3);
              }
            }
          });
        }
      });

      object[element["season"]] = strikeRate;
    }
    return object;
  }, {});
}

let strikeRateCount = strikeRateOfBatsman(jsonMatchesData, jsonDeliveriesData);
// console.log(strikeRateCount);
fs.writeFileSync(
  "src/public/output/7-strikeRateOfBatsman.json",
  JSON.stringify(strikeRateCount, null, 2),
  "utf-8",
  (error) => {
    if (error) {
      console.log(error);
    }
  }
);
