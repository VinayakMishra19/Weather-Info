
const apikey ="5a8d0b7c9762a1c71521416a50fed074";

const apiurl ="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");




const getlocationicon= document.getElementById('Current-location');


/*async function gotlocation(position){
    getdata(position.coords.latitude, position.coords.longitude)
}

function failedtoget(){
  console.log('There are some issues');
}
*/

// User Ip address for getting his/her location without any typping work.....
getlocationicon.addEventListener('click', async () =>{
    const result= await fetch("https://ipapi.co/json/");

    var data=await result.json();
    // console.log(data);
    getdata(data.city);
})

// Will directly get location access without any input
async function getdata(city) {
  const responselatilongi = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}` + `&appid=${apikey}`);

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






// this function will execute after getting the users input 
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

// here will send the users city request into our main function so that api start to fetch the data for that city
searchbtn.addEventListener("click", () => {
  checkWeather(searchbox.value);
});



//Dark-Light Theme....
var icon = document.getElementById("Icon");
var iconcurrentloc = document.getElementById("Current-location");
icon.onclick = function () {
        document.body.classList.toggle("dark-theme");
        if(document.body.classList.contains("dark-theme")){
          icon.src="images/sun.png"
          iconcurrentloc.src = "images/darkmode-currentlocation-icon.png"
        }
        else{
          icon.src="images/moon.png"
          iconcurrentloc.src = "images/lightmode-currentlocation-icon.png"
        }
}


// Debouncing in query 
let counter = 0;
function getData(){
       console.log("Fetching... Data "+ counter++);
}

function Debouncing(call,d){
         let timer;
         return function(...args){
               if(timer) 
               {
                 clearTimeout(timer)
               }
              timer= setTimeout(()=>{
                   call();
               },d)
         }

}

const goodFunction=Debouncing(getData,2000);


// Throttle in searching button

const throttle = (fun,d)=>{
  
  
  return function(...args){
    document.getElementById("Searchicon").disabled=true;
    setTimeout(()=>{
       fun();
    },d)
}
}

const Funcallinfo= throttle(()=>{
      document.getElementById("Searchicon").disabled=false;
      console.log("User Requested for some query ");
},1000)
