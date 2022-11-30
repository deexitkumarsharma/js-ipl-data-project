// 2. logic for number of matches won per team per year in IPL.
let jsonMatchesData = require("./matches.json");
const fs = require("fs");

// 1st Approch

// function findMatchesWonPerTeamPerYear(match) {
//   // key = team name, value as another object with keys as years and values as no of matches won
//   let matchesWonPerTeamPerYear = {};

//   //iterates over match object array check if it has the key winner team name
//   //checks if matchesWonPerTeamPerYear has a key on team and adds an object with season as key and count of wins in that particular season

//   for (let index = 0; index < match.length; index++) {
//     if (matchesWonPerTeamPerYear[match[index]["winner"]]) {
//       if (
//         matchesWonPerTeamPerYear[match[index]["winner"]][
//           match[index]["season"]
//         ] >= 1
//       ) {
//         matchesWonPerTeamPerYear[match[index]["winner"]][
//           match[index]["season"]
//         ]++;
//       } else {
//         // matchesWonPerTeamPerYear[match[index]["winner"]]={};
//         matchesWonPerTeamPerYear[match[index]["winner"]][
//           match[index]["season"]
//         ] = 1;
//       }
//     } else {
//       matchesWonPerTeamPerYear[match[i]["winner"]] = {};
//       matchesWonPerTeamPerYear[match[i]["winner"]][match[i]["season"]] = 1;
//     }
//   }
//   return matchesWonPerTeamPerYear;
//   //console.log(matchesWonPerTeamPerYear);
// }

//2nd approach using HOF

let matchesWonPerTeamPerYear = (array) => {
  return array.reduce((obj, element) => {
    if (!obj[element["season"]]) {
      obj[element["season"]] = {};

      let winnerObj = array.reduce((obj2, ele2) => {
        //checking for each year
        if (ele2["season"] === element["season"]) {
          //creating object for per year
          if (!obj2[ele2["winner"]]) {
            obj2[ele2["winner"]] = 1;
          } else {
            obj2[ele2["winner"]]++;
          }
        }
        return obj2;
      }, {});
      //adding winning data to corosponding year
      obj[element["season"]] = winnerObj;
    }
    return obj;
  }, {});
};

let winCount = matchesWonPerTeamPerYear(jsonMatchesData);
// console.log(winCount);
fs.writeFileSync(
  "src/public/output/2-matchesWonPerTeamPerYear.json",
  JSON.stringify(winCount, null, 2),
  "utf-8",
  (error) => {
    if (error) {
      console.log(error);
    }
  }
);
