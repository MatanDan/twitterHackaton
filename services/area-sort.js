const cities = require('../config/cities');
const senders = require('../config/senders');

let alertedPolygons = []

let handleDoubleAlert = (alertArea, city) => {
  let alertPolygon = alertedPolygons.find((polygon) => {
    return polygon.id === city.id
  });

  if (!alertPolygon) {
    alertedPolygons.push({
      id: city.id,
      alertTime: Date.now()
    });

    alertArea.areas.push(city.name)
  } else if (((Date.now() - alertPolygon.alertTime) / 1000) > city.expire) {
    alertArea.areas.push(city.name);
    alertPolygon.alertTime = Date.now()
  }
};

module.exports.sort = (cityIds) => {
  let areaList = [];

  cityIds.forEach((id) => {
    let reqCity = cities.find((city) => {
      return city.id === id
    });

    let cityArea = areaList.find((area) => {
      return area.region === reqCity.region
    });

    if (!cityArea) {
      cityArea = {
        areas: [],
        client: senders[reqCity.region],
        region: reqCity.region
      };

      areaList.push(cityArea)
    }

    handleDoubleAlert(cityArea, reqCity)
  });

  return areaList;
};