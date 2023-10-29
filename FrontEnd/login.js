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

		
		getAnswer();
	});
}

function getAnswer() {
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
	console.log(userData.userId);
	console.log(userData.token);
	return userData;
});

const identification = userData.userId;
const password = userData.token;
function loginRedirection(){
	window.location = "./index.html"; 
}
}

// Lance les fonctions suivantes :
logIn();
getAnswer();

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


