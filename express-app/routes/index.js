var express = require('express');
var router = express.Router();
var axios = require('axios')


const {
  response
} = require('express');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});


router.get('/test', function (req, res, next) {
  function error_res(place, err) {
    // console.log('error at ' + place)
    res.render('test', {
      state: 'error',
      message: err
    })
  }

  const test = async function (station_name, pref_name) {

    station_name = encodeURI(station_name)
    pref_name = encodeURI(pref_name)
    let X, Y, RailURL = `http://express.heartrails.com/api/json?method=getStations&name=${station_name}&prefecture=${pref_name}`
    const RailRes = await axios.get(RailURL).catch((err) => error_res('rail', err))
    X = RailRes.data['response']['station'][0]['x']
    Y = RailRes.data['response']['station'][0]['y']

    let hotpepperAPI_key = "dd28cf82f92a25dc"
    let hotpepperURL = `http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${hotpepperAPI_key}&lat=${Y}&lng=${X}&free_drink=1&private_room=1&course=1range=2&count=100&order=1&format=json`

    const hotpepperRes = await axios.get(hotpepperURL).catch((err) => error_res('hotpepper', err))
    let shop_list = hotpepperRes["data"]["results"]["shop"]

    shop_list.forEach(shop_data => {
      // console.log([shop_data["name"], shop_data["address"], shop_data["urls"]["pc"], shop_data["budget"]["average"], ])
    });

    // res.render('test', {
    res.send({
      state: 'success',
      shop_list: shop_list
    })
  }

  
  console.log(req.query)
  function main() {
    test(req.query.station_name, req.query.pref_name)
  }
  main()

})

module.exports = router;