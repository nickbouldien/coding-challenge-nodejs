const express = require('express')
const fetch = require("node-fetch");
const port = 5000;
var app = express();

app.use(express.static('public'))

app.get(`/api/weather`, async (request, response, next) => {
  response.json('{}')
});

app.listen(port, () => {
  console.log(`Good job, the Test App is now running.`)
  console.log(`Good luck! We know you got this!`)
})


