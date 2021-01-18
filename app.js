const form = document.querySelector('form');
const input = document.querySelector('input')
const ul = document.querySelector('ul');

var apiKey = "aeb1e7ef095f34b93c1e98be0a5cd9f8";

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputValue = input.value;
    url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&lang=sl&appid=${apiKey}&units=metric`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        const name  = data.name;
        const temp = data.main.temp;
        const feelsLike = data.main.feels_like;
        let weather = data.weather[0].description;
        const main = data.weather[0].main;

        const li = document.createElement('li');
        li.classList.add('city');

        /* Format weather description */
        if (weather == "pretežno oblačno") {
            weather = "pretežno <br> oblačno";
        } else if (weather == "delno oblačno") {
            weather = "delno <br> oblačno"
        } else if (weather == "pretrgana oblačnost") {
            weather = "pretrgana <br> oblačnost"
        }


        /* Adding images to weather description*/
        if (main === "Mist"){
            img = "https://img.icons8.com/windows/96/ffffff/dust.png";
        } else if (main === "Snow") {
            img = "https://img.icons8.com/windows/96/ffffff/snow.png";
        } else if (main === "Thunderstorm") {
            img = "https://img.icons8.com/windows/96/ffffff/cloud-lighting--v1.png";
        } else if (main === "Shower rain" || main === "Rain") {
            img = "https://img.icons8.com/windows/96/ffffff/rain.png";
        } else if (main === "Clouds") {
            img = "https://img.icons8.com/windows/96/ffffff/cloud.png";
        } else if (main === "Clear") {
            img = "https://img.icons8.com/windows/96/ffffff/sun--v1.png";
        } 

        /* Adding text to html */
        const text = `
            <h2 id="city-name">${name}</h2>
            
            <div id="temp">
                ${temp}<sup>°C</sup>
            </div>
            <div id="feels_like">
                <h3>Občutek: ${feelsLike}<sup>°C</sup></h3>
            </div>
            <h2 id="weather-desc">${weather}</h2>
            <img id="city-icon" src=${img}>
        `;
        li.innerHTML = text;
        ul.appendChild(li)
    })

    .catch(() => {
        input.value = "Napačno mesto"
    });
    
    setTimeout(function () {
        window.scrollTo({
            top: 300,
            behavior: 'smooth'
        });
    },45);
})
