var selectedCheck = [];
var wrintingSearch = ""



/* <-----------------------------------Amazing Events Taks 3 -------------------------------------> */

var EVENTS_API = "https://amazing-events.herokuapp.com/api/events ";

let data = []
async function getDataEvents() {
    await fetch(`${EVENTS_API}`)
        .then(response => response.json())
        .then(json => data = json)

    let dataFecha = data.currentDate
    let datosEventos = data.events;
    let arrayUpcoming = datosEventos.filter(e => dataFecha < e.date)


    // Creacion y ejecucion de los checkbox (category)


    function displayCheckBox() {

        var checkCategory = document.getElementById("checkBox")
        var allCategory = arrayUpcoming.map(eventoCheck => eventoCheck.category)
        let arrayCheckbox = new Set(allCategory) // crea un obejto en valor de la variable y le asigna propiedades sacando los valores repetidos

        var checkBox = [...arrayCheckbox] // crea los un array con los valores  de arrayCheckbox


        var templateCheckBox = ""

        checkBox.forEach(category => { // recorre el array para retornar el valor impreso en el html


            templateCheckBox += `
     <label>
     <input type=checkbox value="${category}">
     ${category}</label>`

        })

        checkCategory.innerHTML = templateCheckBox




    }
    displayCheckBox()




    var checkBoxes = document.querySelectorAll('input[type=checkbox]') // a partir de  la variable llama a todos los selectores de tipo input
    checkBoxes.forEach(check => check.addEventListener("click", (event) => {
        var checkOk = event.target.checked;


        if (checkOk) { // toma el valor de la variable si esta chekeado devuelve un valor true
            selectedCheck.push(event.target.value)

            arraySearch() // Funcion que filtra al array.
        } else {
            selectedCheck = selectedCheck.filter(uncheck => uncheck !== event.target.value)


            arraySearch() // Funcion que filtra al array.
        }


    }))



    var search = document.getElementById("label-search")

    search.addEventListener("keyup", (event) => {
        wrintingSearch = event.target.value
        arraySearch() // Llamador de la funcion

    })

    function arraySearch() {

        let searchData = []

        if (selectedCheck.length > 0 && wrintingSearch !== "") {
            selectedCheck.map(categorys => {
                searchData.push(...arrayUpcoming.filter(eventos => eventos.name.toLowerCase().includes(wrintingSearch.trim().toLowerCase()) &&
                    eventos.category == categorys))

            })

        } else if (selectedCheck.length > 0 && wrintingSearch === "") {
            selectedCheck.map(categorys => searchData.push(...arrayUpcoming.filter(eventos => eventos.category == categorys)))
        } else if (selectedCheck.length == 0 && wrintingSearch !== "") {
            searchData.push(...arrayUpcoming.filter(eventos => eventos.name.toLowerCase().includes(wrintingSearch.trim().toLowerCase())))
        } else {
            searchData.push(...arrayUpcoming)

        }

        displayCardEvents(searchData)
    }
    arraySearch()



    function displayCardEvents(array) {

        let templateCard = ""
        if (array.length > 0) {

            array.forEach(eventoHome => {
                templateCard += `<div class=" card-index card card-body ">
          <img src="${eventoHome.image}" class="card-img-top" alt="feriaComidas">
     
         <h5 class="card-title">${eventoHome.name}</h5>
         <p class="card-text">${eventoHome.description}</p>
          <p class="card-text">Date: ${eventoHome.date}</p>
          <p class="card-text">Category:  ${eventoHome.category}</p>
          <div class="card-footer">
                <a href="./details.html?id=${eventoHome._id}" class="btn btn-primary card-style">See more...</a>
            <p class="card-text">$${eventoHome.price}</p>
            
         </div>
       </div>`

                document.getElementById('mainCardUp').innerHTML = templateCard

            });

        } else {
            document.getElementById('mainCardUp').innerHTML = templateCard = `<p>No hay ningun resultado</p>`
        }


    }
    return arrayUpcoming
}
data = await getDataEvents()