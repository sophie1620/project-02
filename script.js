//register with Visual Crossing for apiKey 
//Create namespace object called weatherApp
//Create ARRAY to different Objects representing temperature blocks (with clothing key value properties inside)
//Make init method and call it to kick things off
//Create search bar to pull user's city/location
//create event listener to store user's location and apply it to API call
//API Call
     //if something wrong, display error handling to re-input location
//Append/display Weather on Page - h2 for feelsLike, and lis for additional info
//create method to display clothing- use IF/ELSE statements from API call to select which clothing array to display
//Append Array result from if/else statement to page 


// clothing options for different temperature blocks inside our the runningAttire array
const runningAttire = [
     {
     title: 'extremeCold',
     clothing: [
          'Hat', 
          'Face cover', 
          'Neck cover',
          'Gloves', 
          'Mittens', 
          'Long sleeves',
          'Vest',
          'Jacket',
          'Leggings', 
          'Pants', 
          'Socks', 
          'Running shoes'
          ]
     },

     {
     title: 'cold', 
          clothing: [
          'Headband', 
          'Gloves', 
          'Long sleeve',
          'Jacket',
          'Leggings', 
          'Socks', 
          'Running shoes'
          ]
     },

     {
     title: 'temperate',
     clothing: [
          'Long sleeve',
          'Vest',
          'Leggings', 
          'Socks', 
          'Running shoes'
          ]
     }, 

     {
     title: 'warm',
     clothing: [
          'Short sleeve',
          'Capris', 
          'Socks', 
          'Running shoes'
          ]
     }, 

     {
     title: 'hot',
     clothing: [
          'Tanktop',
          'Shorts', 
          'Socks', 
          'Running shoes'
          ]
     }, 

     {
     title: 'exteremeHeat',
     clothing: [
          'Tanktop',
          'Shorts', 
          'Socks', 
          'Running shoes'
          ]
     }
] //end of runningAttire array

//create array for different weather icons to use
const weatherIcons = [
     "./assets/cloudy.svg",
     "./assets/moon.svg",
     "./assets/moonandcloud.svg",
     "./assets/rainy.svg",
     "./assets/snowy.svg",
     "./assets/sunandcloud.svg",
     "./assets/sunny.svg",
     "./assets/windy.svg"
]

const weatherApp = {}

//define some variables for event listener + fetch call
weatherApp.apiURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/`
weatherApp.apiKey = '89Q5FZNA5A9RSN7FCW3A6F2NZ';

weatherApp.form = document.querySelector('form');
weatherApp.userInput = document.querySelector('input');


/////// INIT FUNCTION /////////
//Create init function to set off event listener
weatherApp.init = function(){
     eventListener();
}


///////// EVENT LISTENER ///////////
//Create function to store event listener inside (to be called in init)
//Create event listener to retrieve value of user input 
const eventListener = function() {
     weatherApp.form.addEventListener('submit',function(e){
          e.preventDefault();
          weatherApp.userLocation = weatherApp.userInput.value;
          //pass userLocation as argument into getWeather for API call 
          weatherApp.getWeather(weatherApp.userLocation);
          weatherApp.userInput.value = "";
          weatherApp.displayLoading();
     })
} // end of event listener


///////// DISPLAY LOADING FUNCTION //////////
// Loading page function that will be called in the event listener
weatherApp.displayLoading = function() {
     const loader = document.querySelector('#displayLoading');
     loader.classList.add("display");

     setTimeout(() => {
          loader.classList.remove("display");
     }, 1500);
} // end of displayLoading function


////////// GET WEATHER FUNCTION //////////
// Pass userLocation into getWeather function
// Build out new URL with parameters to make API call    
weatherApp.getWeather = function(locationParameter){
     const url = new URL(weatherApp.apiURL + locationParameter);
     url.search = new URLSearchParams({
          unitGroup: "metric",
          key: weatherApp.apiKey,
          method: "GET",
          headers:{}
     })
     //API call
     fetch(url)
     .then((response) => {
          if(response.ok || response.status === 200){
               return response.json();

          } else {
               //error handling: if API call doesn't work or user input is bad
               throw new Error ("This city doesn't exist! Please try again.") ;    
          }      
     })
     //parse information into json
     .then((jsonResponse) => {
          // console.log(jsonResponse);
          weatherApp.displayLocation(jsonResponse.resolvedAddress);
          weatherApp.displayWeather(jsonResponse.currentConditions);
          weatherApp.displayIcon(jsonResponse.currentConditions.icon);
     })
     .catch((err) => {
          alert(err);
     })
} //end of API call


/////// DISPLAY LOCATION FUNCTION ////////
// Show the location/address of API call on page (for user to know if the location is correct)
weatherApp.displayLocation = function(locationData){
     const location = document.querySelector('.location h3');
     location.textContent = "";
     location.textContent = locationData;
     //add visual prompt to user if information is wrong
     const locationError = document.querySelector('.location p');
     locationError.classList.add("visuallyShow");
     //add background colour to section
     const locationSection = document.querySelector('.location')
     locationSection.classList.add('locationBackground');

     setTimeout(() => {
          locationError.classList.remove("visuallyShow");
     }, 6000);
} //end of displayLocation function


///////// DISPLAY WEATHER FUNCTION ///////////
// Pull current conditions information from API call, and show weather information on page
weatherApp.displayWeather = function(weatherData) {
     
     //select forecastConditions and store in variable
     const forecastConditions = document.querySelector('.forecastHighlights');
     forecastConditions.innerHTML = "";
     //append feelsLike and the weather description inside the forecastCondition
     const feelsLike= weatherData.feelslike;
     forecastConditions.innerHTML = `<h2>Feels Like: <span>${feelsLike}°C</span></h2><h4>${weatherData.conditions}</h4>`;

     //add styling for background onto currentConditions section, once information is displayed:
     const currentConditions = document.querySelector('.currentConditions');
     currentConditions.classList.add('sectionsBackground')

     //create a weather object to store selected conditions inside variables:
     const conditionsObject ={
          Temperature: `${weatherData.temp} °C`,
          Wind : `${weatherData.windspeed} km/h`,
          Gusts : `${weatherData.windgust} km/h`,
          Precipitation : `${weatherData.precip} mm`,
          Sunrise : weatherData.sunrise,
          Sunset : weatherData.sunset
     }

     //for each item in conditionsObject, create an <li> and store variable inside it --> also create an h4 to hold the description of the icon
     const ulWeatherElement = document.querySelector('.additionalInfo');
     ulWeatherElement.innerHTML="";
     for(const key in conditionsObject ){
          const listElement = document.createElement('li');
          listElement.textContent =`${key}: ${conditionsObject[key]}`;
          ulWeatherElement.append(listElement);
     }
     weatherApp.displayClothing(feelsLike);
} // end of displayWeather function



/////////// DISPLAY ICON FUNCTION ///////////
//create a function that holds if/else statements - determines which icon will be displayed based on current weather
weatherApp.displayIcon = function(icon){
     // console.log('i works!');
     const iconContainer = document.querySelector('.iconContainer');
     iconContainer.innerHTML = "";
     
     const masterpiece = document.createElement('img');
     
     if (icon === "cloudy"){
          masterpiece.src = weatherIcons[0]
          iconContainer.appendChild(masterpiece);
     } else if (icon === "clear-night") {
          masterpiece.src = weatherIcons[1]
          iconContainer.appendChild(masterpiece);
     } else if (icon === "partly-cloudy-night") {
          masterpiece.src = weatherIcons[2]
          iconContainer.appendChild(masterpiece);
     } else if (icon === "rain") {
          masterpiece.src = weatherIcons[3]
          iconContainer.appendChild(masterpiece);
     } else if (icon === "snow") {
          masterpiece.src = weatherIcons[4]
          iconContainer.appendChild(masterpiece);
     } else if (icon === "partly-cloudy-day") {
          masterpiece.src = weatherIcons[5]
          iconContainer.appendChild(masterpiece);
     } else if (icon === "clear"){
          masterpiece.src = weatherIcons[6]
          iconContainer.appendChild(masterpiece);
     }  else {
          masterpiece.src = weatherIcons[7]
          iconContainer.appendChild(masterpiece);
     }
     
} //end of displayIcon function


//////// SELECT CLOTHING LIST FUNCTION ///////////
//Create a method to store the forEach method inside- for each of the items inside the clothing array, create a new <li> with the clothing item inside
weatherApp.selectClothingList = function(outfitParameter) {
     const whatToWear = document.querySelector('.whatToWear');
     whatToWear.classList.add('sectionsBackground')
     const ulClothingElement = document.querySelector('.clothingItems');
     ulClothingElement.innerHTML = "";

     const runningOutfits = document.createElement('h3')

     runningOutfits.textContent = "What to wear";
     ulClothingElement.append(runningOutfits)

     outfitParameter.forEach(function(item) {
          const listedItem = document.createElement('li');
          listedItem.textContent = item;
          ulClothingElement.append(listedItem);
     }) 
} //end of selectClothingList function


///////// DISPLAY CLOTHING FUNCTION ///////////
// Create a method that will take the feelsLike info from displayWeather, and use that number to create if/else statements to show different clothing outfits based on the temperature
weatherApp.displayClothing = function(temperature) {
     if(temperature < -10) {
          // console.log(`WAH! COLD! BRR!`);
          weatherApp.selectClothingList(runningAttire[0].clothing);

     } else if(temperature >= -10 && temperature < 0) {
          // console.log(`its alright..kinda cold`);
          weatherApp.selectClothingList(runningAttire[1].clothing);

     } else if(temperature >= 0 && temperature < 5) {
          // console.log(`i'm temperate`);
          weatherApp.selectClothingList(runningAttire[2].clothing);

     } else if(temperature >= 5 && temperature < 15) {
          // console.log(`it's warm out!`);
          weatherApp.selectClothingList(runningAttire[3].clothing);

     } else if(temperature >= 15 && temperature < 25) {
          // console.log(`it's getting hot in here!`);
          weatherApp.selectClothingList(runningAttire[4].clothing);
     } else {
          // console.log(`is it wise run outside?`);
          weatherApp.selectClothingList(runningAttire[5].clothing);
     }
} // end of displayClothing function


//call init function
weatherApp.init();