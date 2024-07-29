let baliseMur = document.querySelector(".gallery");
let baliseMiniat = document.querySelector(".galerie")
let filtreButton = document.querySelector(".filtres");

//création du json en dehors de la boucle gojson
let donneesJson

document.addEventListener("DOMContentLoaded", goJson)
async function goJson() {
  const responses = await fetch("http://localhost:5678/api/works")
  const works = await responses.json();
  donneesJson = works;

  const filtreByName = [...new Set(works.map((work) => work.category.name))];
//creation des boutons filtres avec generation du name grace au set
  filtreButton.innerHTML = "<button onclick=\"filtre('tous')\">Tous</button>";
  for (i = 0; i < filtreByName.length; i++) {
    filtreButton.innerHTML += "<button onclick=\"filtre('" + filtreByName[i] + "')\">" + filtreByName[i] + "</button>";
  }
//demarrage du site par filtre tous
  filtre('tous')
  connected()
}


//fonction de filtrage par la valeur name du button selectionné
function filtre(valButton) {
  console.log(valButton);
//filtre des données json par click sur button correspondant  
if (valButton !== 'tous'){
       const btnFiltre = donneesJson.filter((donnees)=> {return donnees.category.name == valButton})
//données filtrées par button
    affichageFiltre(btnFiltre)
}else {
//données non-filtrées par defaut
    affichageFiltre(donneesJson)}
}


//creation de l'affichage par boucle et valeur
function affichageFiltre(afficher) {
    baliseMur.innerHTML = ""
    for (i = 0; i < afficher.length; i++) {
        baliseMur.innerHTML += '<figure id="' + afficher[i].id + '"><img src="' + afficher[i].imageUrl + '"alt="' + afficher[i].title + '"></img><figcaption>' + afficher[i].title + "</figcaption></figure>";
      } 
}

function affichageMiniature(appear) {

    //baliseMiniat.innerHTML = ""
    for (i = 0; i < appear.length; i++) {
        baliseMiniat.innerHTML += '<img src="' + appear[i].imageUrl + '"alt="' + appear[i].title + '"></img>';
      } 
}

  function connected(){
    let userConnected = localStorage.getItem("token")
    console.log(userConnected)
    if ( userConnected !== null ){
    document.getElementById("con").style.display="none"
    document.getElementById("decon").style.display="inline"
    document.getElementById("modale").style.display="inline"
    document.getElementById("filtres").style.display="none"
    //document.getElementById("modEdition").style.display="inline-block"
    }
  } 
  modale.addEventListener("click", modified)
  function modified(){
    document.getElementById("modal1").style.display="inline"
    document.getElementById("filtres").style.display="none"
    document.getElementById("galerie").innerHTML = affichageMiniature()
    //affichageMiniature()
    }
   
    //faire apparaitre le modifier pour la modale
  
  decon.addEventListener("click", deconnexion)
  function deconnexion(){
  if (document.getElementById("decon").style.display=="inline"){
      document.getElementById("con").style.display="inline"
      document.getElementById("decon").style.display="none"
      document.getElementById("modEdition").style.display="none"
      window.localStorage.clear()
  }}
//const OpenModal = function GoModal (event) {
 //   event.preventDefault()
  //  const target = document.querySelector(event.target.getattribute('href'))
 //   target.style.display = null
//}
//}