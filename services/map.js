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
};

module.exports.draw = () => {
    let URL = "http://maps.googleapis.com/maps/api/staticmap?&size=600x400&style=visibility:on" +
      "&style=feature:water%7Celement:geometry%7Cvisibility:on" +
      "&style=feature:landscape%7Celement:geometry%7Cvisibility:on";

    distributedCities.forEach((city) => {
        URL = URL.concat("&markers=anchor:center%7Cicon:");
        if(city.count === 1){
            URL = URL.concat("https://i.imgur.com/5jWQvJO.png%7C", city.name);
        } else if (city.count <= 5){
            URL = URL.concat("https://i.imgur.com/6PTHNjg.png%7C", city.name);
        } else {
            URL = URL.concat("https://i.imgur.com/ihbMjUv.png%7C", city.name);
        }
    });

    URL = URL.concat("&key=AIzaSyAjSzRRqxvRU0S6CeplhFH2MjcknDx-l0g");
    distributedCities = [];
    return URL;
};
