const deliveriesFilePath = "src/data/deliveries.csv";
const matchesFilePath = "src/data/matches.csv";

const csv = require("csvtojson");
const fs = require("fs");

//Data Transfer

csv()
  .fromFile(deliveriesFilePath)
  .then((jsonObj1) => {
    // console.log(jsonObj1);
    fs.writeFileSync(
      "src/server/deliveries.json",
      JSON.stringify(jsonObj1, null, 2)
    ),
      (err) => {
        if (err) {
          throw err;
        }
      };
  });

csv()
  .fromFile(matchesFilePath)
  .then((jsonObj2) => {
    // console.log(jsonObj2)
    fs.writeFileSync(
      "src/server/matches.json",
      JSON.stringify(jsonObj2, null, 2)
    ),
      (err) => {
        if (err) {
          throw err;
        }
      };
  });
