let clientMail = document.getElementById("conEmail")
let pass = document.getElementById("password")
const connex = document.getElementById("login")

//recupére les valeurs inscritent par utilisateurs (mail et mdp)
connex.addEventListener("click", (event) => {
    let mail = clientMail.value
    console.log(mail)
    let mdp = pass.value
    console.log(mdp)
    console.log(connexion)
    const donnees = [mail, mdp]
    //const infoUser = [{"email": mail,
      //  "password": mdp}]
      //  console.log(infoUser)
   //envoi du mail et du password sur l'api
   // Appel de la fonction fetch avec toutes les informations nécessaires
   async function postJSON(donnees) {
    
        try {
      const reponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST", 
        headers: {
            //'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(donnees),
          //body: {"email": mail,
          //     "password": mdp},
               
      })
      console.log(donnees)  
      const resultat = await reponse.json()
      console.log("Réussite :", resultat)
    } catch (erreur) {
      console.error("Erreur :", erreur)
    }
  }
postJSON(donnees)

})

 //localStorage.setItem('mail', 'mail.value')
//console.log(localStorage)



