let baliseMur = document.querySelector('.gallery')
const nameset = new Set ()



//nouveauModule.innerHtml = '<ul><li><button>' + "Tous" + '</button></li></ul>' + '<ul><li><button>' + filtre1 + '</button></li></ul>'
//console.log(nouveauModule.innerHTML)

document.addEventListener("DOMContentLoaded", gojson)
async function gojson() {    
    const responses = await fetch("http://localhost:5678/api/works")
    const works = await responses.json()
   
    for ( i = 0; i < works.lenght; i++ ){
        
        baliseMur.innerHTML += '<figure><img src="' + works[i].imageUrl + '" alt="' + works[i].title + '"><figcaption>' + works[i].title + '</figcaption></figure>'
        nameset.add(works[i].category)
               
        
    }
    const filtreByName = [...new Set(works.map(work => work.category.name))]
    console.log(filtreByName)
}
    //for ( i = 0; i < nameset.size; i++){
    //    nouveauModule.innerHTML += '<ul><li><button>' + nameset[i].value + '</button></li></ul>'
    //const objectFiltre = nameset.filter(function(filtreObject) {
        //return nameset.value === "objects"
     //})
     
    
//}
    
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



//let div =`
      // <div>
         // <ul>
           //  <li><button>${filtre1}</button></li>
          //  <button>${filtre2}</button>
          //  <button>${filtre3}</button>
           // <button>${filtre4}</button>
        //</ul>
    //</div>
//`
//nouveauModule.innerHTML = div




