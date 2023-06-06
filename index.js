const apiKey = "cd03838e540bb0a843923b2ee4a8d49b";
const url = "https://api.openweathermap.org/data/2.5/weather";
const card = document.querySelector(".card");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const notFound = document.querySelector(".not-found");

search.addEventListener("click", () => {
  const city = document.querySelector(".search-box input").value;
  if (city === "") return;
  fetch(`${url}?q=${city}&units=metric&appid=${apiKey}`)
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        card.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        notFound.style.display = "block";
        notFound.classList.add("fade-in");
        return;
      }
      notFound.style.display = "none";
      notFound.classList.remove("fade-in");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const info = document.querySelector(".weather-box .info");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");
      switch (json.weather[0].main) {
        case "Clear":
          image.src = "img/clear.jpg";
          break;

        case "Rain":
          image.src = "img/rain.png";
          break;

        case "Snow":
          image.src = "img/snow.png";
          break;

        case "Clouds":
          image.src = "img/cloud.png";
          break;

        case "Haze":
          image.src = "img/mist.png";
          break;

        default:
          image.src = "";
      }
      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      info.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fade-in");
      weatherDetails.classList.add("fade-in");
      card.style.height = "500px";
    });
});
