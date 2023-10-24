// Récupération des travaux et categories depuis l'API
const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

const second_reponse = await fetch("http://localhost:5678/api/categories");
const categories = await second_reponse.json();


// Création d'une fonction qui charge la galerie
async function loadWorks(){

  // Création de la balise galerie qui accueillera les figures
  const divGallery = document.createElement("div");
  divGallery.classList.add("gallery")

  works.forEach((works) => {
  // Récupération de l'élément du DOM qui accueillera les figures
  const gallery = document.querySelector(".gallery");

	// Création d’une balise dédiée à un travail de la galerie
  const galleryElement = document.createElement("figure");

  // Création des balises visibles
  const imageElement = document.createElement("img");
  imageElement.src = works.imageUrl;
  imageElement.alt = works.title;
  
  const figcaptionElement = document.createElement("figcaption");
  figcaptionElement.innerHTML = works.title;
  
  // Création des balises invisibles (works)
  const workId = document.createElement("p");
  workId.classList.add("work_id");
  workId.innerHTML = works.id;
  //workId.innerHTML = "";

  const userId = document.createElement("p");
  userId.classList.add("user_id");
  userId.innerHTML = works.userId;
  //userId.innerHTML = "";

  //Création des balises invisibles (categories)
  const categoryId = document.createElement("p");
  categoryId.classList.add("category_id");
  categoryId.innerHTML = works.category.id;
  //categoryId.innerHTML = "";

  const categoryName = document.createElement("p");
  categoryName.classList.add("category_name");
  categoryName.innerHTML = works.category.name;
  //categoryName.innerHTML = "";

  // On rattache les balises enfants à leurs parents
  document.querySelector("#portfolio").appendChild(divGallery);
  divGallery.appendChild(galleryElement);
  galleryElement.appendChild(imageElement);
  galleryElement.appendChild(figcaptionElement);

  galleryElement.appendChild(workId);
  galleryElement.appendChild(userId);

  galleryElement.appendChild(categoryId);
  galleryElement.appendChild(categoryName);
  })
}

// Création d'une fonction filtre les travaux
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

async function filterButtons(categories) {

  //au click de objets, afficher les works dont la category name = objet
  const objectsButton = document.querySelector("Objects");

  objectsButton.addEventListener("click", function () {
      const filteredWorks = works.filter(function (works) {
          return works.category.id;
      });
      document.querySelector(".gallery").innerHTML = "";
      loadWorks(filteredWorks);
  });
}


// Lance les fonctions suivantes :
loadWorks(); // (works)
loadFilters();
swapNodes();
filterButtons();


// --- Show me --- // 
console.log(works)
console.log(categories)
console.log(categories[0].id)
console.log(objectsButton)


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
