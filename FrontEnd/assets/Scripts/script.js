let baliseMur = document.querySelector('.gallery')
let filtreButton = document.querySelector('.filtres')

document.addEventListener("DOMContentLoaded", gojson)
async function gojson() {    
    const responses = await fetch("http://localhost:5678/api/works")
    const works = await responses.json()
    
    for ( i = 0; i < works.length; i++ ){
        
        baliseMur.innerHTML += '<figure><img src="' + works[i].imageUrl + '"alt="' + works[i].title + '"><figcaption>' + works[i].title + '</figcaption></figure>'
                 
    }
    const filtreByName = [...new Set(works.map(work => work.category.name))]
    //recup des 3 categories de noms pour boutton
//<div><button>tous</button> <button>tous</button> <button>tous</button> <button>tous</button></div>
       
    filtreButton.innerHTML = '<button name="Tous">Tous</button>'
   for( i = 0; i < filtreByName.length; i++ ){
    filtreButton.innerHTML += '<button name="' + filtreByName[i] + '">' + filtreByName[i] + '</button>'
   }
   //totalité des names pour filtre tous
    console.log(works.map(work => work.category.name))
    console.log(filtreByName)
    //filtre des differents buttons
    const name = works.map(work => work.category.name)
        for (let i = name.length -1 ; i >= 0; i-- ){

        if(works[i].category.name != "Objets"){
            works.splice(i,1)
        }}
        console.log(works)
        //boucle pour recuperer que les objets
    }
    
    
