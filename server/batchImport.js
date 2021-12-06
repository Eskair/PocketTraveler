const { MongoClient } = require("mongodb");
var fs = require("fs");
//const assert = require("assert");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { ISO_names } = require("./data/ISO_country_names.js");
const { countries } = require("./data/2020-09-21_afghanistan.json");
//console.log(Object.keys(countries));
const countrInfo = [];

const getData = () => {
  ISO_names.forEach((country) => {
    const { CIA_key, name, alpha_3, country_code } = country;
    Object.keys(countries).forEach((key) => {
      if (key === CIA_key) {
        countrInfo.push({
          name: name,
          alpha_3: alpha_3,
          country_code: country_code,
          data: { graphType: "worldFacts" },
        });
      }
    });

    // if (Object.keys(countries) === CIA_key) {
    //   console.log("BSBSBSB");
    // }
  });
  console.log(countrInfo);
};

// const getData = async () => {
//   const client = new MongoClient(MONGO_URI, options);
//   await client.connect();
//   try {
//     const db = client.db("SlingAir");
//     console.log("connected!");
//     const result = await db.collection("flights").insertMany(flightsInfo);
//     const result1 = await db.collection("reservation").insertMany(reservations);
//     console.log(result.insertedCount, "Units Inserted");
//   } catch (err) {
//     console.log(err.stack);
//   }
//   client.close();
//   console.log("disconnected!");
// };

getData();
