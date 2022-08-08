/* ----------------------------- HOME CARD EVENTS-------------------------------------- */
var EVENTS_API = "https://amazing-events.herokuapp.com/api/events ";

let data = []
async function getDataEvents() {
    await fetch(`${EVENTS_API}`)
        .then(response => response.json())
        .then(json => data = json)

    let datosEventos = data.events;
    return datosEventos
}
displayCardEvents()


function displayCardEvents() {

    var templateCardHome = ""


    data.forEach(eventoHome => {
        templateCardHome += `<div class="card-index card card-body">
    <img src="${eventoHome.image}"class="card-img-top"alt="feriaComidas">

    <h5 class="card-title">${eventoHome.name}</h5>
    <p class="card-text">${eventoHome.description}</p>
    <p class="card-text">Date:${eventoHome.date}</p>

    <div class="card-footer">

        <a href="./details.html?_id=${eventoHome._id}" class="btn btn-primary card-style">See more...</a>
        <p class="card-text">$${eventoHome.price}</p>
       
    </div>
  </div>`

        document.getElementById('mainCard').innerHTML = templateCardHome

    });




}

data = await getDataEvents()