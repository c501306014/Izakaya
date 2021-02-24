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
  function main() {
    search_bar(req.query.station_name, req.query.pref_name);
  }
  const search_bar = async function (station_name, pref_name) {
    console.log("1");
    // start 駅の座標を取得
    // 駅名と都道府県名をURL用に変換
    station_name = encodeURI(station_name);
    pref_name = encodeURI(pref_name);
    // heartrails APIをたたく
    const RailURL = `http://express.heartrails.com/api/json?method=getStations&name=${station_name}&prefecture=${pref_name}`;
    const RailRes = await axios
      .get(RailURL)
      .catch(err => {
        return err.response;
      })

    // リクエストされた駅が見つからなかった場合、bad requestとしてレスポンスを返して終了
    if ('error' in RailRes.data['response']){
      const err = new Error('0');
      return res.status(400).send({
        error: err.message,
        data: RailRes.data['response']
      });
    }
    else if (!RailRes.data['response']['station'].length) {
      const err = new Error('0');
      return res.status(400).send({
        error: err.message,
        data: RailRes.data['response']
      });
    }
    let X = 0;
    let Y = 0;
    X = RailRes.data['response']['station'][0]['x'];
    Y = RailRes.data['response']['station'][0]['y'];
    // end 駅の座標を取得
    console.log("2");
    // start 店のリストを取得
    let hotpepperAPI_key = "dd28cf82f92a25dc";
    let hotpepperURL = `http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${hotpepperAPI_key}&lat=${Y}&lng=${X}&free_drink=1&private_room=1&course=1range=2&count=100&order=1&format=json`;

    const hotpepperRes = await axios
      .get(hotpepperURL)
      .catch(err => {
        return res.status(400).send(err.response);
      });

    let shop_list = hotpepperRes["data"]["results"]["shop"];
    res.send({
      shop_list: shop_list
    });
    // end 店のリストを取得
    console.log("3");
  }
  
  main();
})
