const cities = require('../config/cities');
const senders = require('../config/senders');

module.exports.sort = (cityIds) => {
    let areaList = [];

    cityIds.forEach((id) => {
        let reqCity = cities.find((city) => {
            return city.id === id
        })

        let cityArea = areaList.find((area) => {
            return area.region === reqCity.region
        })

        if (cityArea) {
            cityArea.areas.push(reqCity.name)
        } else {
            areaList.push({
                areas: [reqCity.name],
                client: senders[reqCity.region],
                region: reqCity.region
            })
        }
    })

    return areaList;
}