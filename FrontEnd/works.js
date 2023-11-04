//import { logIn } from "./login.js";

// on appel la fonction pour ajouter le listener au formulaire
//logIn();

// Récupération des travaux et categories depuis l'API
const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

const second_reponse = await fetch("http://localhost:5678/api/categories");
const categories = await second_reponse.json();


// Création d'une fonction qui charge la galerie
function loadWorks(){

  // Création de la balise galerie qui accueillera les figures
  const divGallery = document.createElement("div");
  divGallery.classList.add("gallery");

  works.forEach((work) => {
	// Création d’une balise dédiée à un travail de la galerie
  const galleryElement = document.createElement("figure");

  // Création des attributs de figures
  galleryElement.setAttribute("id",work.id);
  galleryElement.dataset.category_id = work.categoryId;

  // Création des balises visibles
  const imageElement = document.createElement("img");
  imageElement.src = work.imageUrl;
  imageElement.alt = work.title;
  
  const figcaptionElement = document.createElement("figcaption");
  figcaptionElement.innerHTML = work.title;
  
  // Création des balises invisibles (works)
  const userId = document.createElement("p");
  userId.classList.add("user_id");
  userId.innerHTML = work.userId;
  userId.innerHTML = "";

  //Création des balises invisibles (categories)
  const category_Id = document.createElement("p");
  category_Id.classList.add("category_id");
  category_Id.innerHTML = work.category.id;
  category_Id.innerHTML = "";

  const categoryName = document.createElement("p");
  categoryName.classList.add("category_name");
  categoryName.innerHTML = work.category.name;
  categoryName.innerHTML = "";

  // On rattache les balises enfants à leurs parents
  document.querySelector("#portfolio").appendChild(divGallery);
  divGallery.appendChild(galleryElement);
  galleryElement.appendChild(imageElement);
  galleryElement.appendChild(figcaptionElement);
  galleryElement.appendChild(userId);
  galleryElement.appendChild(category_Id);
  galleryElement.appendChild(categoryName);
  })
}

// Création d'une fonction qui charge les boutons de filtrage
function loadButtons(){

  // Création d'une balise parent qui accueillera les boutons
  const divFilters = document.createElement("div");
  divFilters.classList.add("filters");

  // Création du bouton "Tous"
  const allBtn = document.createElement("button");
  allBtn.classList.add("btn","all");
  allBtn.innerHTML = "Tous";

  // On rattache la balise enfant à son parent
  divFilters.appendChild(allBtn);

  // On place l'écouteur qui active la fonction loadFilters
  allBtn.addEventListener("click", () => loadFilters(null))

  // Création des boutons "Categories"
   categories.forEach((categories) => {

    const filterBtn = document.createElement("button");
    filterBtn.innerHTML = categories.name;
    filterBtn.className = categories.name;
    filterBtn.classList.add("btn","filter_btn");
  
    // On rattache les balises enfants à leurs parents
    document.querySelector("#portfolio").appendChild(divFilters);
    divFilters.appendChild(filterBtn);

    // On place un écouteur sur chacun des bouton qui active la fonction loadFilters
    filterBtn.addEventListener("click", () => loadFilters(categories.id))
  })
}

// Création d'une fonction qui filtre les travaux par catégories
function loadFilters(category) {

  // Je déclare ma liste, les elements(figures) que je vais parcourir
  const works = document.querySelectorAll(".gallery > figure");

  // J'affiche toutes les figures par defaut
  works.forEach((element) => {
    element.style.display = "block";
  })

  // Cependant, si la categorie n'est pas null, 
  // je parcours mes elements 
  // et je n'affiche pas les elements dont la categorie est differente
  if (category !== null) {
    works.forEach((work) => {
      if (work.dataset.category_id !== category.toString()) {
        work.style.display = "none";
      }
    })
  }
}


// Lance les fonctions suivantes :
loadButtons();
loadFilters();
loadWorks();


// --- Show me --- // 
console.log(works)
console.log(categories)

// categories.forEach((categories) => {
//   console.log(categories.name)
// })

//--------------------------------------------
//const filterButton = document.querySelector(".filter_btn");
//filterBtn = document.querySelector(".filter_btn");
//filterBtn.classList.add(categories.name)
//const setObjects = new Set([categories[0].name]);
//setObjects.add(categories.name);
// Création des boutons "Categories"
// for (let i = 0; i < categories.length; i++) {

//   const category = categories[i];

//   const filterBtn = document.createElement("button");
//   filterBtn.classList.add("btn","filter_btn");
//   filterBtn.innerHTML = category.name;
//   filterBtn.classList.add(category.id);
  
//   // On rattache les balises enfants à leurs parents
//   document.querySelector("#portfolio").appendChild(divFilters);
//   divFilters.appendChild(allBtn);
//   divFilters.appendChild(filterBtn);

// }
// const classes = new Set();
//     const hotels = { name : "Hotels & restaurants"};
//     classes.add(hotels)

// objectsButton.addEventListener("click", () => {
//   // Je parcours les figures dans mon Works
//     const lookObjects = works.filter(function (works) {
//   // J' affiche les figures dont le nom la categories est égale à Objets
//         return category.name === works[1].category.name;
//     });
//     // 
//     document.querySelector(".gallery").innerHTML = "";
//     loadWorks(lookObjects);
// });
// }
//document.querySelector(".gallery").innerHTML = "";
  //loadWorks(lookObjects);
  

  // window.addEventListener("DOMContentLoaded", (event) => {
  //   objectsButton.addEventListener("click", () => {
  //       return works[categories.name];
  //     });
  //     //document.querySelector(".gallery").innerHTML = "";
  //     //loadWorks(lookObjects);
  //     });
    //au click de objets, afficher les works dont la category name = objet
  
  // 1- Je definie mon bouton Objets
  // 2- Au click du bouton Objets
  // Je parcours les figures dans mon Works
  // J' affiche les figures dont le nom la categories est égale à Objets
  // objectsButton.addEventListener("click", function () {
  //   const lookObjects = works.filter(function (work) {
  //     return works.categoryId === 1;
  //   });
  //   document.querySelector(".gallery").innerHTML = "";
  //   loadWorks(lookObjects);
  // });async function filterButtons() {
  //}
  //const workId = document.createElement("p");
  //workId.classList.add("work_id");
  //workId.innerHTML = works.id;
  //workId.innerHTML = "";
// Récupération de l'élément du DOM qui accueillera les figures
  //const gallery = document.querySelector(".gallery"); // a jeter
  //galleryElement.setAttribute("category_name",works.category.name);
  //galleryElement.setAttribute("user_id",works.userId);
  //const categoryId = document.createElement("p");
  //categoryId.classList.add("categoryId");
  //categoryId.innerHTML = work.categoryId;
  //categoryId.innerHTML = "";
  //galleryElement.appendChild(workId);
  //galleryElement.appendChild(categoryId);

// Création d'une fonction qui repositionne les nodes
// async function swapNodes(){

//   const portfolio = document.querySelector("#portfolio");
//   const divFilters = document.querySelector(".filters");
//   const allBtn = document.querySelector(".all");

//   // Tu vois ce node(portfolio) / tu met divFilters avant/à la place du second enfant de ce node.
//   portfolio.insertBefore(divFilters, portfolio.children[1]);
//   divFilters.insertBefore(allBtn, divFilters.children[0]);
// }

