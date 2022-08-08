/* ------------------------------- AMAZING EVENT TASK 3 ---------------------------------*/



var EVENTS_API = "https://amazing-events.herokuapp.com/api/events";

let data = []
async function getDataEvents() {
    await fetch(`${EVENTS_API}`)
        .then(response => response.json())
        .then(json => data = json)



    let datosEventos = data.events;




    // Se crea una fucion para recorrer el array  y filtrar los elementos nombrados por ID 
    function getData() {

        var id = location.search.split("?id=")[1]

        var detailsEvents = datosEventos.find((evento) => {


            return evento._id == id



        })

        // Se imprime el template !
        var templateCardDetails = ""

        templateCardDetails +=
            `<div clas="mainDetails">
    <div class="card-body">
    <div class="d-flex justify-content-end">
    <div class="d-flex  col-md-12 ">
    <img src="${detailsEvents.image}"class="card-img-top" alt="feriaComidas">
<div class="textoCard">
     <h5 class="card-title">${detailsEvents.name}</h5>
    <p class="card-text"> ${detailsEvents.description}</p>
    <div class="contentCard ">
    <p>Date: ${detailsEvents.date}</p> 
     <p>Category:  ${detailsEvents.category}</p>
     <p>Place:  ${detailsEvents.place}</p>
     <p>Capacity:  ${detailsEvents.capacity}</p>
     </div>
     <div class="card-footer">
      <a href="./details.html?_id=${detailsEvents._id}"></a>
      <p>Price: $${detailsEvents.price}</p>
      </div>
      </div>
      </div>
      </div>
     </div>
     </div>`

        document.getElementById('mainCardDetails').innerHTML = templateCardDetails



    }

    getData()

}
data = await getDataEvents()