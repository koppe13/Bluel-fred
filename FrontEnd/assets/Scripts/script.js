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
//recupération de la categorie et de l'id par set (dedoublonner) et map recreer un tableau pour les valeurs
  const filtreBefore = [...new Set(works.map((work) => work.category.name + '-' + work.category.id))];
  //console.log(filtreBefore)
  //recuperation du tableau et séparation de l'id et du nom par le split
  const filtreByName = filtreBefore.map(element => element.split('-'))
  //console.log(filtreByName)
  filtreButton.innerHTML +=
  "<button class='filt' onclick=\"filtre('tous')\">Tous</button>";
  //creation des boutons filtres avec generation du name grace au set et map
   for (i = 0; i < filtreByName.length; i++) {
    //creation des filtres dynamiques en recuperant juste le nom de l'emplacement 0 
    filtreButton.innerHTML += "<button class='filt' onclick=\"filtre('" + filtreByName[i][0] + "')\">" + filtreByName[i][0] + "</button>";
    //creation des catégories du formulaire de crea de la modale recup de l'id [1] et le nom du tableau [0]
    baliseCategorie.innerHTML += "<option value='"+ filtreByName[i][1] +"'>" + filtreByName[i][0] + "</option>"
 
  }
 
  //demarrage du site par filtre tous
  filtre("tous");
  //lancement de la fn connexion
  connected();
}

//fonction de filtrage par la valeur name du button selectionné
function filtre(valButton) {
  //filtre des données json par click sur button correspondant
  if (valButton !== "tous") {
    const btnFiltre = donneesJson.filter((donnees) => {
      return donnees.category.name === valButton;
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
    baliseMur.innerHTML += 
    '<figure class="' 
     + afficher[i].id +
      '" id="' 
       + afficher[i].id +
        '"><img src="' 
         + afficher[i].imageUrl +
          '"alt="'
           + afficher[i].title +
            '"></img><figcaption>' 
             + afficher[i].title +
              "</figcaption></figure>"
  }
}
//creation des miniatures avec les trashs
function affichageMiniature() {
  let appear = donneesJson;
  
  baliseMiniat.innerHTML = "";
  for (i = 0; i < appear.length; i++) {
    baliseMiniat.innerHTML +=
      '<div class="'
       + appear[i].id +
        '"><a id="trash" href=""><i class="fa-solid fa-trash-can"></i></a><img src="'
         + appear[i].imageUrl +
          '"alt="'
           + appear[i].title +
            '"></img></div>'
  }
//systeme de suppression par id
  let trash = document.querySelectorAll('#trash')
  trash.forEach(icon => {
   icon.addEventListener('click', function(e) {
    e.preventDefault();
    //recupération de l'id du projet
    let id = e.target.parentElement.parentElement.className;
    //verification de l'existance de l'ID
    let index = donneesJson.findIndex(e => e.id.toString() === id.toString())
//suppression du projet
fetch(`http://localhost:5678/api/works/${id}`, { method: 'DELETE',
             headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} })
          //suppression effectuée   
        .then(() => {
          //Affichage reactif de la suppression
          donneesJson.splice(index, 1);
          //console.log(donneesJson)
          //reaffichage des images du projet mise a jour
        affichageFiltre(donneesJson);
        affichageMiniature();  
   })
      })    
  })

}
function connected() {
  let userConnected = localStorage.getItem("token");
  
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
const returnButton = document.getElementById("returnButton");
const closeButton = document.querySelectorAll('#closeButton');

closeButton.forEach(button => {
  button.addEventListener("click", closeModale);
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


returnButton.addEventListener("click", returnModale)

function returnModale() {
  document.getElementById("modal1").style.display = "flex";
  document.getElementById("filtres").style.display = "none";
  document.getElementById("fenetre").style.display = "flex";
  document.getElementById("ajoutFenetre").style.display = "none";
}


const addPhotoDiv = document.getElementById('preview');
const input = document.getElementById('images');


input.addEventListener('change', (e) => {
    const files = input.files;
    addPhotoDiv.innerHTML = ""; // Effacer le contenu précédent
    document.getElementById("origin").style.display = "none"
    document.getElementById("preview").style.display = "flex"  

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = (event) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = event.target.result;
            thumbnail.width = 127; // Définir la largeur de la vignette
            thumbnail.height = 170; // Définir la hauteur de la vignette
            addPhotoDiv.appendChild(thumbnail);
        };
        reader.readAsDataURL(file);
    }
})
const creerButton = document.getElementById("creer");
const imageInput = document.getElementById("images");
const titreInput = document.getElementById("titre");
const categorieInput = document.getElementById("categorie");

function complet() {
  tempImage = imageInput.files.length > 0;
  tempTitre = titreInput.value.trim() !== "";
  tempCategorie = categorieInput.value.trim() !== "";

  if (tempImage && tempTitre && tempCategorie) {
    creerButton.classList.add("active"); // Active le style vert
    
  } else {
    creerButton.classList.remove("active"); // Retourne au style gris
    
  }
}
// Ajoutez des écouteurs d'événements pour surveiller les changements dans les champs
imageInput.addEventListener("change", complet);
titreInput.addEventListener("input", complet);
categorieInput.addEventListener("change", complet);


creer.addEventListener("click", async function creationProjet(e) {
 e.preventDefault();
    let projetImage = document.querySelector("#images")
    let projetTitre = document.getElementById("titre").value
    let projetCategorie = document.getElementById("categorie").value

    //verification que tous les champs soient remplis
    if (!projetImage.files[0] || !projetTitre || !projetCategorie) {
      alert("Veuillez remplir tous les champs !");
      return;
    }
    
   //creation du projet en formdata 
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
           //res est la reponse du formdata en json
           .then(res => res.json())
           //integration de la ligne dans donnéesjson
                .then(res => {
                   
           donneesJson.push(res);
           //pour faire apparaitre l'integration de la modif du fichier JSon
           affichageFiltre(donneesJson)
           affichageMiniature()
           returnModale()
                })
                .catch(err => {
                    
                })
document.getElementById("formulaire").reset()
addPhotoDiv.innerHTML = "";
document.getElementById("preview").style.display = "none";
document.getElementById("origin").style.display = "flex";

});





