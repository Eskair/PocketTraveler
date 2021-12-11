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
const { countries } = require("./data/2020-09-21_factbook.json");

const countrInfo = [];

ISO_names.forEach((country) => {
  const { CIA_key, name, alpha_3, country_code } = country;
  Object.keys(countries).forEach((key) => {
    if (key === CIA_key) {
      countrInfo.push({
        alpha_3: alpha_3,
        country_code: country_code,
        name: name,
        shortname:
          countries[key].data.government.country_name.conventional_short_form,
        area: countries[key].data.geography.area.total.value,
      });
    }
  });
});

const getData = async () => {
  x = [];
  countrInfo.map((item) => {
    return x.push(parseInt(item.area));
  });

  y = x.sort((a, b) => {
    return b - a;
  });
  console.log(y[0], y[y.length - 3]);
};

getData();
