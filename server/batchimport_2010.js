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
const { countries } = require("./data/2010-12-27_factbook.json");

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
        data: {
          population: {
            population: countries[key].data.people?.population.total,
            title: "Total Population",
            units: "Inhabitants",
            graphType: "worldFacts",
          },
          medianAge: {
            medianAge: countries[key].data.people?.median_age?.total.value,
            title: "Median Age",
            units: "Years",
            graphType: "worldFacts",
          },
          population_growth_rate: {
            population_growth_rate:
              countries[key].data.people?.population_growth_rate?.growth_rate,
            title: "Population Growth Rate",
            units: "%",
            graphType: "worldFacts",
          },
          birth_rate: {
            birth_rate:
              countries[key].data.people?.birth_rate
                ?.births_per_1000_population,
            title: "Birth Rate",
            units: "Birth Per 1000 Population",
            graphType: "worldFacts",
          },
          death_rate: {
            death_rate:
              countries[key].data.people?.death_rate
                ?.deaths_per_1000_population,
            title: "Death Rate",
            units: "Deaths Per 1000 Population",
            graphType: "worldFacts",
          },

          adult_obesity: {
            adult_obesity:
              countries[key].data.people?.adult_obesity?.percent_of_adults,
            units: "%",
            title: "Adult Obesity",
            graphType: "worldFacts",
          },

          gdp: {
            gdp: countries[key].data.economy.gdp?.purchasing_power_parity
              ?.annual_values?.[0]?.value,
            units: "USD",
            title: "GDP PPP",
            graphType: "worldFacts",
          },
          gdpPc: {
            gdpPc:
              countries[key].data.economy.gdp
                ?.per_capita_purchasing_power_parity?.annual_values[0]?.value,
            units: "USD",
            title: "GDP Per Capita PPP",
            graphType: "worldFacts",
          },
          real_growth_rate: {
            real_growth_rate:
              countries[key].data.economy.gdp?.real_growth_rate
                ?.annual_values?.[0].value,
            units: "%",
            title: "Real Growth Rate",
            graphType: "worldFacts",
          },
          labor_force: {
            labor_force:
              countries[key].data.economy.labor_force?.total_size?.total_people,
            units: "People",
            title: "Labor Force",
            graphType: "worldFacts",
          },
          carbon_dioxide_emissions: {
            carbon_dioxide_emissions:
              countries[key].data.energy
                ?.carbon_dioxide_emissions_from_consumption_of_energy
                ?.megatonnes,
            units: "Megatonnes",
            title: "Carbon Dioxide Emissions",
            graphType: "worldFacts",
          },
          mobile_cellular: {
            mobile_cellular:
              countries[key].data.communications?.telephones?.mobile_cellular
                ?.subscriptions_per_one_hundred_inhabitants,
            units: "Subscriptions / 100 Inhabitants",
            title: "Mobile Phones Subscriptions",
            graphType: "worldFacts",
          },
        },
      });
    }
  });
});

const getData = async () => {
  // console.log(countrInfo[0].data.gdpPc);
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    const db = client.db("WorldFactbook");
    console.log("connected!");
    const result = await db.collection("2010").insertMany(countrInfo);

    console.log(result.insertedCount, "Units Inserted");
  } catch (err) {
    console.log(err.stack);
  }
  client.close();
  console.log("disconnected!");
};

getData();
