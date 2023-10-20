// Récupération des travaux depuis l'API
const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

  // Création de la balise galerie qui accueillera les figures
  const divGallery = document.createElement("div");
  divGallery.classList.add("gallery")

 // Récupération de l'élément du DOM qui accueillera les figures
  const gallery = document.querySelector(".gallery");
  
  // Création d’une balise dédiée à un travail de la galerie
  const galleryElement = document.createElement("figure");

  // Création des balises
  const imageElement = document.createElement("img");
  imageElement.src = "assets/images/abajour-tahina.png";
  imageElement.alt = "figure";
  
  const figcaptionElement = document.createElement("figcaption");
  const id = dataset.id;
        fetch(`http://localhost:5678/api/works${id}`);
  figcaptionElement.innerHTML = "abcd";
  
  // On rattache les balises enfants à leurs parents
  const sectionPortfolio = document.querySelector("#portfolio");
  sectionPortfolio.appendChild(divGallery);
  divGallery.appendChild(galleryElement);
  galleryElement.appendChild(imageElement);
  galleryElement.appendChild(figcaptionElement);


//fetch("http://localhost:5678/works/${id}");console.log(sectionPortfolio)
// console.log(titleGallery)
// console.log(gallery)
// console.log(galleryElement)
// console.log(imageElement)
// console.log(figcaptionElement)
//console.log (imageElement.src);


//  AUTRES 
 // Création d’une balise dédiée au titre de la galerie
//  const titleGallery = document.createElement("h2");
//  titleGallery.innerText = "Mes Projets";
//  sectionPortfolio.appendChild(titleGallery);
// document.querySelector(".fiches").innerHTML = '';
// const worksElements = document.querySelectorAll("#portfolio .gallery figure");
// console.log(worksElements)