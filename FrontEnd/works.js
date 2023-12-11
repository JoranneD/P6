// Récupération des projets et categories depuis l'API
const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

const second_reponse = await fetch("http://localhost:5678/api/categories");
const categories = await second_reponse.json();

// Affiche la galerie
export function loadWorks(){

  const divGallery = document.createElement("div");
  divGallery.classList.add("gallery");

  works.forEach((work) => {
  const galleryElement = document.createElement("figure");

  galleryElement.setAttribute("id",work.id);
  galleryElement.dataset.category_id = work.categoryId;

  const imageElement = document.createElement("img");
  imageElement.src = work.imageUrl;
  imageElement.alt = work.title;
  
  const figcaptionElement = document.createElement("figcaption");
  figcaptionElement.innerHTML = work.title;
  
  const userId = document.createElement("p");
  userId.classList.add("user_id");
  userId.innerHTML = work.userId;
  userId.innerHTML = "";

  const category_Id = document.createElement("p");
  category_Id.classList.add("category_id");
  category_Id.innerHTML = work.category.id;
  category_Id.innerHTML = "";

  const categoryName = document.createElement("p");
  categoryName.classList.add("category_name");
  categoryName.innerHTML = work.category.name;
  categoryName.innerHTML = "";

  document.querySelector("#portfolio").appendChild(divGallery);
  divGallery.appendChild(galleryElement);
  galleryElement.appendChild(imageElement);
  galleryElement.appendChild(figcaptionElement);
  galleryElement.appendChild(userId);
  galleryElement.appendChild(category_Id);
  galleryElement.appendChild(categoryName);
  })
}

// Affiche les boutons de filtrage
export function loadButtons(){

  const divFilters = document.getElementById("divFilters");

  const allBtn = document.createElement("button");
  allBtn.setAttribute("id", "allBtn");
  allBtn.classList.add("btn","all");
  allBtn.innerHTML = "Tous";

  divFilters.appendChild(allBtn);

  allBtn.addEventListener("click", () => loadFilters(null))

  categories.forEach((categories) => {

    const filterBtn = document.createElement("button");
    filterBtn.innerHTML = categories.name;
    filterBtn.className = categories.name;
    filterBtn.classList.add("btn","filter_btn");
  
    divFilters.appendChild(filterBtn);

    filterBtn.addEventListener("click", () => {
      loadFilters(categories.id);
      allBtn.blur();
    });
  });

  allBtn.focus();

  document.addEventListener("click", function(event) {
    const clickedElement = event.target;
    
    if (!clickedElement.classList.contains("btn")) {
      allBtn.focus();

      const works = document.querySelectorAll(".gallery > figure");

      works.forEach((element) => {
        element.style.display = "block";
        })
      }
  });
}

// Filtre les projets par catégories
function loadFilters(category) {

  const works = document.querySelectorAll(".gallery > figure");

  works.forEach((element) => {
    element.style.display = "block";
  })

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