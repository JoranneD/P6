import { loadWorks } from './works.js';
//import { loadEditInterface } from './edit.js';


// Déclarez les variables en dehors des fonctions pour les rendre accessibles à toutes les fonctions
const editBtn = document.getElementById('editBtn');
const modal = document.getElementById('modalWindow');
const closeBtn = document.getElementById('closeBtn');

export function openModal() {
  // Vérifiez si l'élément avec l'ID 'editBtn' est présent
  if (editBtn) {
    // Ajoutez un écouteur d'événements au clic sur "editBtn"
    editBtn.addEventListener('click', function() {
    // Rend la modal visible
    modal.style.display = 'flex';
    });
  } 
  // else {
  //   console.error("L'élément avec l'ID 'editBtn' n'est pas présent dans le document.");
  // }
      
  // Chargez la galerie lorsque la modal est ouverte
  //loadWorks();

  // Récupérez la galerie
  //const gallery = document.querySelector('.gallery');

  // Récupérez le paragraphe "editSign" par son ID
  // const editContent = document.querySelector('#editSign p');

  // Ajoutez la galerie à l'intérieur du paragraphe "editSign"
  //editContent.appendChild(gallery);
  
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
