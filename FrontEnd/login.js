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




// Lance les fonctions suivantes :

logIn();
//loadErrorMessage();
//getAnswer();

// --- Show me --- // 
//console.log(fetchPromise)
//console.log(response)
//console.log(userData)
// console.log(userData);
// console.log(userData.userId);
// console.log(userData.token);


//--------------------------------------------
// Me donne l'objet demandé (ici un userId et un token)
//.then((userData) => {
//	console.log(userData);



// if (category !== null) {
//     works.forEach((work) => {
//       if (work.dataset.category_id !== category.toString()) {
//         work.style.display = "none";
//       }
//     })
//   }

//console.log(status)
		
		// Conditions d'authentification
		// Si c'est les identifiants sont bons : if Response.status(200) alors Response.redirect("https://www.example.com", 302); sinon event.respondWith(Response.error());
		// if (fetchPromise.status(200)) {
		// 	console.log(fetchPromise.status(200))

		// }



		//const responseJson = Response.response;
		//const identification = userData.userId;
		//const password = userData.token;

// const validateEmail = (email) => {
// return email.match(
// 	/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
// );
// };

// const validate = () => {
// const $result = $('#result');
// const email = $('#email').val();
// $result.text('');

// if(validateEmail(email)){
// 	$result.text(email + ' is valid.');
// 	$result.css('color', 'green');
// } else{
// 	$result.text(email + ' is invalid.');
// 	$result.css('color', 'red');
// }
// return false;
// }

// $('#email').on('input', validate);
// throw new Error ("");

// errorBox.onclick = function(event) {
					// 	if (event.target == errorBox) {
					// 		errorBox.style.display = "none";
					// 		errorMessage.innerHTML = "";
					// 	}
					// }

					// On le positionne avant le bouton se connecter
				//loginForm.insertBefore(errorBox, loginForm.children[4]);
// function loadEdit() {
// 	const editMode = document.getElementById("editSign");
// 	editMode.classList.remove('hidden');
// 	//editMode.innerHTML = "";
// 	console.log(editMode)

// 	const editMessage = document.createElement("p");
// 	editMessage.classList.add("error");
// 	editMessage.innerHTML = "Mode édition";

// 	const editIcone = document.createElement("i");
// 	editIcone.classList.add("fa-regular fa-pen-to-square");

// 	//On rattache la balise enfant à son parent
// 	editMode.appendChild(editMessage);
// 	editMessage.appendChild(editIcone);
// }
				
// function loadEdit() {
// 	const editMode = document.getElementById("editSign").style.display = "none";;
// 	//editMode.classList.remove('hidden');
// 	//editMode.innerHTML = "";
// 	//console.log(editMode)
// 	//work.style.display = "none";

// Remplacez ceci par votre jeton d'authentification réel
// const votreToken = "votre-jeton-d-authentification-ici";

// // URL de la ressource protégée
// const url = "https://api.example.com/resource";

// // Configuration de l'en-tête d'authentification
// const headers = new Headers({
// 'Authorization': `Bearer ${votreToken}`
// });

// // Configuration de l'objet de la requête
// const options = {
// method: 'GET',
// headers: headers
// };

// // Effectuez la requête en utilisant Fetch
// fetch(url, options)
// .then(response => {
// 	if (response.ok) {
// 	return response.json();
// 	} else {
// 	throw new Error(`Échec avec code d'état ${response.status}`);
// 	}
// })
// .then(data => {
// 	console.log("Succès !");
// 	console.log(data);  // Affiche la réponse de l'API
// })
// .catch(error => {
// 	console.error(error);
// });

// function loadEdit() {
// 	// Vérifiez si le jeton est déjà stocké dans localStorage
// 	const votreToken = localStorage.getItem('token');

// 	// URL de la ressource protégée
// 	const url = "./index.html";
// 	const editMode = document.getElementById("editSign");
// 	 editMode.classList.remove('hidden');
// 	 //editMode.innerHTML = "";
// 	 console.log(editMode)

// 	if (votreToken) {
// 		// Configuration de l'en-tête d'authentification
// 		const headers = new Headers({
// 		  'Authorization': `Bearer ${votreToken}`
// 		});

// 		// Configuration de l'objet de la requête
// 		const options = {
// 		method: 'GET',
// 		headers: headers
// 		};

// 		// Effectuez la requête en utilisant Fetch
// 		fetch(url, options)
// 		.then(response => {
// 		if (response.ok) {
// 			return response.json();
// 		} else {
// 			throw new Error(`Échec avec code d'état ${response.status}`);
// 		}
// 		})
// 		.then(data => {
// 		console.log("Succès !");
// 		console.log(data);  // Affiche la réponse de l'API
// 		})
// 		.catch(error => {
// 		console.error(error);
// 		});
// 	} 
// 	else {
// 	console.error("Le jeton d'authentification n'est pas présent dans localStorage.");
// 	}
			
	// // Je recupere mon token
	// const key = window.localStorage.getItem("token");
	// if (key != null) {
	// 	key = JSON.parse(key);
	// 	document.getElementById("editSign").style.display = "block";
	// }

	// Fonction pour définir l'indicateur dans localStorage
	// function setEditSignVisible() {
	// 	localStorage.setItem('editSignVisible', 'true');
	//   };
	// function loadEdit() {
	// 	// Vérifiez si l'indicateur est défini dans localStorage
	// 	const isEditSignVisible = localStorage.getItem('editSignVisible') === 'true';
	// 	if (isEditSignVisible) {
	// 	  // Supprimez la classe "hidden" de l'élément "editSign"
	// 	  const editSignElement = document.getElementById('editSign');
	// 	  if (editSignElement) {
	// 		editSignElement.classList.remove('hidden');
	// 	  }
	// 	}
	// }
