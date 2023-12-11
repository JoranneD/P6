// Gère la connexion au site
function logIn() {
	const loginForm = document.querySelector("#login form");
	loginForm.addEventListener("submit", async function (event) {
		event.preventDefault();
		const loginDatas = {
			email: event.target.querySelector("[name=email]").value,
			password: event.target.querySelector("[name=password]").value,
		};
		const chargeUtile = JSON.stringify(loginDatas);
		const fetchPromise = fetch("http://localhost:5678/api/users/login", {
		  	method: "POST",
		  	headers: { "Content-Type": "application/json" },
		  	body: chargeUtile
		});

		fetchPromise
		.then((response) => {
			// Gestionnaire de messages d'erreurs
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
					localStorage.setItem("token", data.token);
					window.location.href = 'index.html';
				});
			}
			// Si la combinaison utilisateur/mdp est incorrecte :
			else if (response.status === 401 || response.status === 404 ) {
				loadErrorMessage()
			}
		})
		.catch((error) => {
			loadErrorMessage()
		})
	});
}

// Gère la déconnexion du site
function logOut() {
	localStorage.removeItem('token');
	updateLoginStatus();
}

// Actualise le status de connexion
export function updateLoginStatus() {
	const loginButton = document.getElementById('loginButton'); 
	
	const isLoggedIn = localStorage.getItem('token') !== null;
  
	if (isLoggedIn) {
	  loginButton.textContent = 'logout';
	
	  loginButton.addEventListener('click', function () {
		logOut();
	  });

	} else {
	  loginButton.textContent = 'login';
	}
}

// Lance les fonctions suivantes :
updateLoginStatus();
logIn();