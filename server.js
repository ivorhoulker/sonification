const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});

app.get("/api/covid", (req, res) => {
  fetch("https://covid-api.mmediagroup.fr/v1/cases")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => console.log());
});

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
