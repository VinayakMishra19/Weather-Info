
const apikey ="5a8d0b7c9762a1c71521416a50fed074";

const apiurl ="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");



document.addEventListener("DOMContentLoaded", function () {
  
  var hasPermission = localStorage.getItem("Permission");

  
  if (hasPermission === null || hasPermission === "false") {
      Permissionpopup();
  } 
  else 
  {
      
    showthecurrentweather();
  }
});

function Permissionpopup ()
{ 
  var userConfirmation = confirm("Check Weather Condition of your Current Location");
 
  localStorage.setItem("Permission",userConfirmation)

  if(userConfirmation)
  {
   
    showthecurrentweather();
    
  }
  else{
    alert("........You can check the weather manually now!......... ")
  }

}

//This function will called when user gives access 
function showthecurrentweather()
{
  navigator.geolocation.getCurrentPosition(function(position) {
    var lati = position.coords.latitude;
    var longi = position.coords.longitude;
    directlocat(lati,longi);
   
    

   async function directlocat(lati,longi) {
    const responsedirect = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lati}&lon=${longi}` + `&appid=${apikey}`);
  
    if (responsedirect.status == 404) 
    {
      document.querySelector(".errorlatilongi").style.display = "block";
      document.querySelector(".weather-info").style.display = "none";
    } 
    else 
    {
      var data = await responsedirect.json();
  
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
      
    }
  }
});
}


     








const getlocationicon= document.getElementById('Current-location');
// User's latitude longitude for getting his/her location without any typping work.....


function gotData(position)
{
  var lati = position.coords.latitude;
  
  var longi = position.coords.longitude;
 
  getdata(lati,longi);
}

getlocationicon.addEventListener('click', ()=>{
  navigator.geolocation.getCurrentPosition(gotData);
 
})

  


async function getdata(lati, longi) {
  const responsecity = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lati}&lon=${longi}` + `&appid=${apikey}`);




  if (responsecity.status == 404) 
  {
    document.querySelector(".errorlatilongi").style.display = "block";
    document.querySelector(".weather-info").style.display = "none";
  } 
  else 
  {
    var data = await responsecity.json();

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
    
  }
}


  


var city=localStorage.getItem("mylocation");
checkWeather(city)
// this function will execute after getting the users input 
async function checkWeather(city) {
  const response = await fetch(apiurl + city + `&appid=${apikey}`);



  if (response.status == 404) 
  {
    document.querySelector(".error").style.display = "none";
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
   
  }
}

searchbox.addEventListener('input' ,(e)=>{
   localStorage.setItem("mylocation",e.target.value)
   

})

// here will send the users city request into our main function so that api start to fetch the data for that city
searchbtn.addEventListener("click", () => {
  // localStorage.setItem("mylocation",searchbox.value)
  checkWeather(searchbox.value);
  

});



//Dark-Light Theme....


var icon = document.getElementById("Icon");
var iconcurrentloc = document.getElementById("Current-location");

function darkmode(){
  let setTheme=document.body;
  setTheme.classList.toggle('dark-theme')

  let theme;
  if(setTheme.classList.contains('dark-theme')){
    theme='DARK'
    icon.src="images/sun.png"
    iconcurrentloc.src = "images/darkmode-currentlocation-icon.png"

  }
  else{
    theme='LIGHT'
    icon.src="images/moon.png"
    iconcurrentloc.src = "images/lightmode-currentlocation-icon.png"

  }
  // console.log(typeof(theme))
  localStorage.setItem('PageTheme',theme)
}
let getTheme=localStorage.getItem('PageTheme');

if(getTheme == 'DARK')
{
  document.body.classList ='dark-theme';
  icon.src="images/sun.png"
  iconcurrentloc.src = "images/darkmode-currentlocation-icon.png"
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



//local storage
localStorage.getItem(icon,);
