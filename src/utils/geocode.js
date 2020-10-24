const request = require('postman-request')

const geocode = (address, callback) => {
    const urlGeo = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaW1hY2JsdWV3aW4iLCJhIjoiY2tnZTRjMG5xMDlmcDM0a2Z1NGNzYjZvaCJ9.lboh0kMoGDdP3juOD25RuA&limit=1'
    request({url: urlGeo, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location service', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            const {center, place_name} = body.features[0]
            callback(undefined, {
            latitude : center[1],
            longitude : center[0],
            location: place_name
 
            })
        }
        
    })
}
module.exports = geocode
