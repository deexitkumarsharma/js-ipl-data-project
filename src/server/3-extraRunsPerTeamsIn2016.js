// 3 Extra runs conceded per team in the year 2016

let jsonMatchesData = require("./matches.json");
let jsonDeliveriesData = require("./deliveries.json");
const fs = require("fs");

//1st Approch

// function extraRunsPerTeamsIn2016(match, delivery) {
//   var teamPerExtraRuns = {};
//   const matchId = new Set();
//   for (let i = 0; i < match.length; i++) {
//     let season = match[i].season; // extraction of match id played in 2016
//     if (season == 2016) {
//       matchId.add(match[i].id);
//     }
//   }
//   // team with extraruns
//   // iterates over the delivery array and adds the extra runs for the particular team
//   for (let i = 0; i < delivery.length; i++) {
//     if (matchId.has(delivery[i].match_id)) {
//       // console.log(delivery[i].match_id)
//       let battingTeam = delivery[i].batting_team;
//       if (!teamPerExtraRuns.hasOwnProperty(battingTeam)) {
//         teamPerExtraRuns[battingTeam] = delivery[i].extra_runs;
//       } else {
//         teamPerExtraRuns[battingTeam] =
//           parseInt(teamPerExtraRuns[battingTeam]) +
//           parseInt(delivery[i].extra_runs);
//       }
//     }
//   }

//   return teamPerExtraRuns;
// }

//2nd Approach using HOF

let extraRunsPerTeam = (array1, array2) => {
  return array1.reduce((obj, element) => {
    if (element["season"] === "2016") {
      let matchId = element["id"];

      //creating object for year 2016
      if (!obj[element["season"]]) {
        obj[element["season"]] = {};
      }

      //calculating extra runs per match for each team
      let extraRuns = array2.reduce((obj2, ele2) => {
        if (ele2["match_id"] === matchId) {
          if (!obj2[ele2["bowling_team"]]) {
            obj2[ele2["bowling_team"]] = Math.floor(ele2["extra_runs"]);
          } else {
            obj2[ele2["bowling_team"]] += Math.floor(ele2["extra_runs"]);
          }
        }
        return obj2;
      }, {});
      //pusing extra run of each match corosponding to relative team
      let extraRunkeys = Object.keys(extraRuns);
      extraRunkeys.map((key) => {
        if (!obj[element["season"]][key]) {
          obj[element["season"]][key] = extraRuns[key];
        } else {
          obj[element["season"]][key] += extraRuns[key];
        }
      });
    }
    return obj;
  }, {});
};

let extraRunCount = extraRunsPerTeam(jsonMatchesData, jsonDeliveriesData);
// console.log(extraRunCount);
fs.writeFileSync(
  "src/public/output/3-extraRunsPerTeamsIn2016.json",
  JSON.stringify(extraRunCount, null, 2),
  "utf-8",
  (error) => {
    if (error) {
      console.log(error);
    }
  }
);
