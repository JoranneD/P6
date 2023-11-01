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
			//console.log(response.status);
			//console.log(response.ok);

			// Si la combinaison utilisateur - mot de passe est correcte, comment
			// rediriger vers la page d’accueil et s’assurer que la configuration est
			// maintenue ? 
			if (response.ok) {
				//window.location = "./index.html";
			}
			else {
				  // Création du bouton "Tous"
					const errorMessage = document.createElement("p");
					errorMessage.classList.add("error");
					errorMessage.innerHTML = "Nom d'utilisateur ou mot de passe invalide";

					// On rattache la balise enfant à son parent
					loginForm.appendChild(errorMessage);

					
					loginForm.insertBefore(errorMessage, loginForm.children[4]);
					

					// On place l'écouteur qui active la fonction loadFilters
					//allBtn.addEventListener("click", () => loadFilters(null))
				
			}

			return response.json();
		})
			// Me donne l'objet demandé (ici un userId et un token)
		.then((userData) => {
			console.log(userData);
			console.log(userData.userId);
			console.log(userData.token);
			return userData;
		
		});
	});
}


// ○ Si la combinaison est fausse, comment prévenir l’utilisateur ?




// Lance les fonctions suivantes :
logIn();
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