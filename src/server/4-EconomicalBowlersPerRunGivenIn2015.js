// 4. Top 10 economical bowlers in the year 2015
let jsonMatchesData = require("./matches.json");
let jsonDeliveriesData = require("./deliveries.json");
const fs = require("fs");

//1st Approch using for loop
// function findEconomicalBowlersPerRunGivenIn2015(match, delivery) {
//   var bowlerPerRunGiven = {};
//   const matchID = new Set();
//   for (let index = 0; index < match.length; index++) {
//     var season = match[index].season;
//     if (season == 2015) {
//       matchID.add(match[index].id);
//     }
//   }
//   for (let index = 0; index < delivery.length; index++) {
//     let deliveryId = delivery[index].match_id;
//     if (matchID.has(deliveryId)) {
//       if (bowlerPerRunGiven[delivery[index].bowler]) {
//         bowlerPerRunGiven[delivery[index].bowler]["runs"] += Number(
//           delivery[index].total_runs
//         );
//         bowlerPerRunGiven[delivery[index].bowler]["balls"] += 1;
//       } else {
//         bowlerPerRunGiven[delivery[index].bowler] = {};
//         bowlerPerRunGiven[delivery[index].bowler]["runs"] = Number(
//           delivery[index].total_runs
//         );
//         bowlerPerRunGiven[delivery[index].bowler]["balls"] = 1;
//       }
//     }
//   }
//   let economyOfBowler = {};
//   for (index in bowlerPerRunGiven) {
//     economyOfBowler[index] =
//       (Number(bowlerPerRunGiven[index].runs) /
//         Number(bowlerPerRunGiven[index].balls)) *
//       6;
//   }
//   // console.log(economyOfBowler);
//   let top10EconomicalPlayer = [];
//   //finds the bowler with minimum economy
//   function findMinEconomyBowler(economy) {
//     let min = 99999;
//     let result = "";
//     for (index in economy) {
//       if (economy[index] < min) {
//         min = economy[index];
//         result = index;
//       }
//     }
//     return result;
//   }
//   // loop runs 10 times so that 10 time a minimum economical player can be found and removed
//   //from the original array
//   for (let index = 0; index < 10; index++) {
//     let result = findMinEconomyBowler(economyOfBowler);
//     top10EconomicalPlayer.push(result);
//     delete economyOfBowler[result];
//   }
//   // console.log(top10EconomicalPlayer)
//   return top10EconomicalPlayer;
// }

//2nd approch using HOF

let economyOfBowler = (array1, array) => {
  //getting id for year 2015
  let idArray = [];
  array1.map((value) => {
    if (value["season"] == "2015") {
      idArray.push(Math.floor(value["id"]));
    }
  });

  // up here idArray[0] = 518 and idArray[aiArray.length -1] = 576
  let runsAndBalls = array.reduce((object, element) => {
    //checking data for year 2015 only
    if (
      Math.floor(element["match_id"]) >= 518 &&
      Math.floor(element["match_id"]) <= 576
    ) {
      //if bowler is not in object
      if (!object[element["bowler"]]) {
        let ball = 0,
          runs = 0,
          eco,
          over;
        //traversing the array to find data for the bowler in 2015
        let playerEconomy = array.reduce((object2, element2) => {
          if (
            Math.floor(element2["match_id"]) >= 518 &&
            Math.floor(element2["match_id"]) <= 576
          ) {
            if (element2["bowler"] === element["bowler"]) {
              //checking ball must not be a wide ball or no ball
              if (
                element2["wide_runs"] === "0" &&
                element2["noball_runs"] === "0"
              ) {
                ball++;
              }
              runs += Math.floor(element2["total_runs"]);
              over = Math.floor(ball / 6);
              eco = runs / over;
              //object2['runs'] = runs;
              //object2['ball'] = ball;
              object2["economy"] = Math.round(eco * 100) / 100;
            }
          }
          //object2 will return economy of a particular bowler
          return object2;
        }, {});
        //assigning economy against bowler name
        object[element["bowler"]] = playerEconomy.economy;
      }
    }
    //returning object with bowler name and his economy
    return object;
  }, {});

  //***sorting the object
  const sortedEconomy = Object.fromEntries(
    Object.entries(runsAndBalls).sort(([, a], [, b]) => a - b)
  );

  //*** slicing top 10 bowlers*/
  const topTen = Object.fromEntries(Object.entries(sortedEconomy).slice(0, 10));

  return topTen;
  //return sortedEconomy;
  //return runsAndBalls;
};

let economicalBowlerCount = economyOfBowler(
  jsonMatchesData,
  jsonDeliveriesData
);
// console.log(economicalBowlerCount);
fs.writeFileSync(
  "src/public/output/4-economicalBowlersPerRunGivenIn2015.json",
  JSON.stringify(economicalBowlerCount, null, 2),
  "utf-8",
  (error) => {
    if (error) {
      console.log(error);
    }
  }
);
