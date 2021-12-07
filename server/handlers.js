"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// const { v4: uuidv4 } = require("uuid");

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

module.exports = {
  getCategories,
  getCountry,
};
