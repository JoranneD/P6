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

        // Si le jeton est présent :
        if (key) {
          // Je fais ma requete 
          const fetchPromise = fetch("http://localhost:5678/api/works/"+ figureId, {
            method: "DELETE",
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
              //modalSubmitBtn.classList.add("unavailable");

              
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
        }  
      });
    });
  }
  
  function addWork() {
    modalSubmitBtn.addEventListener('click', function() {
      // J'affiche la fleche precedent
      previousBtn.classList.remove('hidden');
      // Je masque la galerie
      figureContent.classList.add('hidden');
      // Je change le titre en "Ajout photo"
      modalTitle.textContent = "Ajout photo";
      modalSubmitBtn.textContent = "Valider";
      // J'affiche le formulaire
      modalForm.classList.remove('hidden');

      // j'ajoute une figure à #portfolio .gallery. Pour ca je fais une demande à l'API //

      previousBtn.addEventListener('click', function() {
        figureContent.classList.remove('hidden');
        previousBtn.classList.add('hidden');
        modalTitle.textContent = "Galerie Photo";
        modalSubmitBtn.textContent = "Ajouter une photo";
        modalForm.classList.add('hidden');
      });
    });
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
