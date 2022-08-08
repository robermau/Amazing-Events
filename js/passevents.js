 // Variables globales.

 let data = []


 var arrayPass;


 /* -------------------------------------  CARDS PASS EVENT -----------------------------*/
 var EVENTS_API = "https://amazing-events.herokuapp.com/api/events";


 async function getDataEvents() {
     await fetch(`${EVENTS_API}`)
         .then(response => response.json())
         .then(json => data = json)

     var daysEvents = data.currentDate;

     var arrayDataEvents = data.events;

     arrayPass = arrayDataEvents.filter(e => daysEvents > e.date)

     return [daysEvents, arrayDataEvents]
 }
 data = await getDataEvents()
 var DateEvents = data[0]
 var cardEvents = data[1]



 function displayCardPass() {

     var templateCardPass = ""

     arrayPass.forEach(eventosPass => {


         templateCardPass += `<div class=" card-index card card-body ">
       <img src="${eventosPass.image}" class="card-img-top" alt="feriaComidas">
   
       <h5 class="card-title">${eventosPass.name}</h5>
       <p class="card-text">${eventosPass.description}</p>
       <p class="card-text">Date: ${eventosPass.date}</p>
   
       <div class="card-footer">
   
           <a href="./details.html?id=${eventosPass.id}" class="btn btn-primary card-style">See more...</a>
           <p class="card-text">$${eventosPass.price}</p>
       </div>
     </div>`


         document.getElementById('mainCardPass').innerHTML = templateCardPass
     });
 }
 displayCardPass()