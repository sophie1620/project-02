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
          'hat', 
          'faceCover', 
          'neckCover',
          'gloves', 
          'mittens', 
          'longSleeves',
          'vest',
          'jacket',
          'leggings', 
          'pants', 
          'socks', 
          'runningShoes'
          ]
     },

     {
     title: 'cold', 
          clothing: [
          'headband', 
          'gloves', 
          'longSleeve',
          'jacket',
          'leggings', 
          'socks', 
          'runningShoes'
          ]
     },

     {
     title: 'temperate',
     clothing: [
          'longSleeve',
          'vest',
          'leggings', 
          'socks', 
          'runningShoes'
          ]
     }, 

     {
     title: 'warm',
     clothing: [
          'shortSleeve',
          'capris', 
          'socks', 
          'runningShoes'
          ]
     }, 

     {
     title: 'hot',
     clothing: [
          'tanktop',
          'shorts', 
          'socks', 
          'runningShoes'
          ]
     }, 

     {
     title: 'exteremeHeat',
     clothing: [
          'tanktop',
          'shorts', 
          'socks', 
          'runningShoes'
          ]
     }
] //end of runningAttire array

//create array for different weather icons to use

const weatherIcons = [
     '<img src="./assets/cloudy.svg">',
     '<img src="./assets/moon.svg">',
     '<img src="./assets/moonandcloud.svg">',
     '<img src="./assets/rainy.svg">',
     '<img src="./assets/snowy.svg">',
     '<img src="./assets/sunandcloud.svg">',
     '<img src="./assets/sunny.svg">'
]

const weatherApp = {}

//define some variables for event listener + fetch call
weatherApp.apiURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/`
weatherApp.apiKey = '89Q5FZNA5A9RSN7FCW3A6F2NZ';

weatherApp.form = document.querySelector('form');
weatherApp.userInput = document.querySelector('input');


//Create init function to set off event listener
weatherApp.init = function(){
     eventListener();
}



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



// Loading page function that will be called in the event listener
weatherApp.displayLoading = function() {
     const loader = document.querySelector('#displayLoading');
     loader.classList.add("display");

     setTimeout(() => {
          loader.classList.remove("display");
     }, 1500);
}



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
               throw new Error ("This city doesn't exist! Please try again") ;    
          }      
     })
     //parse information into json
     .then((jsonResponse) => {
          console.log(jsonResponse);
          weatherApp.displayLocation(jsonResponse.resolvedAddress);
          weatherApp.displayWeather(jsonResponse.currentConditions);
          weatherApp.displayIcon(jsonResponse.currentConditions.icon);
          console.log(jsonResponse.currentConditions.icon);
     })
     .catch((err) => {
          alert(err);
     })
} //end of API call



// Show the location/address of API call on page (for user to know if the location is correct)
weatherApp.displayLocation = function(locationData){
     const location = document.querySelector('.location h3');
     location.textContent = "";
     location.textContent = locationData;
     
     const locationError = document.querySelector('.location p');
     locationError.classList.add("visuallyShow");

     setTimeout(() => {
          locationError.classList.remove("visuallyShow");
     }, 6000);

}



// Pull current conditions information from API call, and show weather information on page
weatherApp.displayWeather = function(weatherData) {
     
     //select forecastConditions and store in variable
     const forecastConditions = document.querySelector('.forecastHighlights');
     forecastConditions.innerHTML = "";
     //append feelsLike inside the forecastCondition
     const forecastHeading = document.createElement('h2');
     const feelsLike= weatherData.feelslike;
     forecastHeading.textContent = `current temperature: ${feelsLike} degrees`;
     
     forecastConditions.appendChild(forecastHeading);


     //create a weather object to store selected conditions inside variables:
     const conditionsObject ={
          status: `${weatherData.conditions}`,
          temperature : `${weatherData.temp} degrees`,
          wind : `${weatherData.windspeed} km/hr`,
          windGust : `${weatherData.windgust} km//hr`,
          precipitation : `${weatherData.precip} mm`,
          sunrise : weatherData.sunrise,
          sunset : weatherData.sunset
     }

     //for each item in conditionsObject, create an <li> and store variable inside it
     const ulWeatherElement = document.querySelector('.additionalInfo');
     ulWeatherElement.innerHTML="";
     for(const key in conditionsObject ){
          const listElement = document.createElement('li');
          listElement.textContent =`${key}: ${conditionsObject[key]}`;
          ulWeatherElement.append(listElement);
     }
     weatherApp.displayClothing(feelsLike);
} // end of displayWeather function


//create a function that holds if/else statements - determines which icon will be displayed based on current weather
weatherApp.displayIcon = function(){
     const iconContainer = document.querySelector('.iconContainer');
     console.log(iconContainer);
//      if (icon === "cloudy"){
//           iconContainer.appendChild(weatherIcons[0]);
//      } else if (icon === "clear-night") {
//           iconContainer.appendChild(weatherIcons[1])
//      } else if (icon === "partly-cloudy-night") {
//           iconContainer.appendChild(weatherIcons[2]);
//      } else if (icon === "rain") {
//           iconContainer.appendChild(weatherIcons[3]);
//      } else if (icon === "snow") {
//           iconContainer.appendChild(weatherIcons[4]);
//      } else if (icon === "partly-cloudy-day") {
//           iconContainer.appendChild(weatherIcons[5]);
//      } else {
//           iconContainer.appendChild(weatherIcons[6]);
//      }
}

//Create a method to store the forEach method inside- for each of the items inside the clothing array, create a new <li> with the clothing item inside
weatherApp.selectClothingList = function(outfitParameter) {
     const ulClothingElement = document.querySelector('.clothingItems');
     ulClothingElement.innerHTML = "";

     outfitParameter.forEach(function(item) {
          const listedItem = document.createElement('li');
          listedItem.textContent = item;
          ulClothingElement.append(listedItem);
     }) 
} //end of selectClothingList function



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