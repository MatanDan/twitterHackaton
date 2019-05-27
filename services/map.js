const cities = require('../config/cities');

let distributedCities = [];

module.exports.map = (cityIds) => {
    cityIds.forEach((id) => {
        let reqCity = cities.find((city) => {
            return city.id === id
        })

        let reqDistributedCity = distributedCities.find((city) => {
            return city.name === reqCity.name
        })

        if (reqDistributedCity) {
            reqDistributedCity.count++;
        } else {
            distributedCities.push({
                "name": reqCity.name,
                "count": 1
            })
        }
    });
}