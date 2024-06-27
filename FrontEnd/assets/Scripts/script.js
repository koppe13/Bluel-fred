let nouveauModule = document.createElement("div");
let parentModule = document.querySelector("#portfolio h2");
parentModule.appendChild(nouveauModule);

let baliseMur = document.querySelector('.gallery')
const nameset = new Set ()

nouveauModule.innerHtml = '<div>+<ul>+<li>+<button> + "Tous" + </button>+</li>+</ul>+</div>'

document.addEventListener("DOMContentLoaded", gojson)
async function gojson() {    
    const responses = await fetch("http://localhost:5678/api/works")
    const works = await responses.json()
    
    //console.log(works)
    for ( i = 0; i < works.length; i++ ){
        //console.log(works[i])
        //filtre.add(works[i].category)
        //console.log(filtre)
        baliseMur.innerHTML += '<figure><img src="' + works[i].imageUrl + '" alt="' + works[i].title + '"><figcaption>' + works[i].title + '</figcaption></figure>'
        //const filtreByName = works.map(works => works.category.name)
        //console.log(filtreByName)
        //const filtreById = works.map(works => works.category.id)       
        nameset.add(works[i].category.name)
        //nameset.add(works[i].category.id)
        
    }}
    //for ( i = 0; i < nameset.size; i++){
    //    nouveauModule.innerHTML += '<ul><li><button>' + nameset[i].value + '</button></li></ul>'
    //const objectFiltre = nameset.filter(function(filtreObject) {
        //return nameset.value === "objects"
     //})
    const nameSetTableau = Array.from(nameset)
//}
    console.log(nameset)
    //console.log(objectFiltre)
       //const boutonFiltrer = document.querySelector(".btn-filtrer")

      //boutonFiltrer.addEventListener("click", function () {
        
        //})
//                         
//catergory.id
//category.name

//console.log(monSetTous)

//let filtre1 = new Set([a, b, c])
//const filtre2 = new Set(a)
//const filtre3 = new Set(b)
//const filtre4 = new Set(c)

let filtre1 = "Tous"
let filtre2 = nameSetTableau[0]
let filtre3 = nameSetTableau[1]
let filtre4 = nameSetTableau[2]

//let div =`
      // <div>
         // <ul>
           // <button>${filtre1}</button>
          //  <button>${filtre2}</button>
          //  <button>${filtre3}</button>
           // <button>${filtre4}</button>
        //</ul>
    //</div>
//`
nouveauModule.innerHTML = div




