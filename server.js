// server.js
const express = require("express")
const MongoClient = require("mongodb").MongoClient
const bodyParser = require("body-parser")
const app = express()
const db = require("./config/db")
const port = 8000

app.use(bodyParser.urlencoded({ extended: true }))

require("./app/routes")(app, {})

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
  database = database.db("notes")
  require("./app/routes")(app, database)
  app.listen(port, () => {
    console.log("we are live on " + port)
  })
})
