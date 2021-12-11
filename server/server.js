"use strict";

const express = require("express");
const morgan = require("morgan");
const {
  getCategories,
  getCountry,
  getCountryInfo,
  getApiKey,
} = require("./handlers");
const PORT = 8000;

express()
  .use(morgan("tiny"))
  .use(express.json())

  .use(express.static("public"))

  .get("/api/worldbook-categories", getCategories) // api to get a list of categories for CategoriesWF.js
  .get("/api/worldbook-category/:categoryKey", getCountry) // api to get a single country data acc. to category key
  .get("/api/worldbook-country/:clickedCountry", getCountryInfo) // api to get a single country data acc. to clicked country
  // .get("/api/google-maps", getApiKey) // api to get a Google Maps Key

  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(PORT, function () {
    console.info("🌍 Listening on port " + PORT);
  });
