

//register with Visual Crossing for apiKey
//Create namespace object called weatherApp
//Create ARRAY to different Objects representing temperature blocks (with clothing key value properties inside)
//Make init method and call it to kick things off
//Create search bar to pull user's city/location
//create event listener to store user's location and apply it to API call
//Api Call
     //if something wrong, display error handling to re-input location
//Append/display Weather on Page      
//IF/ELSE statements from API call to select which temperature object to display
//Append Array result from if/else statement to page 


// const weatherApp = {}

// weatherApp.apiURL
// weatherApp.apiKey = '89Q5FZNA5A9RSN7FCW3A6F2NZ';


// weatherApp.button = document.querySelector('button');

// weatherApp.button.addEventListener('click', function () {
//      weatherApp.userLocation = document.querySelector('input').value;
//      console.log(weatherApp.userLocation);

//      fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${weatherApp.userLocation}?unitGroup=metric&key=${weatherApp.apiKey}`, {
//           method: "GET",
//           headers: {
//           }
//      })
//           .then((response) => {
//                return response.json();
//           })
//           .then((jsonResponse) => {
//                console.log(jsonResponse);
//           })
// })

const weatherApp = {}

weatherApp.apiURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/`
weatherApp.apiKey = '89Q5FZNA5A9RSN7FCW3A6F2NZ';


weatherApp.button = document.querySelector('button');
// weatherApp.userLocation = document.querySelector('input').value;
weatherApp.userInput = document.querySelector('input');
// weatherApp.userLocation= weatherApp.userInput.value;

weatherApp.init = function(){
     //add in event listener here- store event listener inside a function weatherapp.eventlistener()
}

//create event listener to pull user input value 
//pass user input value into the getWeather function to target user input location
weatherApp.button.addEventListener('click',function (){
     weatherApp.userLocation = weatherApp.userInput.value;
     console.log(weatherApp.userLocation);
     weatherApp.getWeather(weatherApp.userLocation);
     weatherApp.userInput.value = "";
})

//pass user input location in as parameter
//build out new URL to make api call    
weatherApp.getWeather = function(parameter){
     const url = new URL(weatherApp.apiURL + parameter);
     url.search = new URLSearchParams({
          unitGroup: "metric",
          key: weatherApp.apiKey,
          method: "GET",
          headers:{}
     })
     //api call
     fetch(url)
          .then((response) => {
               return response.json();
          })
          //parse into json
          .then((jsonResponse) => {
               console.log(jsonResponse);
          })
}

//call init function
weatherApp.init();