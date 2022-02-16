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


// where are our object/arrays begin for clothing options
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

const weatherApp = {}

weatherApp.apiURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/`
weatherApp.apiKey = '89Q5FZNA5A9RSN7FCW3A6F2NZ';


weatherApp.button = document.querySelector('button');
// weatherApp.userLocation = document.querySelector('input').value;
weatherApp.userInput = document.querySelector('input');
// weatherApp.userLocation= weatherApp.userInput.value;

weatherApp.init = function(){
     //add in event listener here- store event listener inside a function weatherapp.eventlistener()
     console.log(`initialization`);
     eventListener();
}

const eventListener = function() {
     //create event listener to pull user input value 
     //pass user input value into the getWeather function to target user input location
     weatherApp.button.addEventListener('click',function (){
          weatherApp.userLocation = weatherApp.userInput.value;
          // console.log(weatherApp.userLocation);
          weatherApp.getWeather(weatherApp.userLocation);
          weatherApp.userInput.value = "";
     })
} // end of event listener


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
          // console.log(jsonResponse);
          weatherApp.displayWeather(jsonResponse.currentConditions);
     })
} //end of API call

// we need to have weather be retrieved
weatherApp.displayWeather = function(weatherData) {
     // console.log(weatherData);
     
     //select forecastConditions and store in variable
     const forecastConditions = document.querySelector('.forecastCondition');
     forecastConditions.innerHTML = "";
     //append feelsLike inside the forecastCondition
     const forecastHeading = document.createElement('h2');
     const feelsLike= weatherData.feelslike;
     forecastHeading.textContent = `current temperature: ${feelsLike} degrees`;
     
     forecastConditions.appendChild(forecastHeading);


     //create method to choose the if/else icons --> call that method into the displayWeather
          //pass feelsLike as argument into displayClothing 
     //append icon into forecastCondition


     //store all weather object values inside variables:
     const conditionsObject ={
          temperature : `${weatherData.temp} degrees`,
          wind : `${weatherData.windspeed} km/hr`,
          windGust : `${weatherData.windgust} km//hr`,
          precipitation : `${weatherData.precip} mm`,
          sunrise : weatherData.sunrise,
          sunset : weatherData.sunset
     }

     //for each item in conditionsObject, create an li and store variable inside it
     const ulElement = document.querySelector('.additionalInfo');
     ulElement.innerHTML="";
     for(const key in conditionsObject ){
          const listElement = document.createElement('li');
          listElement.textContent =`${key}: ${conditionsObject[key]}`;
          ulElement.append(listElement);
     }

     weatherApp.displayClothing(feelsLike);
} // end of displayWeather function

     
//create a method to store the forEach method inside- then call it inside each if/else statement
weatherApp.selectClothingList = function(parameter) {
     const clothingItems = document.querySelector('.clothingItems');
     clothingItems.innerHTML = "";

     parameter.forEach(function(item) {
          const listedItem = document.createElement('li');
          listedItem.textContent = item;
          clothingItems.append(listedItem);
     }) 
} //end of selectClothingList function

weatherApp.displayClothing = function(temperature) {
     if(temperature < -10) {
          // console.log(`WAH! COLD! BRR!`);
          // console.log(runningAttire[0].clothing);
          weatherApp.selectClothingList(runningAttire[0].clothing);

     } else if(temperature >= -10 && temperature < 0) {
          // console.log(`its alright..kinda cold`);
          // console.log(runningAttire[1].clothing);
          weatherApp.selectClothingList(runningAttire[1].clothing);

     } else if(temperature >= 0 && temperature < 5) {
          // console.log(`i'm temperate`);
          // console.log(runningAttire[2].clothing);
          weatherApp.selectClothingList(runningAttire[2].clothing);

     } else if(temperature >= 5 && temperature < 15) {
          // console.log(`it's warm out!`);
          // console.log(runningAttire[3].clothing);
          weatherApp.selectClothingList(runningAttire[3].clothing);

     } else if(temperature >= 15 && temperature < 25) {
          // console.log(`it's getting hot in here!`);
          // console.log(runningAttire[4].clothing);
          weatherApp.selectClothingList(runningAttire[4].clothing);
     } else {
          // console.log(`is it wise run outside?`);
          // console.log(runningAttire[5].clothing);
          weatherApp.selectClothingList(runningAttire[5].clothing);
     }
} // end of displayClothing function

// append the displayClothing to index.html via innerHtml



//call init function
weatherApp.init();