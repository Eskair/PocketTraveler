const { MongoClient } = require("mongodb");
var fs = require("fs");
//const assert = require("assert");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const userInfo = [
  {
    _id: "homer@yahoo.com",
    userData: {
      first_name: "Homer",
      last_name: "Simpson",
      email: "homer@yahoo.com",
      password: "homer",
      isLoggedIn: "false",
    },
  },
  {
    _id: "bart@yahoo.com",
    userData: {
      first_name: "Bart",
      last_name: "Simpson",
      email: "bart@yahoo.com",
      password: "bart",
      isLoggedIn: "false",
    },
  },
  {
    _id: "lisa@yahoo.com",
    userData: {
      first_name: "Lisa",
      last_name: "Simpson",
      email: "lisa@yahoo.com",
      password: "lisa",
      isLoggedIn: "false",
    },
  },

  {
    _id: "willie@yahoo.com",
    userData: {
      first_name: "	William",
      last_name: "MacDougal",
      email: "willie@yahoo.com",
      password: "willie",
      isLoggedIn: "false",
    },
  },
];

const getData = async () => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    const db = client.db("WorldFactbook");
    console.log("connected!");
    const result = await db.collection("users").insertMany(userInfo);

    console.log(result.insertedCount, "Units Inserted");
  } catch (err) {
    console.log(err.stack);
  }
  client.close();
  console.log("disconnected!");
};

getData();
