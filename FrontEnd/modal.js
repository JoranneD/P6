import { loadWorks } from './works.js';
//import { loadErrorMessage } from './login.js';

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
const deleteBtn = document.querySelector('.deleteBtn');
const figures = gallery.querySelectorAll('figure');
const deleteBtns = document.querySelectorAll('.deleteBtn');
const key = localStorage.getItem('token');
const formSubmitBtn = document.getElementById('formSubmitBtn');
const photoInput = document.getElementById("photoInput");
//const photoPreview = document.getElementById("photoPreview");
const photoUploadIcon = document.querySelector('.photoUpload i');
const photoUploadLabel = document.querySelector('.photoUpload label');
//const photoUploadInput = document.querySelector('.photoUpload input');
const photoUploadP = document.querySelector('.photoUpload p');
const photoUpload = document.querySelector('.photoUpload');





export function openModal() {
  // Je déclare ici les fonctions que j'appelerai plus bas dans le code
  function displayModal() {
    // J' ajoute un écouteur d'événements au clic sur editBtn
    editBtn.addEventListener('click', function() {
    // Je rend la modale visible
    modal.style.display = 'flex';
    });
  }
  function hideFigcaptions() {
    // Récupérez tous les éléments figcaption à l'intérieur de la galerie
      const figcaptions = gallery.querySelectorAll('figcaption');

      // Ajoutez la classe hidden à chaque figcaption
      figcaptions.forEach((figcaption) => {
        figcaption.classList.add('hidden');
      });
  }
  function deleteWork() {
    function saveData() {
      // Je sauvegarde les données de ma galerie
      const backupData = {};
      // Je recupere les figures existantes dans la galerie
      const figures = gallery.querySelectorAll('figure');
      
      // Je stocke les données de chaque figure dans backupData
      figures.forEach((figure) => {
        const figureId = figure.getAttribute('id');
        const figureData = /* récupérer les données associées à la figure */
      
        backupData[figureId] = figureData;
        console.log(figureData)
      });
    }

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
  function addWork() {
    function loadModalPages () {
      modalSubmitBtn.addEventListener('click', function() {
        // J'affiche la fleche precedent
        previousBtn.classList.remove('hidden');
        // Je masque la galerie
        figureContent.classList.add('hidden');
        // Je change le titre en "Ajout photo"
        modalTitle.textContent = "Ajout photo";
        formSubmitBtn.classList.add('modalSubmitBtn');
        //modalSubmitBtn.textContent = "Valider";
  
        // J'affiche le formulaire
        modalForm.classList.remove('hidden');
        // Je masque modalSubmitBtn (bouton qui me permet de "changer" de page de modal)
        modalSubmitBtn.classList.add('hidden');
  
        // j'ajoute une figure à #portfolio .gallery. Pour ca je fais une demande à l'API //
  
        previousBtn.addEventListener('click', function() {
          figureContent.classList.remove('hidden');
          previousBtn.classList.add('hidden');
          modalTitle.textContent = "Galerie Photo";
          modalSubmitBtn.textContent = "Ajouter une photo";
          modalForm.classList.add('hidden');
          modalSubmitBtn.classList.remove('hidden');
        });
        //console.log(modalSubmitBtn)
      });
    }
    function loadPreview() {
      // je met mon image, je vois la preview, je note mon titre, je cherche ma categorie, je fais ma requete

      photoInput.addEventListener('change', function () {
        // Si j'ai une image dans ma liste d'image
        if (photoInput.files.length > 0) {
          // Alors je selectionne la premiere
          const uploadedFile = photoInput.files[0];
          // Je lui crée une URL
          const uploadedFileURL = URL.createObjectURL(uploadedFile);          

          // Créer un nouvel élément image
          const photoPreview = document.createElement('img');
          photoPreview.setAttribute("id", "photoPreview");
          photoPreview.src = uploadedFileURL; // Je place l'URL dans la source de ma preview pour visualiser mon image
          photoPreview.classList.add('preview');
          photoUpload.insertBefore(photoPreview, photoUpload.children[3]);

          // Je stylise le reste de mes élément en fonction de la maquette
          //photoPreview.classList.add('preview');
          photoUploadIcon.classList.add('hidden');
          photoUploadLabel.classList.remove('photoInputBtn');
          photoUploadLabel.classList.add('hidden');
          photoInput.classList.add('hidden');
          photoUploadP.classList.add('hidden');

          // Montre moi ---------------------------------------------
          //console.log("Infos sur mon image uploadée:",uploadedFile)
          //console.log("Mon URL actuel:",uploadedFileURL)
          //console.log("Ma preview actuel:",photoPreview)

          // Disparition du message d'erreur
          window.onclick = function(event) {
            if (event.target === previousBtn || event.target == closeBtn) {

              photoInput.value = ''; // Réinitialise la valeur du champ de fichier
              photoPreview.src = ''; // Réinitialise la source de l'image
              //categoryInput.value = ''; // Réinitialise la valeur du champ de categorie

              // Je revoque mon URL
              window.URL.revokeObjectURL(uploadedFileURL);
              
              photoUploadIcon.classList.remove('hidden');
              photoUploadLabel.classList.add('photoInputBtn');
              photoUploadLabel.classList.remove('hidden');
              photoInput.classList.remove('hidden');
              photoUploadP.classList.remove('hidden');

              // Montre moi ---------------------------------------------
              //console.log("Mon URL apres:",uploadedFileURL);
              //console.log("Ma preview apres:",photoPreview)
            }
          }
        }
      });
    }
    function sendRequest() {
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
      // Au clique de "Valider"(formSubmitBtn), je fais ma requete
      formSubmitBtn.addEventListener("click", async function (event) {
        event.preventDefault();

       // S'il manque une image dans le formulaire :
       if (photoInput.files.length === 0) {
        loadErrorBox("Veuillez compléter le formulaire."); //Veuillez sélectionner une image
      }

        // Création de l’objet.
        const formDatas = {
          image: event.target.querySelector("[name=image]").value,
          title: event.target.querySelector("[name=title]").value,
          category: event.target.querySelector("[name=category]").value,
        };
        // Création de la charge utile au format JSON
        const chargeUtile = JSON.stringify(formDatas);
        // Ma requete -- Appel de la fonction fetch avec toutes les informations nécessaires
        const fetchPromise = fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: { "Content-Type": "multipart/form-data" },
            body: chargeUtile
        });
        console.log(fetchPromise)

      // Ma response -- Recuperation des informations
      fetchPromise
      .then(response => { // J'ai pu recuperer ma Response
        console.log(response);
        function loadErrorMessage() {
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
          }
          else {
            errorMessage.innerHTML = "Erreur de serveur interne";
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
            const newFigure = gallery.createElement('figure');
            gallery.append(newFigure);

            // Id
            newFigure.setAttribute("id",figure.id);
            //newFigure.dataset.image = figure.categoryId;

            // Titre
            const newFigureFigcaption = document.createElement("figcaption");
            newFigureFigcaption.innerHTML = figure.title;

            // Image
            const newFigureImage = document.createElement("img");
            newFigureImage.src = figure.imageUrl;
            newFigureImage.alt = figure.title;

            // Categorie
            const newCategoryId = document.createElement("p");
            //categoryId.classList.add("categoryId");
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
          
            //const //previousElementSibling.id + 1)
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
        console.error('Erreur lors de la suppression :', error);
      });
    });
  }
    loadModalPages(); // ok
    loadPreview(); // ok
    sendRequest();
    //Hotel First Arte New Delhi
  }
  

  // Je vérifie si editBtn est présent dans mon code
  if (editBtn) {
    //J'affiche la modale 
    displayModal();
    // Je charge la galerie lorsque la modale est ouverte
    loadWorks();
    
    if (gallery) {
      hideFigcaptions(); // Cache les figcaptions
      deleteWork(); // Supprime un projet
      addWork(); // Ajoute un projet
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


//console.log(gallery)



// ------------------------------------------------------------------------------------------
// Je fais ma requete 
          // const fetchPromise = fetch("http://localhost:5678/api/works/"+ figureId, {
		  	  //   method: "DELETE",
		      // });
		      // console.log(fetchPromise)

          // Ma response -- Recuperation des informations
          // .then(response => {
          //   if (response.status === 200) {

          //     // Supprime la figure du DOM si la suppression côté serveur réussit
          //     figure.remove(); 

          //   } else {
          //     console.error('La suppression a échoué.');
          //   }
          // })
          // .catch(error => {
          //   console.error('Erreur lors de la suppression :', error);
          // });


        //"http://localhost:5678/api/works/"+ figureId

              //supprimer la preview en utilisant form reset
      
              
              // function work(image, title, category) {
              //   this.image = image;
              //   this.title = title;
              //   this.category = category;
              // }











   // photoInput.onchange = evt => {
      //   const [selectedImage] = photoInput.files
      //   if (selectedImage) {
      //     const objectURL = URL.createObjectURL(selectedImage);
      //     photoPreview.src = objectURL;
      //     //photoPreview.src = URL.createObjectURL(selectedImage);
      //     console.log(photoPreview)
      //     photoPreview.classList.add('preview');
      //     photoUploadIcon.classList.add('hidden');
      //     photoUploadLabel.classList.remove('photoInputBtn');
      //     photoUploadLabel.classList.add('hidden');
      //     photoInput.classList.add('hidden');
      //     photoUploadP.classList.add('hidden');

      //     // Disparition du message d'erreur
      //     window.onclick = function(event) {
      //       if (event.target === previousBtn || event.target == closeBtn) {
      //         URL.revokeObjectURL(objectURL);
      //         console.log(photoPreview)
      //         //photoPreview.classList.remove('preview');
      //         photoUploadIcon.classList.remove('hidden');
      //         photoUploadLabel.classList.add('photoInputBtn');
      //         photoUploadLabel.classList.remove('hidden');
      //         photoInput.classList.remove('hidden');
      //         photoUploadP.classList.remove('hidden');
      //       }
      //     }

          // Disparition du message d'erreur
          // window.onclick = function(event) {
          //   if (event.target === previousBtn || event.target == closeBtn) {
          //     photoPreview.src = URL.revokeObjectURL(file);
          //     console.log(photoPreview)
          //     photoPreview.classList.remove('preview');
          //     photoUploadIcon.classList.remove('hidden');
          //     photoUploadLabel.classList.add('photoInputBtn');
          //     photoUploadLabel.classList.remove('hidden');
          //     photoInput.classList.remove('hidden');
          //     photoUploadP.classList.remove('hidden');
          //   }
         

        //}













// Fonction pour ouvrir la modal
// export function openModal() {
//     const modal = document.getElementById('myModal');
//     modal.style.display = 'block';
// }
  
// // Fonction pour fermer la modal
// export function closeModal() {
//     const modal = document.getElementById('myModal');
//     modal.style.display = 'none';
// }

// export function openModal() {
//     // Récupérez l'élément "editBtn" par son ID
//     const editBtn = document.getElementById('editBtn');
    
//     // Ajoutez un écouteur d'événements au clic sur "editBtn"
//     editBtn.addEventListener('click', function() {
//       // Vérifiez si l'élément "editSign" est visible
//       const editSignElement = document.getElementById('editSign');
//       if (editSignElement && !editSignElement.classList.contains('hidden')) {
//         const modal = document.getElementById('myModal');
//         modal.style.display = 'block';
//       }
//     });
//   }
  
// export function closeModal() {
//     const modal = document.getElementById('myModal');
//     modal.style.display = 'none';
// }

// export function openModal() {
//     // Récupérez l'élément "editBtn" par son ID
//     const editBtn = document.getElementById('editBtn');
  
//     // Récupérez la modal et le bouton de fermeture par leur ID
//     const modal = document.getElementById('myModal');
//     const closeModalButton = document.getElementById('closeModal');
    
//     // Ajoutez un écouteur d'événements au clic sur "editBtn"
//     editBtn.addEventListener('click', function() {
//       // Vérifiez si l'élément "editSign" est visible
//       const editSignElement = document.getElementById('editSign');
//       if (editSignElement && !editSignElement.classList.contains('hidden')) {
//         modal.style.display = 'block';
//       }
//     });
  
//     // Ajoutez un écouteur d'événements pour fermer la modal en cliquant sur le bouton de fermeture
//     closeModalButton.addEventListener('click', function() {
//       modal.style.display = 'none';
//     });
  
//     // Ajoutez un écouteur d'événements pour fermer la modal en cliquant en dehors de la modal
//     window.addEventListener('click', function(event) {
//       if (event.target === modal) {
//         modal.style.display = 'none';
//       }
//     });
//   }

// Ajoutez un écouteur d'événements pour fermer la modal en cliquant sur le bouton de fermeture
    //closeModalButton.addEventListener('click', function() {
      // Cachez la modal en ajoutant la classe "hidden"
      //modal.classList.add('hidden');
    //});
  

  
    // Ajoutez un écouteur d'événements pour fermer la modal en cliquant n'importe où sur la page en dehors de la modal
    //document.addEventListener('click', function(event) {
      //if (event.target === modal) {
        // Cachez la modal en ajoutant la classe "hidden"
        //modal.classList.add('hidden');
      //}
    //});

    // previousBtn.classList.add('hidden');

    //     const previousBtn = document.createElement("i");
    //     previousBtn.classList.add("fa-solid", "fa-arrow-left");
    //     modalButtons.appendChild(previousBtn);
