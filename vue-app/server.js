// server.js
const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
const cors = require('cors')
const createError = require('http-errors')
const axios = require('axios')

app = express();
app.use(serveStatic(__dirname + "/dist"));
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))

const port = process.env.PORT || 3000;

app.listen(port);
console.log('server started ' + port);

app.get('/test', function (req, res, next) {
  const test = async function (station_name, pref_name) {
    station_name = encodeURI(station_name)
    pref_name = encodeURI(pref_name)
    let X = 0
    let Y = 0
    const RailURL = `http://express.heartrails.com/api/json?method=getStations&name=${station_name}&prefecture=${pref_name}`
    const RailRes = await axios
      .get(RailURL)
      .catch(err => {
        return err.response
      })

    if ('error' in RailRes.data['response']) {
      console.log(RailRes.data['response']["error"])

    } else if (!RailRes.data['response']['station'].length) {
      const err = new Error('駅名と都道府県の組み合わせが正しくありません')
      res.status(400).send({
        error: err.message,
        data: RailRes.data['response']
      })
    } else {
      console.log("---------------------------------------------------")
    }



    X = RailRes.data['response']['station'][0]['x']
    Y = RailRes.data['response']['station'][0]['y']

    let hotpepperAPI_key = "dd28cf82f92a25dc"
    let hotpepperURL = `http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${hotpepperAPI_key}&lat=${Y}&lng=${X}&free_drink=1&private_room=1&course=1range=2&count=100&order=1&format=json`

    const hotpepperRes = await axios.get(hotpepperURL).catch((err) => error_res('hotpepper', err))
    let shop_list = hotpepperRes["data"]["results"]["shop"]

    res.send({
      state: 'success',
      shop_list: shop_list
    })
  }

  function main() {
    test(req.query.station_name, req.query.pref_name)
  }
  main()
})
