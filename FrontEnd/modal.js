import { loadWorks } from './works.js';

// Déclarez les variables en dehors des fonctions pour les rendre accessibles à toutes les fonctions
const editBtn = document.getElementById('editBtn');
const modal = document.getElementById('modalWindow');
const closeBtn = document.getElementById('closeBtn');
const previousBtn = document.getElementById("previousBtn");
const figureContent = document.querySelector('.figureContent');
const gallery = document.querySelector('.gallery');
const modalTitle = document.querySelector('.modalTitle');
const modalForm = document.querySelector('.modalForm');
const modalSubmitBtn = document.querySelector('.modalSubmitBtn');


export function openModal() {
  // Vérifiez si l'élément avec l'ID 'editBtn' est présent
  if (editBtn) {
    // Ajoutez un écouteur d'événements au clic sur "editBtn"
    editBtn.addEventListener('click', function() {
    // Rend la modal visible
    modal.style.display = 'flex';
    });

    // Chargez la galerie lorsque la modal est ouverte
    loadWorks();
    
    if (gallery) {
      // Récupérez tous les éléments figcaption à l'intérieur de la galerie
      const figcaptions = gallery.querySelectorAll('figcaption');

      // Ajoutez la classe hidden à chaque figcaption
      figcaptions.forEach((figcaption) => {
        figcaption.classList.add('hidden');
      });

      
      // Récupérez tous les figures à l'intérieur de la galerie
      const figures = gallery.querySelectorAll('figure');
      
      // Je cree une div icone à chaque figure
      figures.forEach((figure) => {
        const deleteBtn = document.createElement("div");
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
        
        // Je le rattache à son parent
        figure.appendChild(deleteBtn);
      });

      // Au clic de ajouter une photo :
      modalSubmitBtn.addEventListener('click', function() {

        // J'affiche la fleche precedent
        previousBtn.classList.remove('hidden');

        // Je masque la galerie
        figureContent.classList.add('hidden');

        // Je change le titre en "Ajout photo"
        modalTitle.textContent = "Ajout photo";

        // J'affiche le formulaire
        modalForm.classList.remove('hidden');

        previousBtn.addEventListener('click', function() {
          figureContent.classList.remove('hidden');
          previousBtn.classList.add('hidden');
          modalTitle.textContent = "Galerie Photo";
          modalForm.classList.add('hidden');
        });

        

        // J'ajoute un formulaire composé d'une div dans laquel se trouve une icone photo+ un input "ajouter photo"+ un petit texte dan slequel est ecrit "jpg". ensuite j'ai un input titre et un input categorie ou je peux scroller

        });


      // j'ajoute une figure à #portfolio .gallery
      

    }



    //console.log(figcaptions)
    console.log(gallery)

    // const figcaptions = document.querySelectorAll('.figureContent .gallery figure figcaption');

    // Ajouter la galerie à l'intérieur du paragraphe "editSign"
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
