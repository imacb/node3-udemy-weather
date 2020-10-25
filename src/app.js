const path = require('path')
const express = require('express')
const hbs = require('hbs')
// const { request } = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const request = require('postman-request')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'IFan'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'IFan'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Help message',
        name: 'IFan'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                location: location,
                temperature: forecastData.temperature,
                humidity: forecastData.humidity,
                wind_speed: forecastData.wind_speed,
                wind_degree: forecastData.wind_degree,
                wind_dir: forecastData.wind_dir,
                feelslike: forecastData.feelslike,
                address: req.query.address,
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        errorMessage: 'Help page not found',
        name: 'IFan'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'IFan'
    })
})

app.listen(port, () =>
    console.log('Server is up on port ' + port +'.')
)