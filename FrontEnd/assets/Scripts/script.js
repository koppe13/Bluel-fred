let balisemur = document.querySelectorAll('.gallery')

document.addEventListener("DOMContentLoaded", gojson)
async function gojson() {    
    const responses = await fetch("http://localhost:5678/api/works")
    const works = await responses.json()
    //console.log(works)
    //const imageProjet = document.createElement("img")
   

    for ( i in works ){
        //console.log(works[i])
        balisemur.innerHTML += '<img src="' + works[i].imageUrl + '">'
    }

}




