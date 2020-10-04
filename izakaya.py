# coding:utf-8
import json
import requests
import urllib.parse
import pandas as pd


# Rail APIにより駅名・県名から駅の緯度・経度を取得
def RailAPI(station, pref):
    station_url = urllib.parse.quote(station)
    pref_url = urllib.parse.quote(pref)
    api = 'http://express.heartrails.com/api/json?method=getStations&name={station_name}&prefecture={pref_name}'
    url = api.format(station_name=station_url, pref_name=pref_url)
    response = requests.get(url)
    result_list = json.loads(response.text)['response']['station']
    lng = result_list[0]['x']
    lat = result_list[0]['y']
    return lat, lng


def HotpepperAPI(lat, lng):
    api_key = 'dd28cf82f92a25dc'
    api = 'http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?' \
        'key={key}&lat={lat}&lng={lng}&free_drink=1&private_room=1&course=1range=2&count=100&order=1&format=json'
    url = api.format(key=api_key, lat=lat_st, lng=lng_st)
    response = requests.get(url)
    results_list = json.loads(response.text)['results']['shop']
    shop_datas = []
    for shop_data in results_list:
        shop_datas.append([shop_data['name'], shop_data['address'],
                           shop_data['urls']['pc'], shop_data['budget']['average'], 'Hotpepper'])
    return shop_datas


def GurunaviAPI(lat, lng):
    api_key = '0dc758620bd3f30964057930b287ff6f'
    api = 'https://api.gnavi.co.jp/RestSearchAPI/v3/?' \
        'keyid={key}&latitude={lat}&longitude={lng}&range=2&private_room=1&bottomless_cup=1&hit_per_page=100'
    url = api.format(key=api_key, lat=lat_st, lng=lng_st)
    response = requests.get(url)
    result_list = json.loads(response.text)['rest']
    shop_datas = []
    for shop_data in result_list:
        shop_datas.append([shop_data['name'], shop_data['address'],
                           shop_data['url'], shop_data['budget'], 'ぐるなび'])
    return shop_datas


if __name__ == '__main__':
    station = '志木'
    pref = '埼玉県'

    lat_st, lng_st = RailAPI(station, pref)

    columns = ['name', 'address', 'url', 'budget', 'source']
    HP_data = pd.DataFrame(HotpepperAPI(lat_st, lng_st), columns=columns)

    columns = ['name', 'address', 'url', 'budget', 'source']
    G_data = pd.DataFrame(GurunaviAPI(lat_st, lng_st), columns=columns)

    # HotpepperAPIとぐるなびAPIのデータを統合
    total_data = pd.concat([G_data, HP_data])

    total_data.to_csv('izakaya.csv')
