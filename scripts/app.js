// app object
// let app = {

//     // api data
//     api: {
//         key: `ba29e2524c03fb467cf6af47fca859df`,
//         url: ``,
//         query: ``,
//         limit: 25,
//     },

//     // page elements
//     elements: {
//         cities: $(`#cities`),
//         imageResults: $(`#image-results`),
//         submit: $(`#submit`),
//         random: $(`#random`)
//     },

//     // data objects
//     data: {

//         // cities array
//         cities: [
//             `toronto`,
//             `halifax`,
//             `new york city`,
//             `chicago`,
//             `boston`,
//             `vancouver`,
//             `seattle`,
//             `san francisco`,
//             `stockholm`,
//             `glasgow`,
//             `london`,
//             `paris`,
//             `berlin`,
//             `venice`,
//             `rome`,
//             `amsterdam`,
//             `melbourne`,
//             `mumbai`
//         ],

//         // empty city selection
//         selection: '',
        
//         // empty photos array
//         photos: [],

//         // empty photo object
//         photo: {},
//     },

//     // app functions
//     functions: {

//         // random selection from array
//         randomFromArray: (array) => {
//             let x = Math.floor(Math.random() * array.length);
//             return array[x];
//         },
        
//         // city selector render
//         cities: () => {
//             // establish select options array with default option
//             let cityOptions = [`<option disabled selected value="">select a city</option>`]
//             // for each city in the app data, push an option to the array
//             app.data.cities.forEach((city) => {
//                 cityOptions.push(`<option value="${city}">${city}</option>`)
//             })
//             // stitch together options and place inside city selector
//             app.elements.cities.html(cityOptions.reduce((accumulator, option) => {return accumulator + option}));
//         },

//         // photo display function
//         displayPhoto: (photos) => {

//             // randomize photo from photos array
//             let randomPhoto = app.functions.randomFromArray(photos);

//             // so long as random photo is equal to last photo, keep randomizing
//             while (randomPhoto === app.data.photo) {randomPhoto = app.functions.randomFromArray(photos)};

//             // set photo to randomized photo
//             app.data.photo = randomPhoto;

//             // establish photo data
//             let photoData = {
//                 url: `https://live.staticflickr.com/${app.data.photo.server}/${app.data.photo.id}_${app.data.photo.secret}.jpg`,
//                 link: `https://www.flickr.com/photos/${app.data.photo.owner}/${app.data.photo.id}/`,
//                 title: `${app.data.selection} pigeon`,
//             }

//             // stitch together HTML to add to the page
//             let photoHTML = `
//             <div class="image-container">
//                 <a href="${photoData.link}" target="_blank">
//                     <img src="${photoData.url}" alt="${photoData.title}" title="${photoData.title}" class="pigeon-image">
//                 </a>
//             </div>
//             <h3 class="city-label">${app.data.selection} pigeon</h3>`;

//             // delay image for 0.2 seconds
//             setTimeout(() => {

//                 // add HTML to the image results section, reset city selection, and re-enable random button
//                 app.elements.imageResults.html(photoHTML);
//                 app.elements.cities.val(``);
//                 app.elements.random.attr(`disabled`, false);

//             }, 200)
//         },

//         // photo display function
//         errorPhoto: () => {

//             // when no data can be retrieved establish error image HTML
//             let photoHTML = `
//                 <div id="image-results">
//                     <div class="image-container">
//                         <img src="assets/pigeon-default.svg" alt="A silhouette of a pigeon" class="pigeon-image default">
//                     </div>
//                     <h3 class="error">Error! Could not retrieve pigeons!</h3>
//                 </div>
//             `;

//             // add HTML to the image results section
//             app.elements.imageResults.html(photoHTML);

//             // empty the city select value and disable the buttons
//             app.elements.cities.val(``);
//             app.elements.cities.attr(`disabled`, true);
//             app.elements.submit.attr(`disabled`, true);
//             app.elements.random.attr(`disabled`, true);
//         },

//         // flickr api call
//         apiCall: (button) => {

//             // disable buttons until photo is displayed
//             app.elements.random.attr(`disabled`, true);
//             app.elements.submit.attr(`disabled`, true);

//             // set api url
//             app.api.url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${app.api.key}&sort=relevance&per_page=${app.api.limit}&format=json&dataType=json&nojsoncallback=1`

//             // if randomizing cities
//             if (button === `random`){

//                 // randomize from the cities array
//                 let randomCity = app.functions.randomFromArray(app.data.cities)

//                 // so long as random city is equal to last selection
//                 while (randomCity === app.data.selection) {

//                     // keep randomizing
//                     randomCity = app.functions.randomFromArray(app.data.cities);
//                 }

//                 // set selection to new random city
//                 app.data.selection = randomCity;
//             }

//             // set API search query using selected city value
//             app.api.query = {text: `pigeon ${app.data.selection}`};

//             // // run API call, save data as photos array, and run display photo function with the array
//             // $.getJSON(app.api.url, app.api.query, (data) => {
//             //     app.data.photos = data.photos.photo;
//             //     app.functions.displayPhoto(app.data.photos);
//             // })
//             // .fail(() => {
//             //     app.functions.errorPhoto;
//             //   })

//             $.ajax({
//                 url: app.api.url,
//                 data: app.api.query
//             }).done((data) => {
//                 if (data.stat === "ok") {
//                     app.data.photos = data.photos.photo;
//                     app.functions.displayPhoto(app.data.photos);
//                 } else {
//                     app.functions.errorPhoto();
//                 }
//             }).fail(() => {
//                 app.functions.errorPhoto();
//             })
//         }
//     },

//     // event handlers
//     events: () => {

//         // run apiCall on submit button click
//         app.elements.submit.on(`click`, () => app.functions.apiCall(`submit`));

//         // run apiCall on random button click
//         app.elements.random.on(`click`, () => app.functions.apiCall(`random`));

//         // update selected city on select change
//         app.elements.cities.change(() => {
//             app.data.selection = app.elements.cities.val();
//             app.elements.submit.attr(`disabled`, false);
//         });
//     },

//     // app initializion
//     init: () => {

//         // reset city selection
//         app.data.selection = ``;
//         app.elements.cities.val(``);

//         // populate city selector
//         app.functions.cities();

//         // enable random button when app is ready
//         app.elements.random.attr(`disabled`, false);

//         // disable submit button until city selection
//         app.elements.submit.attr(`disabled`, true);

//         // add event handlers
//         app.events();
//     }
// }

// initialize the app
// $(document).ready(function () {
//     app.init();
// });