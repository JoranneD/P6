// Récupération des projets et categories depuis l'API
const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

const second_reponse = await fetch("http://localhost:5678/api/categories");
const categories = await second_reponse.json();

// Charge la galerie
export function loadWorks(){

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

// Charge les boutons de filtrage
export function loadButtons(){

  // Création d'une balise parent qui accueillera les boutons
  const divFilters = document.getElementById("divFilters");

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
    divFilters.appendChild(filterBtn);

    // On place un écouteur sur chacun des bouton qui active la fonction loadFilters
    filterBtn.addEventListener("click", () => loadFilters(categories.id))
  })
}

// Filtre les projets par catégories
function loadFilters(category) {

  // Je déclare ma liste, les elements(figures) que je vais parcourir
  const works = document.querySelectorAll(".gallery > figure");

  // J'affiche toutes les figures par defaut
  works.forEach((element) => {
    element.style.display = "block";
  })

  // Si j'ai une categorie, j'affiche uniquement les figures/projets correspondants
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


//---------------------------------------------
//console.log(works)
//console.log(categories)
// 1- Je m'assure qu'une catégorie est sélectionnée ou définie.
// 2- J'itère sur chaque élément dans le tableau.
// 3- Si les ID de catégorie ne correspondent pas, cela signifie que l'élément de travail ne fait pas partie de la catégorie sélectionnée.
// 4- Si l'élément de travail ne fait pas partie de la catégorie sélectionnée, cela signifie que l'élément sera masqué sur la page.