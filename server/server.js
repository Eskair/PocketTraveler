const path = require("path");
const express = require("express");

const PORT = 8000;

express()
  .use(express.json())

  .get("/hello", (req, res) => {
    res.status(200).json({ hi: "hello world!" });
  })

  .listen(PORT, function () {
    console.info("🌍 Listening on port " + PORT);
  });
