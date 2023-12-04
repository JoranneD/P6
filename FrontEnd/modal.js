import { loadWorks } from './works.js';

const second_reponse = await fetch("http://localhost:5678/api/categories");
const categories = await second_reponse.json();

// Je déclare les variables en dehors des fonctions pour les rendre accessibles à toutes les fonctions
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


export function openModal() {
  // Je déclare ici les fonctions que j'appelerai plus bas dans le code
  function displayModal() {
    // J' ajoute un écouteur d'événements au clic sur editBtn
    editBtn.addEventListener('click', function() {
    // Je rend la modale visible
    modal.style.display = 'flex';
    });
  }
  function loadCategoryList () {
    categories.forEach((category) => {
      const option = document.createElement("option");
      //option.dataset.categoryId = category.id;
      option.setAttribute('id', category.id);
      option.value = category.name;
      categoryList.appendChild(option);
      //console.log(category.name, category.id)
    });
  }
  function switchPages () {
    // J'affiche la fleche precedent
    previousBtn.classList.remove('hidden');
    // Je masque la galerie
    figureContent.classList.add('hidden');
    // Je change le titre en "Ajout photo"
    modalTitle.textContent = "Ajout photo";
    formSubmitBtn.classList.add('modalSubmitBtn');

    // J'affiche le formulaire
    modalForm.classList.remove('hidden');
    // Je masque modalSubmitBtn (bouton qui me permet de "changer" de page de modal)
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
  function displayDeletePage() {
    function hideFigcaptions() {
      // Récupérez tous les éléments figcaption à l'intérieur de la galerie
        const figcaptions = gallery.querySelectorAll('figcaption');
  
        // Ajoutez la classe hidden à chaque figcaption
        figcaptions.forEach((figcaption) => {
          figcaption.classList.add('hidden');
        });
    }
    function deleteWork() {
      // --- CREATION DES BOUTONS DE SUPPRESSION ---
      // Je cree une div icone à chaque figure
      figures.forEach((figure) => {
        const deleteBtn = document.createElement("div");
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
        
        // Je le rattache à son parent
        figure.appendChild(deleteBtn);
  
        // --- SUPPRESSION D'UN PROJET ---
        // Je recupere l'id de chaques figures pour plus tard les supprimer
        deleteBtn.addEventListener('click', function() {
          const figureId = figure.getAttribute('id');
          console.log("Suppression de la figure", figureId);
  
          // Je fais ma requete (ces en-têtes sont couramment utilisés dans le contexte de l'API Web pour gérer l'authentification et spécifier le type de contenu envoyé avec la requête.)
          const fetchPromise = fetch(`http://localhost:5678/api/works/${figureId}`, {
            method: "DELETE",
            headers: {
              // indique au serveur que le corps de la requête est au format JSON
              "Content-Type": "application/json",
              // le serveur vérifie ce jeton pour s'assurer que la personne qui effectue la requête a l'autorisation
              "Authorization": "Bearer " + key
            }
          });
          console.log(fetchPromise)
  
  
          // Ma response -- Recuperation des informations
          fetchPromise
          .then(response => { // J'ai pu recuperer ma Response
            console.log(response);
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
              
              // On rattache la balise enfant à son parent
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
              // Je supprime la figure du DOM 
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
          .catch(error => { //Je n'ai pu recuperer ma Response 
            loadErrorMessage()
            console.error('Erreur lors de la suppression :', error);
          });
        });
      });
    }
    // J'appelle mes fonctions
    hideFigcaptions()
    deleteWork()
  }
  function displayAddPage() {
    function loadPreview() {
      photoInput.addEventListener('change', function () {
        // Si j'ai une image dans ma liste d'image
        if (photoInput.files.length > 0) {
          // Alors je selectionne la premiere
          const uploadedFile = photoInput.files[0];
          // Je lui crée une URL
          uploadedFileURL = URL.createObjectURL(uploadedFile);         

          // Créer un nouvel élément image
          const photoPreview = document.createElement('img');
          photoPreview.setAttribute("id", "photoPreview");
          photoPreview.src = uploadedFileURL;
          photoPreview.classList.add('preview');
          photoUpload.insertBefore(photoPreview, photoUpload.children[3]);

          // Je stylise le reste de mes élément en fonction de la maquette
          photoUploadIcon.classList.add('hidden');
          photoUploadLabel.classList.remove('photoInputBtn');
          photoUploadLabel.classList.add('hidden');
          photoInput.classList.add('hidden');
          photoUploadP.classList.add('hidden');

          // Disparition du message d'erreur
          window.onclick = function(event) {
            if (event.target === previousBtn || event.target == closeBtn) {

              photoInput.value = ''; // Réinitialise la valeur du champ de fichier
              photoPreview.src = ''; // Réinitialise la source de l'image
              modalForm.reset();

              // Je revoque mon URL
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
    function addWork() {
      function loadErrorBox(message) {
        // Création du message d'erreur
        const errorBox = document.getElementById("errorForm");
        errorBox.classList.remove('hidden');
        errorBox.innerHTML = "";
    
        const errorMessage = document.createElement("p");
        errorMessage.classList.add("error");
        errorMessage.innerHTML = message;

        formSubmitBtn.classList.add("errorStyleForm");

        // On rattache la balise enfant à son parent
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
        // Vérifie si des fichiers ont été sélectionnés
        if (photoInput.files.length > 0) {
          // Récupère le premier fichier sélectionné
          const uploadedFile = photoInput.files[0];
          // Je lui crée une URL
          uploadedFileURL = URL.createObjectURL(uploadedFile);

          // Utilise FileReader pour lire le contenu du fichier
          const reader = new FileReader();

          // Configure une fonction à exécuter lorsque la lecture est terminée
          reader.onload = function (event) {
          // Convertit les données URL en objet Blob
          blobFile = dataURLtoBlob(reader.result);
          };

          // Lit le contenu du fichier en tant que données URL
          reader.readAsDataURL(uploadedFile);
        }
      });

      titleInput.addEventListener('change', function () {
        // Mettre à jour la variable avec la valeur actuelle de l'input
        enteredTitle = titleInput.value;
      });
      
      categoryInput.addEventListener('input', function () {
        const inputValue = categoryInput.value;
      
        // Je cherche l'option correspondante dans datalist
        const selectedOption = Array.from(categoryList.options).find(option => option.value === inputValue);
      
        if (selectedOption) {
          selectedOptionId = selectedOption.id;
        }
      });

      // Au clique de formSubmitBtn, je valide mon formulaire
      formSubmitBtn.addEventListener("click", function (event) {
        event.preventDefault();

       // Je vérifie si le champs image du formulaire est rempli:
       if (photoInput.files.length === 0) {
        loadErrorBox("Veuillez remplir tous les champs du formulaire");
        }
        // S'il sont remplis, alors je lance ma requete
        else {
         // Création de l’objet si tout les champs remplis :
          const chargeUtile = new FormData();
          chargeUtile.append('image', blobFile, 'image.png');
          chargeUtile.append('title', enteredTitle);
          chargeUtile.append('category', selectedOptionId);

          // Ma requete -- Appel de la fonction fetch avec toutes les informations nécessaires
          const fetchPromise = fetch('http://localhost:5678/api/works', {
            method: "POST",
            headers: { "Authorization": "Bearer " + key },
            body: chargeUtile
          });
          //console.log(fetchPromise)

          // Ma response -- Recuperation des informations
          fetchPromise
          .then(response => { // J'ai pu recuperer ma Response
            console.log(response);
            function loadErrorMessage() {
              function removePreview() {
                modalForm.reset();
                photoInput.value = ''; // Réinitialise la valeur du champ de fichier
                photoPreview.src = ''; // Réinitialise la source de l'image
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
      
              // On rattache la balise enfant à son parent
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
            function createWork() {
              figures.forEach((figure) => {
                // Je creer une nouvelle figure dans ma galerie
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

                // On rattache les balises enfants à leurs parents
                gallery.appendChild(newFigureImage);
                gallery.appendChild(newFigureFigcaption);
                gallery.appendChild(newUserId);
                gallery.appendChild(newCategoryId);
              });
            }
            // Si l'ajout côté serveur est réussit :
            if (response.status === 201) {
                // J'ajoute la figure du DOM
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
          .catch(error => { //Je n'ai pu recuperer ma Response 
            loadErrorMessage()
          });
        } 
      });
    }
    // J'appelle mes fonctions
    loadPreview();
    addWork();
  }
 
  // Je vérifie si editBtn est présent dans mon code
  if (editBtn) {
    //J'affiche la modale 
    displayModal();
    // Je charge la galerie lorsque la modale est ouverte
    loadWorks();
    loadCategoryList();
    
    if (gallery) {
      // J'affiche ma page de supression
      displayDeletePage();
      
      // Si je clique sur "Ajouter une photo" :
      modalSubmitBtn.addEventListener('click', function() {
        // Je cache ma page supression et affiche mon formulaire d'ajout
        switchPages ();
        displayAddPage();
      });
    }

    // Je place la galerie à l'intérieur de la div figureContent
    figureContent.appendChild(gallery);
  } 
  // else {
  // console.error("L'élément avec l'ID 'editBtn' n'est pas présent dans le document.");
  // }
}
  
export function closeModal() {
  // Ajoutez un écouteur d'événements pour fermer la modal en cliquant en dehors de la modal
  window.addEventListener('click', function(event) {
    if (event.target === modal || event.target === closeBtn) {
      modal.style.display = "none";
    }
  });
}

//---------------------------------
// function saveData() {
//   // Je sauvegarde les données de ma galerie
//   const backupData = {};
//   // Je recupere les figures existantes dans la galerie
//   const figures = gallery.querySelectorAll('figure');
  
//   // Je stocke les données de chaque figure dans backupData
//   figures.forEach((figure) => {
//     const figureId = figure.getAttribute('id');
//     const figureData = /* récupérer les données associées à la figure */
  
//     backupData[figureId] = figureData;
//     console.log(figureData)
//   });
// }

// function switchValueToId() {
    //   categoryInput.addEventListener('input', function () {
    //     const inputValue = categoryInput.value;
      
    //     // Je cherche l'option correspondante dans datalist
    //     const selectedOption = Array.from(categoryList.options).find(option => option.value === inputValue);
      
    //     if (selectedOption) {
    //       selectedOptionId = selectedOption.id;
    //       console.log("Retourne l'id selectioné",selectedOptionId);
    //     }
    //   });
    // }

    //Hotel First Arte New Delhi