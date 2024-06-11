//let balisemur = document.querySelectorAll('.gallery figure')
//console.log(balisemur)

//for (let i = 0; i < balisemur.length; i++) {
//    console.log(balisemur[i])
//}

//function demarrage () {
   //let photo = document.getElementById('un')
    //let murImage = document.createElement("img")

   // photo.src = imageProjet[1]

    
//document.figure.appendChild(image1)
//}


async function getWorks() 
{
    try 
    {
        const response = await fetch("http://localhost:5678/api/works");
        const works = await response.json();

     console.log(works);
    } 
    catch(error)
    {
        console.error(error);
    }
}
getWorks();