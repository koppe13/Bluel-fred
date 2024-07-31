let baliseMur = document.querySelector(".gallery");
let baliseMiniat = document.getElementById("galerie")
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

function affichageMiniature() {
    let appear = donneesJson
    baliseMiniat.innerHTML = ""
    for (i = 0; i < appear.length; i++) {
    baliseMiniat.innerHTML += '<div><img src="' + appear[i].imageUrl + '"alt="' + appear[i].title + '"><a href=""><i class="fa-solid fa-trash-can"></i></a></img></div>';
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
    document.getElementById("modEdition").style.display="inline-block"
    }
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

modale.addEventListener("click", modified)
  function modified(){
    document.getElementById("modal1").style.display="flex"
    document.getElementById("filtres").style.display="none"
    document.getElementById("fenetre").style.display="inline"
    affichageMiniature()
    //baliseMiniat.appendChild(affichageMiniature())
    //document.getElementById("galerie").innerHTML = affichageMiniature()
    
  }
//modal1.addEventListener("click", closeModale)
function closeModale(){
   document.getElementById("fenetre").style.display="none"
   document.getElementById("modal1").style.display="none"
   //document.getElementById("filtres").style.display="inline"
   
  }
//graphic art pour eviter de fermer la fenetre modale en cliquant dessus
//const stoppropagation = function (e) {
//  e.stoppropagation()
//}



  //const goModal = function goModal (e) {
//    e.preventDefault()
//    const target = document.querySelector(e.target.getAttribute('href'))
//    target.style.display = null
//    target.removeAttribute('aria-hidden')
//    target.setAttribute('aria-modal', true)

//  document.querySelectorAll('.mod').forEach(a => {
//    a.addEventListener('click', goModal) 
     
//  })}

  //  const target = document.querySelector(event.target.getattribute('href'))
 //   target.style.display = null