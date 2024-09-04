let baliseMur = document.querySelector(".gallery");
let baliseMiniat = document.getElementById("galerie");
let filtreButton = document.querySelector(".filtres");
let baliseCategorie = document.getElementById("categorie")
//création du json en dehors de la boucle gojson
let donneesJson;
let creer = document.getElementById("creer")


document.addEventListener("DOMContentLoaded", goJson);
async function goJson() {
  const responses = await fetch("http://localhost:5678/api/works");
  const works = await responses.json();
  donneesJson = works;

  const filtreBefore = [...new Set(works.map((work) => work.category.name + '-' + work.category.id))];
  const filtreByName = filtreBefore.map(element => element.split('-'))
  console.log(filtreByName)
  //creation des boutons filtres avec generation du name grace au set
   for (i = 0; i < filtreByName.length; i++) {
    filtreButton.innerHTML += "<button class='filt' onclick=\"filtre('" + filtreByName[i][0] + "')\">" + filtreByName[i][0] + "</button>";
    baliseCategorie.innerHTML += "<option value='"+ filtreByName[i][1] +"'>" + filtreByName[i][0] + "</option>"
 
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
  console.log(afficher)
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
  console.log(appear)
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
    let index = donneesJson.findIndex(e => e.id.toString() === id.toString())

fetch(`http://localhost:5678/api/works/${id}`, { method: 'DELETE',
             headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} })
        .then(
          donneesJson.splice(index, 1),
          console.log(index),
        affichageFiltre(donneesJson),
        affichageMiniature()  
        )
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
  document.getElementById("ajoutFenetre").style.display = "flex";
}

function returnModale() {
  document.getElementById("modal1").style.display = "flex";
  document.getElementById("filtres").style.display = "none";
  document.getElementById("fenetre").style.display = "flex";
  document.getElementById("ajoutFenetre").style.display = "none";
  
}

//let preloadPicture = document.getElementById("addPhoto")
//document.getElementById("images").addEventListener("change", 
//function preloadImage(e) {
//  console.log(e.target.files)
//  preLoadPicture.style.background-image('url("' + e.target.value + '")')

//})

//let preloadPicture = document.getElementById("images")
//preloadPicture.addEventListener("click", preloadImage)
//function preloadImage(url, callback)
//{
//    img = new Image();
//    img.src = url;
//    img.onload = callback;
//}


creer.addEventListener("click", 
async function creationProjet(e) {
 e.preventDefault();
 let projetImage = document.querySelector("#images")
 let projetTitre = document.getElementById("titre").value
 console.log(projetTitre)
 let projetCategorie = document.getElementById("categorie").value
 console.log(projetCategorie)
let formData = new FormData()
console.log(formData)
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
           donneesJson.push(res);
           console.log(donneesJson)
           affichageFiltre(donneesJson)
           affichageMiniature()

            
                     
            
                })
                .catch(err => {
                    console.log(err);
                })
document.formulaire.reset()

});
const addPhoto = document.getElementById('addPhoto');
const input = document.getElementById('images');

input.addEventListener('change', handleFiles)
function handleFiles(files) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    if (!file.type.startsWith("image/")) {
      continue;
    }
    addPhotoDiv.innerHTML = ''
    const img = document.createElement("img");
    img.classList.add("obj");
    img.file = file;
    addPhoto.appendChild(img); // Où  "preview" correspond à l'élément div où on affiche le contenu.

    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}
//const addPhotoDiv = document.getElementById('addPhoto');
//const input = document.getElementById('images');

//input.addEventListener('change', (e) => {
//    const files = input.files;
//    addPhotoDiv.innerHTML = ''; // Effacer le contenu précédent

//    for (let i = 0; i < files.length; i++) {
//        const file = files[i];
//        const reader = new FileReader();
//        reader.onload = (event) => {
//            const thumbnail = document.createElement('img');
//            thumbnail.src = event.target.result;
//            thumbnail.width = 127; // Définir la largeur de la vignette
//            thumbnail.height = 170; // Définir la hauteur de la vignette
//            addPhotoDiv.appendChild(thumbnail);
//        };
//        reader.readAsDataURL(file);
//    }
//});


