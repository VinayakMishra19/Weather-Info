const apikey ="5a8d0b7c9762a1c71521416a50fed074";

const apiurl ="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");




const button= document.getElementById('Current-location');

async function gotlocation(position){
    getdata(position.coords.latitude, position.coords.longitude)
}

function failedtoget(){
  console.log('There are some issues');
}
button.addEventListener('click', async () =>{
     navigator.geolocation.getCurrentPosition(gotlocation, failedtoget);
})

async function getdata(lat, lon ) {
  const responselatilongi = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}` + `&appid=${apikey}`);

  if (responselatilongi.status == 404) 
  {
    document.querySelector(".errorlatilongi").style.display = "block";
    document.querySelector(".weather-info").style.display = "none";
  } 
  else 
  {
    var data = await responselatilongi.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temperature").innerHTML =Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds")
    {
      weatherIcon.src = "images/clouds.png";
    } 
    else if (data.weather[0].main == "Clear") 
    {
      weatherIcon.src = "images/clear.png";
    } 
    else if (data.weather[0].main == "Rain") 
    {
      weatherIcon.src = "images/rain.png";
    }

    document.querySelector(".weather-info").style.display = "block";
    document.querySelector(".errorlatilongi").style.display = "none";
    document.getElementById('Current-location').style.display ="none";
  }
}







async function checkWeather(city) {
  const response = await fetch(apiurl + city + `&appid=${apikey}`);



  if (response.status == 404) 
  {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather-info").style.display = "none";
  } 
  else 
  {
    var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temperature").innerHTML =Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds")
    {
      weatherIcon.src = "images/clouds.png";
    } 
    else if (data.weather[0].main == "Clear") 
    {
      weatherIcon.src = "images/clear.png";
    } 
    else if (data.weather[0].main == "Rain") 
    {
      weatherIcon.src = "images/rain.png";
    }

    document.querySelector(".weather-info").style.display = "block";
    document.querySelector(".error").style.display = "none";
    document.getElementById('Current-location').style.display ="none";
  }
}

searchbtn.addEventListener("click", () => {
  checkWeather(searchbox.value);
});




var icon = document.getElementById("Icon");
icon.onclick = function () {
        document.body.classList.toggle("dark-theme");
        if(document.body.classList.contains("dark-theme")){
          icon.src="images/sun.png"
        }
        else{
          icon.src="images/moon.png"
        }
}


