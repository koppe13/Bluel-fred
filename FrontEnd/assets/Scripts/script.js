let baliseMur = document.querySelector(".gallery");
let filtreButton = document.querySelector(".filtres");

//création du json en dehors de la boucle gojson
let donneesJson

document.addEventListener("DOMContentLoaded", goJson);
async function goJson() {
  const responses = await fetch("http://localhost:5678/api/works");
  const works = await responses.json();
  donneesJson = works;

  const filtreByName = [...new Set(works.map((work) => work.category.name))];
//creation des boutons filtres avec generation du name grasse au set
  filtreButton.innerHTML = "<button onclick=\"filtre('tous')\">Tous</button>";
  for (i = 0; i < filtreByName.length; i++) {
    filtreButton.innerHTML += "<button onclick=\"filtre('" + filtreByName[i] + "')\">" + filtreByName[i] + "</button>";
  }
//demarrage du site par filtre tous
  filtre('tous')
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
        baliseMur.innerHTML += '<figure id="' + afficher[i].id + '"><img src="' + afficher[i].imageUrl + '"alt="' + afficher[i].title + '"><figcaption>' + afficher[i].title + "</figcaption></figure>";
      } 

}
