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
              countries[key].data.people?.population_growth_rate.growth_rate,
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
          sex_ratio: {
            sex_ratio:
              countries[key].data.people?.sex_ratio?.total_population.value,
            units:
              countries[key].data.people?.sex_ratio?.total_population.units,
            title: "Sex Ratio males/females",
            graphType: "worldFacts",
          },
          maternal_mortality_rate: {
            maternal_mortality_rate:
              countries[key].data.people?.maternal_mortality_rate
                ?.deaths_per_100k_live_births,
            units: "Deaths Per 100k Live Births",
            title: "Maternal Mortality Rate",
            graphType: "worldFacts",
          },
          infant_mortality_rate: {
            infant_mortality_rate:
              countries[key].data.people?.infant_mortality_rate?.total?.value,
            units: "Deaths Per 1000 Live Births",
            title: "Infant Mortality Rate",
            graphType: "worldFacts",
          },
          life_expectancy_at_birth: {
            life_expectancy_at_birth:
              countries[key].data.people?.life_expectancy_at_birth
                ?.total_population?.value,
            units: "Years",
            title: "Life Expectancy at Birth",
            graphType: "worldFacts",
          },
          hospital_bed_density: {
            hospital_bed_density:
              countries[key].data.people?.hospital_bed_density
                ?.beds_per_1000_population,
            units: "Beds Per 1000 Population",
            title: "Hospital Bed Density",
            graphType: "worldFacts",
          },
          adult_obesity: {
            adult_obesity:
              countries[key].data.people?.adult_obesity?.percent_of_adults,
            units: "%",
            title: "Adult Obesity",
            graphType: "worldFacts",
          },
          literacy: {
            literacy:
              countries[key].data.people?.literacy?.total_population.value,
            units: "%",
            title: "Literacy",
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
                ?.per_capita_purchasing_power_parity?.annual_values[0].value,
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
          background: {
            background: countries[key].data.introduction.background,
            units: "",
            title: "Background",
            graphType: "countryProfile",
          },
          location: {
            location: countries[key].data.geography.location,
            units: "",
            title: "Background",
            graphType: "countryProfile",
          },
          climate: {
            climate: countries[key].data.geography.climate,
            units: "",
            title: "Climate",
            graphType: "countryProfile",
          },
          natural_resources: {
            natural_resources:
              countries[key].data.geography.natural_resources?.resources,
            units: "",
            title: "Natural Resources",
            graphType: "countryProfile",
          },
          natural_hazards: {
            natural_hazards: countries[key].data.geography.natural_hazards,
            units: "",
            title: "Natural Hazards",
            graphType: "countryProfile",
          },
          environment: {
            environment:
              countries[key].data.geography.environment.current_issues,
            units: "",
            title: "Natural Hazards",
            graphType: "countryProfile",
          },
          languages: {
            languages: countries[key].data.people?.languages.language,
            units: "%",
            title: "Languages",
            graphType: "donut",
          },
          religions: {
            religion: countries[key].data.people?.religions?.religion,
            units: "%",
            title: "Religion",
            graphType: "donut",
          },
          country_name: {
            country_name: countries[key].data.government.country_name,
            units: "",
            title: "Country Name",
            graphType: "countryProfile",
          },
          government_type: {
            government_type: countries[key].data.government.government_type,
            units: "",
            title: "Country Name",
            graphType: "countryProfile",
          },
          capital: {
            capital: countries[key].data.government.capital,
            units: "",
            title: "Capital",
            graphType: "countryProfile",
          },
          national_holidays: {
            national_holidays: countries[key].data.government.national_holidays,
            units: "",
            title: "National Holidays",
            graphType: "countryProfile",
          },
          national_symbol: {
            national_symbol: countries[key].data.government.national_symbol,
            units: "",
            title: "National Symbol",
            graphType: "countryProfile",
          },
          national_anthem: {
            national_anthem: countries[key].data.government.national_anthem,
            units: "",
            title: "National Anthem",
            graphType: "countryProfile",
          },
        },
      });
    }
  });
});

const getData = async () => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    const db = client.db("WorldFactbook");
    console.log("connected!");
    const result = await db.collection("2020").insertMany(countrInfo);

    console.log(result.insertedCount, "Units Inserted");
  } catch (err) {
    console.log(err.stack);
  }
  client.close();
  console.log("disconnected!");
};

getData();
