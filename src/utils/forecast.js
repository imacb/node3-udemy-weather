const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {

    const urlWeather = 'http://api.weatherstack.com/current?access_key=f9d69d55deaca3829590040e7b47a64a&query='+ latitude + ',' + longitude
 //   const urlWeather = 'http://api.weatherstack.com/current?access_key=f9d69d55deaca3829590040e7b47a64a&query=47.5,8.25'
    request({url: urlWeather, json: true}, (error,{body}) => {
    if (error) {
        console.log('Unable to connect to weather service.')
    } else if (body.error) {
        console.log('Location not found')
    }
        else
    {
        console.log(body.current)
        const {weather_descriptions: weather_descriptions, temperature,
            humidity, wind_speed, wind_degree, wind_dir, feelslike} = body.current
        callback(undefined, {
            weather_description: weather_descriptions[0],
            temperature,
            humidity,
            wind_speed,
            wind_degree,
            wind_dir,
            feelslike
        })
    }
    })
}
module.exports = forecast
