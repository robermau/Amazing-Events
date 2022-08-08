let EVENTS_API = "https://amazing-events.herokuapp.com/api/events";
let datosEventos;

async function getData() {
    await fetch(`${EVENTS_API}`)
        .then(response => response.json())
        .then(json => data = json)

    datosEventos = data.events;

    let dataFecha = data.currentDate
    let pastArray = datosEventos.filter(e => dataFecha > e.date)
    let arrayFuture = datosEventos.filter(e => dataFecha < e.date)


    /*------------------- Tabla Uno ----------------------*/

    let percentaje = []

    pastArray.map(eventos => {
        percentaje.push({
            eventos: eventos.name,
            perAssist: (eventos.assistance * 100 / eventos.capacity).toFixed(2)
        })
    })
    let max = percentaje.sort((a, b) => b.perAssist - a.perAssist)[0]

    let min = percentaje.sort((a, b) => a.perAssist - b.perAssist)[0]

    let capacity = pastArray.filter(e => e.capacity).sort((a, b) => b.capacity - a.capacity)[0]





    /* ----------- Eventos Futuros -------*/

    const categoryAssistance = arrayFuture.map(eventos => eventos.category)
    const categorySetter = new Set(categoryAssistance)
    const categoryFuture = [...categorySetter]


    const categoryValue = []
    categoryFuture.map(category =>
        categoryValue.push({
            category: category,
            evento: arrayFuture.filter(evento => evento.category === category),

        })

    )
    console.log(categoryFuture)

    console.log(arrayFuture)
    let estimateAndCapFuture = []
    categoryValue.map(dats => {
        estimateAndCapFuture.push({
            category: dats.category,
            estimate: dats.evento.map(items => items.estimate),
            capacity: dats.evento.map(items => items.capacity),
            revenueEstimate: dats.evento.map(items => items.estimate * items.price)
        })

    })
    console.log(estimateAndCapFuture)
    estimateAndCapFuture.forEach(category => {
            let totalEstimate = 0
            category.estimate.forEach(estimate => totalEstimate += Number(estimate))
            category.estimate = totalEstimate

            let totalCapFuture = 0
            category.capacity.forEach(capacity => totalCapFuture += Number(capacity))
            category.capacity = totalCapFuture

            let totalRenueEstimate = 0
            category.revenueEstimate.forEach(revenueEstimate => totalRenueEstimate += Number(revenueEstimate))
            category.revenueEstimate = totalRenueEstimate

            category.percentajeAtten = ((totalEstimate * 100) / totalCapFuture).toFixed(2)


        })
        /*-------------------------------------- EVENTS PAST------------------------------ */




    const AssistenceCategory = pastArray.map(eventos => eventos.category)
    const categorySet = new Set(AssistenceCategory)
    const categorys = [...categorySet]


    const categoryPastValue = []
    categorys.map(category =>
        categoryPastValue.push({
            category: category,
            evento: pastArray.filter(evento => evento.category === category)
        })
    )
    console.log(categorys)
    console.log(pastArray)
    let assistenceCapacityPast = []
    categoryPastValue.map(dates => {
        assistenceCapacityPast.push({
            category: dates.category,
            assistance: dates.evento.map(items => items.assistance),
            capacity: dates.evento.map(items => items.capacity),
            revenue: dates.evento.map(items => items.assistance * items.price)



        });
    })
    console.log(assistenceCapacityPast)
    console.log(categoryPastValue)

    assistenceCapacityPast.forEach(category => {
        let totalAssist = 0
        category.assistance.forEach(assistance => totalAssist += Number(assistance))
        category.assistance = totalAssist

        let totalCap = 0
        category.capacity.forEach(capacity => totalCap += Number(capacity))
        category.capacity = totalCap

        let totalRenue = 0
        category.revenue.forEach(revenue => totalRenue += Number(revenue))
        category.revenue = totalRenue

        category.percentaje = ((totalAssist * 100) / totalCap).toFixed(2)


    })

    /*-------------------- Tabla Impresion ---------------*/

    function FirstTable() {


        let primerContenedor = ` <table class="table  table-bordered table-dark  ">
        <thead>
            <tr>

                <th colspan="3" class="table-warning">Events statisctics</th>
            </tr>
            <tr>
                <td>Events with highest of attendace</td>
                <td>Events with the lowest percentage off attendace</td>
                <td>Event with larger capacity</td>
            </tr>
        </thead>
        <tbody>

            <tr>

                <td>${max.eventos}: ${max.perAssist}%</td>
                <td>${min.eventos}: ${min.perAssist}%</td>
                <td>${capacity.name}: ${capacity.capacity}</td>

            </tr>

        </tbody>

    </table>`



        document.getElementById("tableOne").innerHTML = primerContenedor


    }

    FirstTable()





    function secondTable() {
        let segundoContenedor = `<table class="table table-bordered table-dark">
      <thead>
        <tr>

            <th colspan="3" class="table-warning">Upcoming events statisctics by category</th>


        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Categories</td>
            <td>Revenues</td>
            <td>Percentage of attendace</td>

        </tr>
        <tr>`
        estimateAndCapFuture.forEach(e => {
            e.estimateAndCapFuture
            segundoContenedor += `<tr>

            <td>${e.category}</td>
           <td>$${e.revenueEstimate}</td>
             <td>${e.percentajeAtten}%</td>
            
        </tr> `
        })

        document.getElementById("tableTwo").innerHTML = segundoContenedor


    }
    secondTable()


    function thirdTable() {
        let tercerContenedor = `<table class="table table-bordered table-dark">
        <thead>
          <tr>
  
              <th colspan="3" class="table-warning">Past Events statisctic by category</th>
  
  
          </tr>
      </thead>
      <tbody>
          <tr>
              <td>Categories</td>
              <td>Revenues</td>
              <td>Percentage of attendace</td>
  
          </tr>
          <tr>`
        assistenceCapacityPast.forEach(e => {
            e.assistenceCapacityPast
            tercerContenedor += `<tr>
  
              <td>${e.category}</td>
             <td>$${e.revenue}</td>
               <td>${e.percentaje}%</td>
              
          </tr> `
        })

        document.getElementById("tableThree").innerHTML = tercerContenedor


    }


    thirdTable()


}
getData()