"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;
const { REACT_APP_API_KEY } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getCategories = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    const db = client.db("WorldFactbook");
    console.log("connected!");
    const categoriesArr = await db.collection("2020").find().toArray();
    const categories = [];

    const arrData = categoriesArr[0].data;
    const arrDatakeys = Object.keys(arrData);

    arrDatakeys.forEach((cat) => {
      let x = arrData[cat];
      if (x.graphType === "worldFacts") {
        categories.push({ [cat]: `${x.title} ` });
      }
    });
    if (categories.length > 0) {
      res.status(200).json({
        status: 200,
        categories: categories,
        message: `${categories.length} Categories Available`,
      });
    } else {
      res.status(404).json({ status: 404, message: "Categories Found" });
    }
  } catch (err) {
    console.log(err.stack);
  }
  client.close();
  console.log("disconnected!");
};

const getCountry = async (req, res) => {
  const { categoryKey } = req.params;
  console.log(categoryKey);

  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    const db = client.db("WorldFactbook");
    console.log("connected!");
    const categoryArr = await db.collection("2020").find().toArray();
    const categoryData = [];

    categoryArr.forEach((cat) => {
      if (cat.data[categoryKey].graphType === "worldFacts") {
        categoryData.push({
          id: `${cat.alpha_3}`,
          name: `${cat.name}`,
          shortname: `${cat.shortname}`,
          val: `${cat.data[categoryKey][categoryKey]}`,
          units: `${cat.data[categoryKey].units}`,
        });
      }
    });

    if (categoryData.length > 0) {
      res.status(200).json({
        status: 200,
        categoryData: categoryData,
        message: "Categories Available",
      });
    } else {
      res.status(404).json({ status: 404, message: "Categories Not Found" });
    }
  } catch (err) {
    console.log(err.stack);
  }
  client.close();
  console.log("disconnected!");
};

const getCountryInfo = async (req, res) => {
  const { clickedCountry } = req.params;

  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    const db = client.db("WorldFactbook");
    console.log("connected!");
    const countryArr = await db.collection("2020").find().toArray();

    const countryData = [];

    countryArr.forEach((count) => {
      const {
        population,
        medianAge,
        gdp,
        gdpPc,
        real_growth_rate,
        background,
        location,
        climate,
        natural_resources,
        natural_hazards,
        environment,
        languages,
        religion,
        country_name,
        government_type,
        capital,
        national_holidays,
        national_symbol,
        national_anthem,
      } = count.data;

      if (count.alpha_3 === clickedCountry) {
        countryData.push({
          id: `${count.alpha_3}`,
          name: `${count.name}`,
          shortname: `${count.shortname}`,
          area: `${count.area}`,
          latitude: `${count.latitude.latitude}`,
          latitudeHem: `${count.latitude.hemisphere}`,
          longitude: `${count.longitude.longitude}`,
          longitudeHem: `${count.longitude.hemisphere}`,
          population,
          medianAge,
          gdp,
          gdpPc,
          real_growth_rate,
          background,
          location,
          climate,
          natural_resources,
          natural_hazards,
          environment,
          languages,
          religion,
          country_name,
          government_type,
          capital,
          national_holidays,
          national_symbol,
          national_anthem,
        });
      }
    });

    if (countryData.length > 0) {
      res.status(200).json({
        status: 200,
        countryData: countryData,
        message: "Data Available",
      });
    } else {
      res.status(404).json({ status: 404, message: "Country Not Found" });
    }
  } catch (err) {
    console.log(err.stack);
  }
  client.close();
  console.log("disconnected!");
};
// const getApiKey = async (req, res) => {
//   const key = REACT_APP_API_KEY;

//   try {
//     res.status(200).json({
//       status: 200,
//       key: key,
//       message: "Google Key Categories Available",
//     });
//   } catch (err) {
//     console.log(err.stack);
//   }
// };
module.exports = {
  getCategories,
  getCountry,
  getCountryInfo,
  // getApiKey,
};
