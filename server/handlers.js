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

const getCountryInfoByYear = async (req, res) => {
  const { clickedCountry } = req.params;
  const alpha_3 = clickedCountry;

  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    const db = client.db("WorldFactbook");
    console.log("connected!");
    const data2007 = await db.collection("2007").findOne({ alpha_3 });
    const data2008 = await db.collection("2008").findOne({ alpha_3 });
    const data2009 = await db.collection("2009").findOne({ alpha_3 });
    const data2010 = await db.collection("2010").findOne({ alpha_3 });
    const data2011 = await db.collection("2011").findOne({ alpha_3 });
    const data2012 = await db.collection("2012").findOne({ alpha_3 });
    const data2013 = await db.collection("2013").findOne({ alpha_3 });
    const data2014 = await db.collection("2014").findOne({ alpha_3 });
    const data2015 = await db.collection("2015").findOne({ alpha_3 });
    const data2016 = await db.collection("2016").findOne({ alpha_3 });
    const data2017 = await db.collection("2017").findOne({ alpha_3 });
    const data2018 = await db.collection("2018").findOne({ alpha_3 });
    const data2019 = await db.collection("2019").findOne({ alpha_3 });
    const data2020 = await db.collection("2020").findOne({ alpha_3 });

    const arrYears = [
      data2007,
      data2008,
      data2009,
      data2010,
      data2011,
      data2012,
      data2013,
      data2014,
      data2015,
      data2016,
      data2017,
      data2018,
      data2019,
      data2020,
    ];

    const yearsPopulation = [];
    const yearsMedianAge = [];
    const yearsPopulation_growth_rate = [];
    const yearsAdult_obesity = [];
    const yearsGdp = [];
    const yearsGdpPc = [];
    const yearsReal_growth_rate = [];
    const yearsCarbon_dioxide_emissions = [];
    const yearsMobile_cellular = [];

    arrYears.forEach((element) => {
      const {
        data: {
          population: { population },
          medianAge: { medianAge },
          population_growth_rate: { population_growth_rate },
          adult_obesity: { adult_obesity },
          gdp: { gdp },
          gdpPc: { gdpPc },
          real_growth_rate: { real_growth_rate },
          carbon_dioxide_emissions: { carbon_dioxide_emissions },
          mobile_cellular: { mobile_cellular },
        },
      } = element;

      yearsPopulation.push(population);
      yearsMedianAge.push(medianAge);
      yearsPopulation_growth_rate.push(population_growth_rate);
      yearsAdult_obesity.push(adult_obesity);
      yearsGdp.push(gdp);
      yearsGdpPc.push(gdpPc);
      yearsReal_growth_rate.push(real_growth_rate);
      yearsCarbon_dioxide_emissions.push(carbon_dioxide_emissions);
      yearsMobile_cellular.push(mobile_cellular);
    });

    if (data2020) {
      res.status(200).json({
        status: 200,
        countryDataByYear: {
          yearsPopulation,
          yearsMedianAge,
          yearsPopulation_growth_rate,
          yearsAdult_obesity,
          yearsGdp,
          yearsGdpPc,
          yearsReal_growth_rate,
          yearsCarbon_dioxide_emissions,
          yearsMobile_cellular,
        },
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

module.exports = {
  getCategories,
  getCountry,
  getCountryInfo,
  getCountryInfoByYear,
};
