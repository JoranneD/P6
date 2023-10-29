export function logIn() {
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

		// Ma response -- Recuperation des informations avec la propriété dataset
		fetchPromise
		.then((response) => {
			// Me donne le statut de la promesse
			console.log(response);
			return response.json();
		})
			// Me donne l'objet demandé (ici un userId et un token)
		 .then((userData) => {
		 	console.log(userData);
		});
	});
}



// Lance les fonctions suivantes :
logIn();

// --- Show me --- // 
//console.log(fetchPromise)
//console.log(response)
//console.log(userData)


//--------------------------------------------
