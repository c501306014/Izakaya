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
  const search_bar = async function (station_name, pref_name, search_start) {
    // start 駅の座標を取得
    // 駅名と都道府県名をURL用に変換
    let err = null;
    let station_name_URI = encodeURI(station_name);
    let pref_name_URI = encodeURI(pref_name);
    // heartrails APIをたたく
    let RailURL = `http://express.heartrails.com/api/json?method=getStations&name=${station_name_URI}&prefecture=${pref_name_URI}`;
    let RailRes = await axios
      .get(RailURL)
      .catch(err => {
        err = new Error("駅検索機能でエラーが発生しているようです。\n恐れ入りますがしばらく時間がたってからご利用ください。");
        return res.status(400).send({
          error: err.message
        });
      });

    // 駅名が存在しなかった場合
    if ('error' in RailRes.data['response']) {
      // 駅名末尾に「駅」がついている場合、リクエストをリトライする
      if (station_name.slice(-1) === "駅") {
        station_name_URI = encodeURI(station_name.slice(0, -1));
        // heartrails APIをたたく
        RailURL = `http://express.heartrails.com/api/json?method=getStations&name=${station_name_URI}&prefecture=${pref_name_URI}`;
        RailRes = await axios
          .get(RailURL)
          .catch(err => {
            err = new Error("駅検索機能でエラーが発生しているようです。\n恐れ入りますがしばらく時間がたってからご利用ください。");
            return res.status(400).send({
              error: err.message
            });
          })
        // それでも駅名が存在しなかった場合
        if ('error' in RailRes.data['response']) {
          err = new Error("お探しの駅名は存在しません｡他の駅名で検索してください｡\nヒント：駅名が間違っているかもしれません。");
          return res.status(400).send({
            error: err.message,
          });
        } // 駅名は存在するが都道府県内になかった場合
        else if (!RailRes.data['response']['station'].length) {
          err = new Error('選択した都道府県内にお探しの駅が見つかりませんでした｡\nヒント：選択する都道府県が間違っているかもしれません。');
          return res.status(400).send({
            error: err.message,
          });
        }
      } else {
        // エラーメッセージをレスポンスして終了
        // エラー文を定義
        const err = new Error("お探しの駅名は存在しません｡他の駅名で検索してください｡\nヒント：駅名が間違っているかもしれません。");
        return res.status(400).send({
          error: err.message,
        });
      }
    } // 駅名は存在するが都道府県内になかった場合
    else if (!RailRes.data['response']['station'].length) {
      // エラーメッセージをセット
      err = new Error('選択した都道府県内にお探しの駅が見つかりませんでした｡\nヒント：選択する都道府県が間違っているかもしれません。');
      // エラーメッセージをレスポンスして終了
      return res.status(400).send({
        error: err.message,
      });
    }

  let X = RailRes.data['response']['station'][0]['x'];
  let Y = RailRes.data['response']['station'][0]['y'];

  // request to Hotpepper API
  let hotpepperAPI_key = "dd28cf82f92a25dc";
  let hotpepperURL = `http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${hotpepperAPI_key}&lat=${Y}&lng=${X}&free_drink=1&private_room=1&course=1&range=2&start=${search_start}&count=36&order=1&format=json`;
  const hotpepperRes = await axios
    .get(hotpepperURL)
    .catch(err => {
      err = new Error("お店検索機能でエラーが発生しているようです。\n恐れ入りますがしばらく時間がたってからご利用ください。");
        return res.status(400).send({
          error: err.message,
        });
    });
  
  // response to frontend
  const shop_list = hotpepperRes["data"]["results"]["shop"];
  
  if(station_name.slice(-1) === "駅"){
    res.send({
      shop_list: shop_list,
      station: station_name.slice(0, -1),
      error: err
    });
  }else{
    res.send({
      shop_list: shop_list,
      station: station_name,
      error: err
    });
  }
}

const get_genre_master = async function () {
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
  search_bar(req.query.station_name, req.query.pref_name, req.query.search_start);

}
main();
})
