// Récupération des travaux et categories depuis l'API
const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

const second_reponse = await fetch("http://localhost:5678/api/categories");
const categories = await second_reponse.json();


// Création de la balise galerie qui accueillera les figures
const divGallery = document.createElement("div");
divGallery.classList.add("gallery")

function loadCategories(categories){
  for (let i = 0; i < categories.length; i++) {

  const category = categories[i];

// Création des balises invisibles
  const idElement = document.createElement("p");
  idElement.innerHTML = categories[i].id;
  //idElement.innerHTML = "";

  const nameElement = document.createElement("p");
  nameElement.innerHTML = categories[i].name;
  //nameElement.innerHTML = "";
  }
}

// Création d'une fonction qui charge la galerie
function loadWorks(works){
  for (let i = 0; i < works.length; i++) {

  const figure = works[i];

 // Récupération de l'élément du DOM qui accueillera les figures
  const gallery = document.querySelector(".gallery");
  
  // Création d’une balise dédiée à un travail de la galerie
  const galleryElement = document.createElement("figure");

  // Création des balises visibles
  const imageElement = document.createElement("img");
  imageElement.src = works[i].imageUrl;
  imageElement.alt = works[i].title;
  
  const figcaptionElement = document.createElement("figcaption");
  figcaptionElement.innerHTML = works[i].title;
  
  // Création des balises invisibles
  const idElement = document.createElement("p");
  idElement.innerHTML = works[i].id;
  idElement.innerHTML = "";

  const userIdElement = document.createElement("p");
  userIdElement.innerHTML = works[i].userId;
  userIdElement.innerHTML = "";

  const categoryId = categories[i].id;

  // On rattache les balises enfants à leurs parents
  document.querySelector("#portfolio").appendChild(divGallery);
  divGallery.appendChild(galleryElement);
  galleryElement.appendChild(imageElement);
  galleryElement.appendChild(figcaptionElement);

  galleryElement.appendChild(idElement);

  loadCategories(categories);
  }
}

loadWorks(works);
loadCategories(categoryId);

// --- Show me what im doing --- // 
console.log(works)
console.log(idElement)
//console.log(userId)
//console.log(category)



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
//const id = dataset.id;
//fetch(`http://localhost:5678/api/works${id}`);
// const sectionPortfolio = document.querySelector("#portfolio");
// sectionPortfolio.appendChild(divGallery);














      //   <!-- <div class="gallery">
      //   <figure>
      //     <img src="assets/images/abajour-tahina.png" alt="Abajour Tahina">
      //     <figcaption>Abajour Tahina</figcaption>
      //   </figure>
      //   <figure>
      //     <img src="assets/images/appartement-paris-v.png" alt="Appartement Paris V">
      //     <figcaption>Appartement Paris V</figcaption>
      //   </figure>
      //   <figure>
      //     <img src="assets/images/restaurant-sushisen-londres.png" alt="Restaurant Sushisen - Londres">
      //     <figcaption>Restaurant Sushisen - Londres</figcaption>
      //   </figure>
      //   <figure>
      //     <img src="assets/images/la-balisiere.png" alt="Villa “La Balisiere” - Port Louis">
      //     <figcaption>Villa “La Balisiere” - Port Louis</figcaption>
      //   </figure>
      //   <figure>
      //     <img src="assets/images/structures-thermopolis.png" alt="Structures Thermopolis">
      //     <figcaption>Structures Thermopolis</figcaption>
      //   </figure>
      //   <figure>
      //     <img src="assets/images/appartement-paris-x.png" alt="Appartement Paris X">
      //     <figcaption>Appartement Paris X</figcaption>
      //   </figure>
      //   <figure>
      //     <img src="assets/images/le-coteau-cassis.png" alt="Pavillon “Le coteau” - Cassis">
      //     <figcaption>Pavillon “Le coteau” - Cassis</figcaption>
      //   </figure>
      //   <figure>
      //     <img src="assets/images/villa-ferneze.png" alt="Villa Ferneze - Isola d’Elba">
      //     <figcaption>Villa Ferneze - Isola d’Elba</figcaption>
      //   </figure>
      //   <figure>
      //     <img src="assets/images/appartement-paris-xviii.png" alt="Appartement Paris XVIII">
      //     <figcaption>Appartement Paris XVIII</figcaption>
      //   </figure>
      //   <figure>
      //     <img src="assets/images/bar-lullaby-paris.png" alt="Bar “Lullaby” - Paris">
      //     <figcaption>Bar “Lullaby” - Paris</figcaption>
      //   </figure>
      //   <figure>
      //     <img src="assets/images/hotel-first-arte-new-delhi.png" alt="Hotel First Arte - New Delhi">
      //     <figcaption>Hotel First Arte - New Delhi</figcaption>
      //   </figure>
      // </div> -->  