
        //creer la div figure//
let div = document.createElement("figure")
       //creer l'element projet qui est une image//
let Projet = document.createElement("img")
       // creer l'element figcaption qui est le sous titre//  
let figcaption = document.createElement("figcaption")
       //donner la source du projet  => image localisation//

Projet.src = "./assets/images/abajour-tahina.png"  
//let textfigcaption = "Abajour Tahina"

//attendre que le Dom soit loader pour faire la fonction//    
    document.addEventListener('DOMContentLoaded', function () {
              // le noeud doit etre fait a partir de section id portfolio div gallery//
        let parentGallery = document.querySelector("#portfolio .gallery")
              //creer la div a partir du noeud//
        parentGallery.appendChild(div)
              //ici le noeud doit etre fait a partir de la div gallery et dans section figure//
        //let figure = document.querySelector("#portfolio .figure")
        let figure = document.getElementById("un")
              // projet est le fils de figure
        figure.appendChild(image1)
              // figcaption est le fils de figure
        figure.appendChild(figcaption)

        //let figure = document.getElementById("deux")
        
        figure.appendChild(image7)
        figure.appendChild(image8)
        //figure.appendChild(image5)
        //figure.appendChild(image2)
        //figure.appendChild(image10)
        //figure.appendChild(image11)
        //figure.appendChild(image6)
        //figure.appendChild(image9)
        //figure.appendChild(image3)
        //figure.appendChild(image4)

 
              //newtitle.textcontent = textfigcaption
              //figure.appendChild(newtitle)

             //let gallery = `
             //    <figcaption>${testfigcaption}</figcation>
             //`
      
        
    } )

    //test
    
    //let imageProjet = document.createElement("img")
    //let monImage = imageProjet
    //document.addEventListener('DOMContentLoaded', () => {
      //  let parentGallery = document.querySelector("#portfolio .gallery")
      //  monImage.src = imageProjet[1]
       // parentGallery = document.getElementById("un")
        //gallery.innerHTML = 'Abajour Tahina'
       // parentGallery.appendChild(imageProjet)
    
    //})
      
    
    
  
    



  







