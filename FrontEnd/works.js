// Récupération des travaux et categories depuis l'API
const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

const second_reponse = await fetch("http://localhost:5678/api/categories");
const categories = await second_reponse.json();


// Création d'une fonction qui charge la galerie
async function loadWorks(){

  // Création de la balise galerie qui accueillera les figures
  const divGallery = document.createElement("div");
  divGallery.classList.add("gallery");

  works.forEach((works) => {
  // Récupération de l'élément du DOM qui accueillera les figures
  const gallery = document.querySelector(".gallery");

	// Création d’une balise dédiée à un travail de la galerie
  const galleryElement = document.createElement("figure");

  // Création des attributs de figures
  galleryElement.setAttribute("id",works.id);
  //galleryElement.setAttribute("category_id",works.categoryId);
  //galleryElement.setAttribute("category_name",works.category.name);
  //galleryElement.setAttribute("user_id",works.userId);


  // Création des balises visibles
  const imageElement = document.createElement("img");
  imageElement.src = works.imageUrl;
  imageElement.alt = works.title;
  
  const figcaptionElement = document.createElement("figcaption");
  figcaptionElement.innerHTML = works.title;
  
  // Création des balises invisibles (works)
  //const workId = document.createElement("p");
  //workId.classList.add("work_id");
  //workId.innerHTML = works.id;
  //workId.innerHTML = "";

  const userId = document.createElement("p");
  userId.classList.add("user_id");
  userId.innerHTML = works.userId;
  //userId.innerHTML = "";

  const categoryId = document.createElement("p");
  categoryId.classList.add("categoryId");
  categoryId.innerHTML = works.categoryId;
  //categoryId.innerHTML = "";

  //Création des balises invisibles (categories)
  const category_Id = document.createElement("p");
  category_Id.classList.add("category_id");
  category_Id.innerHTML = works.category.id;
  //category_Id.innerHTML = "";

  const categoryName = document.createElement("p");
  categoryName.classList.add("category_name");
  categoryName.innerHTML = works.category.name;
  //categoryName.innerHTML = "";

  // On rattache les balises enfants à leurs parents
  document.querySelector("#portfolio").appendChild(divGallery);
  divGallery.appendChild(galleryElement);
  galleryElement.appendChild(imageElement);
  galleryElement.appendChild(figcaptionElement);

  //galleryElement.appendChild(workId);
  galleryElement.appendChild(userId);
  galleryElement.appendChild(categoryId);

  galleryElement.appendChild(category_Id);
  galleryElement.appendChild(categoryName);
  })
}

// Création d'une fonction qui filtre les travaux
async function loadFilters(){

  // Création d’une balise dédiée à un travail de la galerie
  const divFilters = document.createElement("div");
  divFilters.classList.add("filters");

  // Création du bouton "Tous"
  const allBtn = document.createElement("button");
  allBtn.classList.add("btn","all");
  allBtn.innerHTML = "Tous";

  // Création des boutons "Categories"
   categories.forEach((categories) => {

    const filterBtn = document.createElement("button");
    filterBtn.innerHTML = categories.name;
    filterBtn.className = categories.name;
    filterBtn.classList.add("btn","filter_btn");
  
    // On rattache les balises enfants à leurs parents
    document.querySelector("#portfolio").appendChild(divFilters);
    divFilters.appendChild(allBtn);
    divFilters.appendChild(filterBtn);
  })
}

// Création d'une fonction qui repositionne les nodes
 async function swapNodes(){

  const portfolio = document.querySelector("#portfolio");
  const divFilters = document.querySelector(".filters");
  const allBtn = document.querySelector(".all");

  // Tu vois ce node(portfolio) / tu met divFilters avant/à la place du second enfant de ce node.
  portfolio.insertBefore(divFilters, portfolio.children[1]);
  divFilters.insertBefore(allBtn, divFilters.children[0]);
}



// Test fonction filtre par ID
const invalidElements = 0;

async function filterObjects() {

  const objectsButton = document.querySelector(".Objets");
  objectsButton.addEventListener("click", function () {
    console.log("Hello")
  });
  loadWorks();
}

// Retourne une liste des figures dont la categoryId est 1
// Affiche les figures dont la categoryId est 1.




// Lance les fonctions suivantes :
loadWorks(); // (works)
loadFilters();
swapNodes();
filterObjects();


// --- Show me --- // 
console.log(works)
console.log(categories)

categories.forEach((categories) => {
  console.log(categories.name)
})

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
