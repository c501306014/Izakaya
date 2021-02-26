// server.js
const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
const cors = require('cors');
const createError = require('http-errors');
const axios = require('axios');

app = express();
app.use(serveStatic(__dirname + "/dist"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

const port = process.env.PORT || 3000;
app.listen(port);
console.log('server started ' + port);


app.get('/search', function (req, res, next) {
  const search_bar = async function (stationPos) {
    // request to Hotpepper API
    let hotpepperAPI_key = "dd28cf82f92a25dc";
    let hotpepperURL = `http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${hotpepperAPI_key}&lat=${stationPos.Y}&lng=${stationPos.X}&free_drink=1&private_room=1&course=1range=2&count=100&order=1&format=json`;
    const hotpepperRes = await axios
      .get(hotpepperURL)
      .catch(err => {
        return res.status(400).send(err.response);
      });

    // response to frontend
    const shop_list = hotpepperRes["data"]["results"]["shop"];
    res.send({
      shop_list: shop_list
    });
  }

  const get_genre_master = async function(){
    let hotpepperAPI_key = "dd28cf82f92a25dc";
    let hotpepperURL = `http://webservice.recruit.co.jp/hotpepper/genre/v1/?key=${hotpepperAPI_key}`
    const hotpepperRes = await axios
    .get(hotpepperURL)
    .catch(err => {
      return res.status(400).send(err.response);
    });
    console.log(hotpepperRes["data"])
  }

  // main function
  function main() {
    // get_genre_master();
    search_bar(req.query);
  }
  main();
})
