let clientMail = document.getElementById("conEmail")
let pass = document.getElementById("password")
const connex = document.getElementById("login")


connex.addEventListener("click", (event) => {
  
     async function postJSON() {

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
      const reponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST", 
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password }),
          
      })
       
      const resultat = await reponse.json().token
            console.log("Réussite :", resultat)
                        
    } catch (erreur) {
      console.error("Erreur :", erreur)
    }
  }
postJSON()


})



