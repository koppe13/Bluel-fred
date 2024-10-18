const connex = document.getElementById("login")
const decon = document.getElementById("logout")
const section = document.getElementById("connexion")

    connex.addEventListener("click", (event) => {
    event.preventDefault()
  
  async function postJSON() {

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      
  //envoi du mail et du password sur l'api
  // Appel de la fonction fetch avec toutes les informations nécessaires
      try {
        const reponse = await fetch("http://localhost:5678/api/users/login", {
          method: "POST", 
          headers: {
             'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password }),
          
      })
       
      const resultat = await reponse.json()
      
      if (resultat.token){
            window.localStorage.setItem("token", resultat.token)
            return window.location = "index.html"
            

      }else{
        throw new Error()
      }
     
    } catch (erreur) {
      afficherMessageErreur()
      }
      
    }
    function afficherMessageErreur () {
        let spanError = document.createElement("span")
        
    if (!document.querySelector("#connexion > span")){   
        spanError.innerText = "le mail ou le mot de passe est érroné(s)"
        connexion.append(spanError)
    }
        
        document.getElementById("login").disabled = true
  }
  
postJSON ()

})

section.addEventListener("change", () => {
  
  // On fait la vérification.
  const utilMail = document.getElementById("email").value;
  const utilPass = document.getElementById("password").value
  console.log(utilMail)
  console.log(utilPass)
  if ( utilMail && utilPass ) {
    connex.disabled = false
  }else {
    connex.disabled = true
  }
})
//let regex = new RegExp("^[a-z]+$");
  //let resultat = regex.test(chaine);
  //console.log(resultat); // Affiche true.
  //[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+ mail
  //[a-z0-9._-]+ mdp


