function logIn() {
	const loginForm = document.querySelector("#login form");
	loginForm.addEventListener("submit", async function (event) {
		event.preventDefault();
		// Création de l’objet.
		const loginDatas = {
			email: event.target.querySelector("[name=email]").value,
			password: event.target.querySelector("[name=password]").value,
		};
		// Création de la charge utile au format JSON
		const chargeUtile = JSON.stringify(loginDatas);
		// Ma requete -- Appel de la fonction fetch avec toutes les informations nécessaires
		const fetchPromise = fetch("http://localhost:5678/api/users/login", {
		  	method: "POST",
		  	headers: { "Content-Type": "application/json" },
		  	body: chargeUtile
		});
		console.log(fetchPromise)

		// Ma response -- Recuperation des informations
		fetchPromise
		.then((response) => { // J'ai pu recuperer ma Response
			console.log(response);
			// Je charge mes gestionnaire d'erreurs et d'affichage d'édition
			function loadErrorMessage() {
				// Création du message d'erreur
				const errorBox = document.getElementById("errorSign");
				errorBox.classList.remove('hidden');
				errorBox.innerHTML = "";
		
				const errorMessage = document.createElement("p");
				errorMessage.classList.add("error");
				
				if (response.status === 401 || response.status === 404 ) {
					
					errorMessage.innerHTML = "Erreur dans l’identifiant ou le mot de passe";
				}
				else {
					errorMessage.innerHTML = "Erreur de serveur interne";
				}
				
				// On rattache la balise enfant à son parent
				errorBox.appendChild(errorMessage);
		
				// Disparition du message d'erreur
				const inputs = document.querySelectorAll("#login input");
				const emailInput = document.querySelector("#login input#email");
				const passwordInput = document.querySelector("#login input#password");
		
				loginForm.onclick = function(event) {
					if (event.target == emailInput || event.target == passwordInput ) {
						errorBox.classList.add('hidden');
					}
				}
			};
		
			// Si la combinaison utilisateur/mdp est correcte : 
			if (response.status === 200) {
				response.json()
				.then((data) => {
					console.log(data);
					localStorage.setItem("token", data.token); // stockage du token
					window.location.href = 'index.html'; // Redirigez vers index.html
				});
			}
			// Si la combinaison utilisateur/mdp est incorrecte :
			else if (response.status === 401 || response.status === 404 ) {
				loadErrorMessage()
			}
		})
		.catch((error) => { //Je n'ai pu recuperer ma Response 
			loadErrorMessage()
			console.log(error)
		})
	});
}

function logOut() {
	// Supprime le token du localStorage
	localStorage.removeItem('token');
	// Mettre à jour l'état de connexion
	updateLoginStatus();
}
  
export function updateLoginStatus() {
	const loginButton = document.getElementById('loginButton'); 
	
	// Vérifie si l'utilisateur est connecté
	const isLoggedIn = localStorage.getItem('token') !== null;
  
	// Mettre à jour l'interface en fonction de l'état de connexion
	if (isLoggedIn) {
	  // L'utilisateur est connecté
	  loginButton.textContent = 'logout';
	  //console.log('Logged in');

	  // Ajoute un gestionnaire d'événements au clic sur le bouton de connexion/déconnexion
	  loginButton.addEventListener('click', function () {
		// Appele la fonction logout lorsque le bouton est cliqué
		logOut();
	  });

	} else {
	  // L'utilisateur n'est pas connecté
	  loginButton.textContent = 'login';
	  //console.log('Logged out');
	}
}

// Lance les fonctions suivantes :
updateLoginStatus();
logIn();

//--------------------------------------------
// function logOut() {
// 	// Vérifie si l'utilisateur est connecté
// 	if (localStorage.getItem('token')) {
// 	  // Supprime le token du localStorage
// 	  localStorage.removeItem('token');
// 	  // Mettre à jour l'état de connexion
// 	  updateLoginStatus();
// 	} else {
// 	  // L'utilisateur n'est pas connecté, gérer cette condition si nécessaire
// 	  console.log('L\'utilisateur n\'est pas connecté.');
// 	}
// }

//--------------------------------------------
// function logOut() {
// 	// Vérifier si l'utilisateur est connecté
// 	if (localStorage.getItem('token')) {
// 	  // Effectuer une requête pour déconnecter l'utilisateur côté serveur
// 	  fetch('http://localhost:5678/logout', {
// 		method: 'POST',
// 		headers: {
// 		  'Content-Type': 'application/json',
// 		  'Authorization': 'Bearer ' + localStorage.getItem('token')
// 		}
// 	  })
// 	  .then(response => {
// 		if (!response.ok) {
// 		  throw new Error('Erreur lors de la déconnexion côté serveur');
// 		}
// 		// Supprimer le token du localStorage
// 		localStorage.removeItem('token');
// 		// Rediriger vers la page d'accueil ou une autre page de votre choix
// 		window.location.href = '/';
// 	  })
// 	  .catch(error => {
// 		console.error(error);
// 		// Gérer les erreurs, par exemple afficher un message à l'utilisateur
// 	  });
// 	} else {
// 	  // L'utilisateur n'est pas connecté, gérer cette condition si nécessaire
// 	  console.log('L\'utilisateur n\'est pas connecté.');
// 	}
//   }