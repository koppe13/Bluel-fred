let baliseMur = document.querySelector(".gallery");
let baliseMiniat = document.getElementById("galerie");
let filtreButton = document.querySelector(".filtres");
let baliseCategorie = document.getElementById("categorie")
//création du json en dehors de la boucle gojson
let donneesJson;

document.addEventListener("DOMContentLoaded", goJson);
async function goJson() {
  const responses = await fetch("http://localhost:5678/api/works");
  const works = await responses.json();
  donneesJson = works;

  const filtreBefore = [...new Set(works.map((work) => work.category.name + '-' + work.category.id))];
  const filtreByName = filtreBefore.split('-')
  console.log(filtreByName[1])
  //creation des boutons filtres avec generation du name grace au set
   for (i = 0; i < filtreByName.length; i++) {
    filtreButton.innerHTML += "<button class='filt' onclick=\"filtre('" + filtreByName[i] + "')\">" + filtreByName[i] + "</button>";
    baliseCategorie.innerHTML += "<option value='"+ filtreByName[i] +"'>" + filtreByName[i] + "</option>"
 
  }
  filtreButton.innerHTML +=
  "<button class='filt' onclick=\"filtre('tous')\">Tous</button>";
  //demarrage du site par filtre tous
  filtre("tous");
  connected();
}

//fonction de filtrage par la valeur name du button selectionné
function filtre(valButton) {
  //filtre des données json par click sur button correspondant
  if (valButton !== "tous") {
    const btnFiltre = donneesJson.filter((donnees) => {
      return donnees.category.name == valButton;
    });
    //données filtrées par button
    affichageFiltre(btnFiltre);
  } else {
    //données non-filtrées par defaut
    affichageFiltre(donneesJson);
  }
}

//creation de l'affichage par boucle et valeur
function affichageFiltre(afficher) {
  baliseMur.innerHTML = "";
  for (i = 0; i < afficher.length; i++) {
    baliseMur.innerHTML += '<figure class="' 
    + afficher[i].id +
     '" id="' 
     + afficher[i].id +
      '"><img src="' 
      + afficher[i].imageUrl + '"alt="' + afficher[i].title + '"></img><figcaption>' +
      afficher[i].title + "</figcaption></figure>"
  }
}

function affichageMiniature() {
  let appear = donneesJson;
  baliseMiniat.innerHTML = "";
  for (i = 0; i < appear.length; i++) {
    baliseMiniat.innerHTML +=
      '<div class="' + appear[i].id + '"><img src="' + appear[i].imageUrl + '"alt="' + appear[i].title + '"><a id="trash" href=""><i class="fa-solid fa-trash-can"></i></a></img></div>'
  }

  let trash = document.querySelectorAll('#trash')
  trash.forEach(icon => {
   icon.addEventListener('click', function(e) {
    e.preventDefault();
    let id = e.target.parentElement.parentElement.className; // faire plus propre!!!
    console.log(id)

fetch(`http://localhost:5678/api/works/${id}`, { method: 'DELETE',
             headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} })
        .then(() => Element.innerHTML = "projet supprimé")
      })    
  })

}
 

function connected() {
  let userConnected = localStorage.getItem("token");
  console.log(userConnected);
  if (userConnected !== null) {
    document.getElementById("con").style.display = "none";
    document.getElementById("decon").style.display = "inline";
    document.getElementById("modale").style.display = "inline";
    document.getElementById("filtres").style.display = "none";
    document.getElementById("modEdition").style.display = "flex";
  }
}

decon.addEventListener("click", deconnexion);
function deconnexion() {
  if (document.getElementById("decon").style.display == "inline") {
    document.getElementById("con").style.display = "inline";
    document.getElementById("decon").style.display = "none";
    document.getElementById("modEdition").style.display = "none";
    window.localStorage.clear();
  }
}

modale.addEventListener("click", modified);
function modified() {
  document.getElementById("modal1").style.display = "flex";
  document.getElementById("filtres").style.display = "none";
  document.getElementById("fenetre").style.display = "flex";
  affichageMiniature();
}


modal1.addEventListener("click", function (event) {
  event.stopPropagation();
  modal = document.getElementById("modal1");
  if (event.target == modal) {
    closeModale();
  }
});

function closeModale() {
  document.getElementById("fenetre").style.display = "none";
  document.getElementById("modal1").style.display = "none";
  document.getElementById("ajoutFenetre").style.display = "none";
}

let addProject = document.getElementById('nextModale')
addProject.addEventListener("click", ajout);
function ajout() {
  document.getElementById("modal1").style.display = "flex";
  document.getElementById("filtres").style.display = "none";
  document.getElementById("fenetre").style.display = "none";
  document.getElementById("ajoutFenetre").style.display = "inline";
}

function returnModale() {
  document.getElementById("modal1").style.display = "flex";
  document.getElementById("filtres").style.display = "none";
  document.getElementById("fenetre").style.display = "flex";
  document.getElementById("ajoutFenetre").style.display = "none";
}

let creer = document.getElementById("creer")

creer.addEventListener("click", 
async function creationProjet(e) {
 e.preventDefault();
let projetImage = document.querySelector("#images")
let projetTitre = document.getElementById("titre").value
let projetCategorie = document.getElementById("categorie").value

let formData = new FormData()

          formData.append("image", projetImage.files[0])
          formData.append("title", projetTitre)
          formData.append("category", projetCategorie)

await fetch(`http://localhost:5678/api/works`, { 
  method: 'POST',
  body: formData,
  headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,

            },
  
           })
           .then(res => res.json())
                .then(res => {
                    console.log(res);                   
                })
                .catch(err => {
                    console.log(err);
                })
document.formulaire.reset()
});


