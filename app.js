let weather = {
  apikey: "220fbbcc18e5a1670212dc86df9a635c",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apikey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, temp_min, temp_max } = data.main;
    const { humidity } = data.main;
    const { speed } = data.wind;
    const { country } = data.sys;

    // console.log(name,country,icon,description,temp,temp_min,temp_max,humidity,speed);

    document.querySelector(".city").innerHTML =
      "Weather in " + name + "," + country;
    document.querySelector(".temp").innerHTML = temp + "&deg;C ";
    document.querySelector(".icon").src =
      "http://openweathermap.org/img/w/" + icon + ".png";
    document.querySelector(".tempmax_min").innerHTML =
      temp_max + "&deg;C / " + temp_min + "&deg;C";
    document.querySelector(".description").innerHTML = description;
    document.querySelector(".humidity").innerHTML =
      "humidity: " + humidity + "%";
    document.querySelector(".wind").innerHTML = "Wind: " + speed + "km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-box").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-box")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });
function updateClock() {
  let date = new Date();
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let currDay = weekday[date.getDay()];
  let currdate = date.getDate();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let currMonth = months[date.getMonth()];

  let hrs = date.getHours();
  let min = date.getMinutes();
  let meridian = hrs < 12 ? "AM" : "PM";
  hrs = hrs > 12 ? hrs - 12 : hrs;
  hrs = hrs < 10 ? "0" + hrs : hrs;
  min = min < 10 ? "0" + min : min;

  document.querySelector(
    ".date"
  ).innerHTML = `${currDay} | ${currMonth} ${currdate} | ${hrs}:${min} ${meridian}`;
}
