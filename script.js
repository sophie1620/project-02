

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


const weatherApp = {}

weatherApp.apiURL
weatherApp.apiKey = '89Q5FZNA5A9RSN7FCW3A6F2NZ';


weatherApp.button = document.querySelector('button');

weatherApp.button.addEventListener('click', function () {
     weatherApp.userLocation = document.querySelector('input').value;
     console.log(weatherApp.userLocation);

     fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${weatherApp.userLocation}?unitGroup=metric&key=${weatherApp.apiKey}`, {
          method: "GET",
          headers: {
          }
     })
          .then((response) => {
               return response.json();
          })
          .then((jsonResponse) => {
               console.log(jsonResponse);
          })
})