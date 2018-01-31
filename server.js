// server.js
const express = require("express")
const MongoClient = require("mongodb").MongoClient
const bodyParser = require("body-parser")
const app = express()
const db = require("./config/db")
const port = 8000

app.use(bodyParser.urlencoded({ extended: true }))

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)

  // Add this line below to make it work with the new version of mongodb
  // (make sure you add the database name and not the collection name)
  database = database.db("canada-weather-api")

  require("./app/routes")(app, database)
  app.listen(port, () => {
    console.log("we are live on " + port)
  })
})
