const cors = require('cors');
const express = require('express')
const fetch = require("node-fetch");

const port = 5000;
const app = express();

app.use(cors());

app.use(express.static('public'))

app.get(`/api/weather/:locationId`, async (req, res, next) => {
  // the default ("2487956") is for san fransisco, CA
  let location = req.params.locationId || "2487956";
  let response = {
    payload: null,
    message: "",
    statusCode: null,
  };

  try {
    const r = await fetch(`https://www.metaweather.com/api/location/${location}`)

    response.statusCode = r.status;
    const data = await r.json();

    response = {
      ...response,
      payload: formatResponseData(data),
      message: "success",
    }
  } catch(err) {
    console.error("err fetching data from the api: ", err);

    response = {
      ...response,
      payload: null,
      message: "There was an error fetching the data from the weather api.",
    }
  }

  res.json(response);
});

app.listen(port, () => {
  console.log(`Good job, the Test App is now running on port: ${port}.`)
  console.log(`Good luck! We know you got this!`)
})

function formatResponseData(data) {
  let formattedData = {
    coordinates: data.latt_long.split(", "),
    forecast: data.consolidated_weather,
    time: data.time,
    title: data.title,
    woeid: data.woeid,
  }

  return formattedData;
}
