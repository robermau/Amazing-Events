let data = []


var arrayUpcoming;


/* -------------------------------------  CARDS PASS EVENT -----------------------------*/
var EVENTS_API = "https://amazing-events.herokuapp.com/api/events";


async function getDataEvents() {
    await fetch(`${EVENTS_API}`)
        .then(response => response.json())
        .then(json => data = json)

    var daysEvents = data.currentDate;

    var arrayDataEvents = data.events;

    arrayUpcoming = arrayDataEvents.filter(e => daysEvents < e.date)

    return [daysEvents, arrayDataEvents]
}
data = await getDataEvents()
var DateEvents = data[0]
var cardEvents = data[1]


function displayCardUpcoming() {


    var templateCardUpcoming = ""

    arrayUpcoming.forEach(eventoUp => {



        templateCardUpcoming += `<div class=" card-index card card-body ">
      <img src="${eventoUp.image}" class="card-img-top" alt="feriaComidas">
  
      <h5 class="card-title">${eventoUp.name}</h5>
      <p class="card-text">${eventoUp.description}</p>
      <p class="card-text">Date: ${eventoUp.date}</p>
  
      <div class="card-footer">
  
          <a href="./details.html?id=${eventoUp.id}" class="btn btn-primary card-style">See more...</a>
          <p class="card-text">$${eventoUp.price}</p>
      </div>
    </div>`


        document.getElementById('mainCardUp').innerHTML = templateCardUpcoming
    });
}
displayCardUpcoming()