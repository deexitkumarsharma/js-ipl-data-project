// 1. logic for number of matches played per year for all the years in IPL.
let jsonMatchesData = require("./matches.json");
const fs = require("fs");

// 1st Approch

// function matchesPlayedPerYear() {
//   let matchesPerYear = {};
//   for (let index = 0; index < match.length; index++) {
//     if (matchesPerYear[match[index].season]) {
//       matchesPerYear[match[index].season]++;
//     } else {
//       matchesPerYear[match[index].season] = 1;
//     }
//   }
//   return matchesPerYear;
// }

//2nd Approch Using HOF

let matchesPerYear = (array) => {
  return array.reduce(function (obj, element) {
    if (!obj[element["season"]]) {
      obj[element["season"]] = 1;
    } else {
      obj[element["season"]]++;
    }
    return obj;
  }, {});
};

let matchCount = matchesPerYear(jsonMatchesData);
// console.log(matchCount);
fs.writeFileSync(
  "src/public/output/1-matchesPlayedPerYear.json",
  JSON.stringify(matchCount, null, 2),
  "utf-8",
  (error) => {
    if (error) {
      console.log(error);
    }
  }
);
