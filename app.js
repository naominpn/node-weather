const axios = require('axios')

async function getLatLong(placeName){
    return await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${placeName}&key=40918f1d7eae402992294b36531f7f0d`)
        .then(res => {
            return res.data.results[0].geometry;
        })

}

async function getWeather(lat, lon) {
    return await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8404fc7b2bbd4a1a4d6a797d61b3cbb0`)
        .then(res => {
            return res.data;
        })
}

const toCelcius = (tempinK) => {
    return (tempinK - 273.15)
}


async function main(placeName){
    const x = await getLatLong(placeName)
                                                     
    const y = await getWeather(x.lat, x.lng);

    
    console.log (`${placeName}, ${y.sys.country}
    
    ${toCelcius(y.main.temp).toFixed(2)}°C`)
}

const userInput = process.argv.slice(2).join(' ')

main(`${userInput}`);