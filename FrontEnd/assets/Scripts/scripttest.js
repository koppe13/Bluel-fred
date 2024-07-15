let baliseMur = document.querySelector(".gallery");
let filtreButton = document.querySelector(".filtres");

//const button = document.querySelector("button")
let donneesJson

document.addEventListener("DOMContentLoaded", gojson);
async function gojson() {
  const responses = await fetch("http://localhost:5678/api/works");
  const works = await responses.json();
  donneesJson = works;

  const filtreByName = [...new Set(works.map((work) => work.category.name))];

  filtreButton.innerHTML = "<button onclick=\"filtre('tous')\">Tous</button>";
  for (i = 0; i < filtreByName.length; i++) {
    filtreButton.innerHTML += "<button onclick=\"filtre('" + filtreByName[i] + "')\">" + filtreByName[i] + "</button>";
  }
  for (i = 0; i < works.length; i++) {
    baliseMur.innerHTML += '<figure id="' + works[i].id + '" style="display:none;" ><img src="' + works[i].imageUrl + '"alt="' + works[i].title + '"><figcaption>' + works[i].title + "</figcaption></figure>";
  }
  
  //filtre('tous')
}

function filtre(valButton) {
  console.log(valButton);
let donneesFiltrees = donneesJson
  const name = donneesJson.map((work) => work.category.name);
if (valButton !== 'tous'){
        for (let i = name.length - 1; i >= 0; i--) {
             if (donneesFiltrees[i].category.name != valButton) {
                donneesFiltrees.splice(i, 1);
    }
    
  }
for ( i = 0; i<donneesFiltrees.length; i++){
    document.getElementById(donneesFiltrees[i].id).style.display="block"
}
    
}else {

    for ( i = 0; i<donneesFiltrees.length; i++){
        document.getElementById(donneesFiltrees[i].id).style.display="block"
    }
    
}
  
}
function affichageFiltre(afficher) {
    baliseMur.innerHTML = ""
    

}
const button = document.getElementById("button");

button.addEventListener("click", (event) => {
  button.innerHTML = `Nombre de clics : ${event.detail}`;
});