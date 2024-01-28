const apiKey = "deb39ab92234d92f934c48e8babfabba"

const weatherDataElement = document.getElementById("weather-data");

const cityInputElement = document.getElementById("city-input")

const fomrElement= document.querySelector("form")

fomrElement.addEventListener("submit",(event)=>{
    event.preventDefault();
    const cityValue = cityInputElement.value;
    console.log(cityValue)
   getWeatherData(cityValue);
})

async function getWeatherData(cityValue){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric&lang=tr`);

        if (!response.ok) {
            throw new Error("Network response was not ok.");            
        }

        const data = await response.json();
        console.log(data)
        const temperature = Math.round(data.main.temp)
        const description = data.weather[0].description
        const city = data.name
        const icon = data.weather[0].icon
        console.log(icon    )
        const deatil = [
            `Hissedilen : ${Math.round(data.main.feels_like)} °C`,
            `Nem : % ${data.main.humidity}`,
            `Rüzgar: ${data.wind.speed} m/s`
        ]


        weatherDataElement.querySelector(".icon").innerHTML=`<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather icon">`
        weatherDataElement.querySelector(".temperature").textContent = `${temperature}°C`
        weatherDataElement.querySelector(".city h1").textContent = `${city}`
        weatherDataElement.querySelector(".description").textContent = `${description}`
        weatherDataElement.querySelector(".details").innerHTML = deatil.map((detail) => `<div>${detail}</div>`).join("")
    } catch (error) {
       console.log("şehir bulunamadı")
    }
}