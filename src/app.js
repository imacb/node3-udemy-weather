const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { request } = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

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
        name: 'Ivan McBean'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Ivan McBean'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Help message',
        name: 'Ivan McBean'
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
                feelslike: 35,
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
        name: 'Ivan McBean'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Ivan McBean'
    })
})

app.listen(3000, () =>
    console.log('Server is up on port 3000.')
)