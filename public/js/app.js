console.log('Client side java script file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'Loading..'
    messageTwo.textContent = ''

    const location = search.value
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ''
                console.log(data.error)
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = 'Temperature: ' + data.temperature + ' ' +
                    'Humidity: ' + data.humidity + ' ' +
                    'Wind speed: ' + data.wind_speed + ' ' +
                    'Wind direction: ' + data.wind_degree + ' ' +
                    'Wind direction: ' + data.wind_dir
 
                console.log(data.location)
                console.log(data.temperature)
            }
        })
    })
    console.log(location)
})
