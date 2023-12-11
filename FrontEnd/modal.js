// Récupération des projets depuis le fichier works.js
import { loadWorks } from './works.js';

// Récupération des categories depuis l'API
const second_reponse = await fetch("http://localhost:5678/api/categories");
const categories = await second_reponse.json();

// Déclaration des variables
const editBtn = document.getElementById('editBtn');
const modal = document.getElementById('modalWindow');
const closeBtn = document.getElementById('closeBtn');
const previousBtn = document.getElementById('previousBtn');
const figureContent = document.querySelector('.figureContent');
const gallery = document.querySelector('.gallery');
const modalTitle = document.querySelector('.modalTitle');
const modalForm = document.querySelector('.modalForm');
const modalSubmitBtn = document.querySelector('.modalSubmitBtn');
const figures = gallery.querySelectorAll('figure');
const key = localStorage.getItem('token');
const formSubmitBtn = document.getElementById('formSubmitBtn');
const photoInput = document.getElementById("photoInput");
const photoUploadIcon = document.querySelector('.photoUpload i');
const photoUploadLabel = document.querySelector('.photoUpload label');
const photoUploadP = document.querySelector('.photoUpload p');
const photoUpload = document.querySelector('.photoUpload');
const titleInput = document.getElementById('selectedTitle');
const categoryInput = document.getElementById('selectedOption');
const category = [categories];
const categoryList = document.getElementById('options');
let selectedOptionId = '';
let enteredTitle = '';
let uploadedFileURL = '';
let blobFile = '';

// Ouvre et gère la modale
export function openModal() {
  // Affiche la modale
  function displayModal() {
    editBtn.addEventListener('click', function() {
    modal.style.display = 'flex';
    });
  }
  // Affiche les catégories
  function loadCategoryList () {
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.setAttribute('id', category.id);
      option.value = category.name;
      categoryList.appendChild(option);
    });
  }
  // Gère le changement de pages
  function switchPages () {
    previousBtn.classList.remove('hidden');
    figureContent.classList.add('hidden');
    modalTitle.textContent = "Ajout photo";
    formSubmitBtn.classList.add('modalSubmitBtn');

    modalForm.classList.remove('hidden');
    modalSubmitBtn.classList.add('hidden');

    previousBtn.addEventListener('click', function() {
      figureContent.classList.remove('hidden');
      previousBtn.classList.add('hidden');
      modalTitle.textContent = "Galerie Photo";
      modalSubmitBtn.textContent = "Ajouter une photo";
      modalForm.classList.add('hidden');
      modalSubmitBtn.classList.remove('hidden');
    });
  }
  // Gère la page de supression
  function displayDeletePage() {
    // Cache les figcaptions
    function hideFigcaptions() {
      const figcaptions = gallery.querySelectorAll('figcaption');

      figcaptions.forEach((figcaption) => {
        figcaption.classList.add('hidden');
      });
    }
    // Supprime les projets
    function deleteWork() {
      // Creation des boutons de suppression
      figures.forEach((figure) => {
        const deleteBtn = document.createElement("div");
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
        
        figure.appendChild(deleteBtn);
  
        // Suppression d'un projet
        deleteBtn.addEventListener('click', function() {
          const figureId = figure.getAttribute('id');
          console.log("Suppression de la figure", figureId);
  
          const fetchPromise = fetch(`http://localhost:5678/api/works/${figureId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + key
            }
          });
  
          fetchPromise
          .then(response => {
            // Gestionnaire de messages d'erreurs
            function loadErrorMessage() {
              // Création du message d'erreur
              const errorBox = document.getElementById("errorSign");
              errorBox.classList.remove('hidden');
              errorBox.innerHTML = "";
          
              const errorMessage = document.createElement("p");
              errorMessage.classList.add("error");
  
              modalSubmitBtn.classList.add("errorStyle");
  
              if (response.status === 401) {
                errorMessage.innerHTML = "Vous n'êtes pas autorisé à effectuer cette opération";
              }
              else {
                errorMessage.innerHTML = "Erreur de serveur interne";
              }
              
              errorBox.appendChild(errorMessage);
          
              // Disparition du message d'erreur
              window.onclick = function(event) {
                if (event.target === modal || event.target == closeBtn || event.target == modalSubmitBtn) {
                  errorBox.classList.add('hidden');
                }
              }
            };
  
            // Si la suppression côté serveur est réussit :
            if (response.status === 200) {
              figure.remove();
            } 
            // Si je ne suis pas autorisé :
            else if (response.status === 401) {
              loadErrorMessage()
            }
            // Si la suppression côté serveur a échoué :
            else {
              loadErrorMessage()
            }
          })
          .catch(error => { 
            loadErrorMessage()
          });
        });
      });
    }
    // Lance les fonctions suivantes :
    hideFigcaptions()
    deleteWork()
  }
  // Gère la page d'ajout
  function displayAddPage() {
    // Gère la prévisualisation
    function loadPreview() {
      photoInput.addEventListener('change', function () {
        // Creation blob et structuration de la page d'ajout
        if (photoInput.files.length > 0) {
          const uploadedFile = photoInput.files[0];
          uploadedFileURL = URL.createObjectURL(uploadedFile);         

          const photoPreview = document.createElement('img');
          photoPreview.setAttribute("id", "photoPreview");
          photoPreview.src = uploadedFileURL;
          photoPreview.classList.add('preview');
          photoUpload.insertBefore(photoPreview, photoUpload.children[3]);

          photoUploadIcon.classList.add('hidden');
          photoUploadLabel.classList.remove('photoInputBtn');
          photoUploadLabel.classList.add('hidden');
          photoInput.classList.add('hidden');
          photoUploadP.classList.add('hidden');

          // Reinitialisation de la page
          window.onclick = function(event) {
            if (event.target === previousBtn || event.target == closeBtn) {

              photoInput.value = '';
              photoPreview.src = '';
              modalForm.reset();

              window.URL.revokeObjectURL(uploadedFileURL);

              photoUploadIcon.classList.remove('hidden');
              photoUploadLabel.classList.add('photoInputBtn');
              photoUploadLabel.classList.remove('hidden');
              photoInput.classList.remove('hidden');
              photoUploadP.classList.remove('hidden');
            }
          }
        }
      })
    }
    // Ajoute les projets
    function addWork() {
      // Gestionnaire de message d'erreurs
      function loadErrorBox(message) {
        // Création du message d'erreur
        const errorBox = document.getElementById("errorForm");
        errorBox.classList.remove('hidden');
        errorBox.innerHTML = "";
    
        const errorMessage = document.createElement("p");
        errorMessage.classList.add("error");
        errorMessage.innerHTML = message;

        formSubmitBtn.classList.add("errorStyleForm");

        errorBox.appendChild(errorMessage);

        // Disparition du message d'erreur
        window.onclick = function(event) {
          if (event.target === modal || event.target == previousBtn || event.target == closeBtn) {
            errorBox.classList.add('hidden');
            formSubmitBtn.classList.remove("errorStyleForm");
            modalForm.reset();
          }
        }
      };
      // Converti une url en blob possédant des données binaires
      function dataURLtoBlob(dataURL) {
        var arr = dataURL.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
    
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
    
        return new Blob([u8arr], { type: mime });
      }

      photoInput.addEventListener('input', async function () {
        if (photoInput.files.length > 0) {
          const uploadedFile = photoInput.files[0];
          uploadedFileURL = URL.createObjectURL(uploadedFile);

          const reader = new FileReader();

          reader.onload = function (event) {
          blobFile = dataURLtoBlob(reader.result);
          };

          reader.readAsDataURL(uploadedFile);
        }
      });

      titleInput.addEventListener('change', function () {
        enteredTitle = titleInput.value;
      });
      
      categoryInput.addEventListener('input', function () {
        const inputValue = categoryInput.value;
      
        const selectedOption = Array.from(categoryList.options).find(option => option.value === inputValue);
      
        if (selectedOption) {
          selectedOptionId = selectedOption.id;
        }
      });

      formSubmitBtn.addEventListener("click", function (event) {
        event.preventDefault();

        if (photoInput.files.length === 0) {
          loadErrorBox("Veuillez remplir tous les champs du formulaire");
        }
        else {
          const chargeUtile = new FormData();
          chargeUtile.append('image', blobFile, 'image.png');
          chargeUtile.append('title', enteredTitle);
          chargeUtile.append('category', selectedOptionId);

          const fetchPromise = fetch('http://localhost:5678/api/works', {
            method: "POST",
            headers: { "Authorization": "Bearer " + key },
            body: chargeUtile
          });

          fetchPromise
          .then(response => {
            console.log(response);
            function loadErrorMessage() {
              function removePreview() {
                modalForm.reset();
                photoInput.value = '';
                photoPreview.src = '';
                photoUploadIcon.classList.remove('hidden');
                photoUploadLabel.classList.add('photoInputBtn');
                photoUploadLabel.classList.remove('hidden');
                photoInput.classList.remove('hidden');
                photoUploadP.classList.remove('hidden');
              }
              // Création du message d'erreur
              const errorBox = document.getElementById("errorForm");
              errorBox.classList.remove('hidden');
              errorBox.innerHTML = "";
          
              const errorMessage = document.createElement("p");
              errorMessage.classList.add("error");
      
              formSubmitBtn.classList.add("errorStyleForm");
      
              errorBox.appendChild(errorMessage);
      
              // Gestion d'erreur
              if (response.status === 400) {
              errorMessage.innerHTML = "Une erreur s'est glissée dans votre formulaire";
              }
              else if (response.status === 401) {
                errorMessage.innerHTML = "Vous n'êtes pas autorisé à effectuer cette opération";
                removePreview()
              }
              else {
                errorMessage.innerHTML = "Erreur de serveur interne";
                removePreview()
              }
          
              // Disparition du message d'erreur
              window.onclick = function(event) {
                if (event.target === modal || event.target == previousBtn || event.target == closeBtn) {
                  errorBox.classList.add('hidden');
                }
              }
            };
            // Ajoute un projet
            function createWork() {
              figures.forEach((figure) => {
                const newFigure = document.createElement('figure');
                gallery.append(newFigure);

                // Id
                newFigure.setAttribute("id",figure.id);

                // Titre
                const newFigureFigcaption = document.createElement("figcaption");
                newFigureFigcaption.innerHTML = figure.title;

                // Image
                const newFigureImage = document.createElement("img");
                newFigureImage.src = figure.imageUrl;
                newFigureImage.alt = figure.title;

                // Categorie
                const newCategoryId = document.createElement("p");
                newCategoryId.innerHTML = figure.category.id;
                newCategoryId.innerHTML = "";

                // Utilisateur
                const newUserId = document.createElement("p");
                newUserId.classList.add("user_id");
                newUserId.innerHTML = work.newUserId;
                newUserId.innerHTML = "";

                gallery.appendChild(newFigureImage);
                gallery.appendChild(newFigureFigcaption);
                gallery.appendChild(newUserId);
                gallery.appendChild(newCategoryId);
              });
            }

            // Si l'ajout côté serveur est réussit :
            if (response.status === 201) {
                createWork();
              }
            // Si l'ajout côté serveur à échoué ou que l'ajout côté serveur n'est pas authorisé :
            else if (response.status === 400 || response.status === 401) {
              loadErrorMessage()
            }
            // Pour tout autre probleme :
            else {
              loadErrorMessage()
            }
          })
          .catch(error => { 
            loadErrorMessage()
          });
        } 
      });
    }
    // Lance les fonctions suivantes :
    loadPreview();
    addWork();
  }
 
  if (editBtn) {
    displayModal();
    loadWorks();
    loadCategoryList();
    
    if (gallery) {
      displayDeletePage();
  
      modalSubmitBtn.addEventListener('click', function() {
        switchPages ();
        displayAddPage();
      });
    }

    figureContent.appendChild(gallery);
  } 
}

// Ferme la modale
export function closeModal() {
  window.addEventListener('click', function(event) {
    if (event.target === modal || event.target === closeBtn) {
      modal.style.display = "none";
    }
  });
}