export function loadEditInterface() {
	// Je vérifie si le jeton est présent dans le localStorage
	const key = localStorage.getItem('token');

	// Si le jeton est présent :
	if (key) {

		// Je supprime la classe hidden pour afficher le mode édition
		const editInterface = document.getElementById('editInterface');
		editInterface.classList.remove('hidden');
		
		// J'ajoute la classe hidden pour masquer les boutons de filtrage
		const divFilters = document.getElementById('divFilters');
		if (divFilters) {
		 	divFilters.classList.add('hidden');
		}

		// Je creer le bouton modifier
		const portfolio = document.getElementById("portfolio");
		const editTitle = document.querySelector("#portfolio h2");

		const editBox = document.createElement("div");
		editBox.classList.add("editBox");

		const editBtn = document.createElement("button");
		editBtn.setAttribute("id", "editBtn");
		editBtn.classList.add("edit_Btn");
		editBtn.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> Mode édition`;

		editBox.appendChild(editBtn);
		editBox.appendChild(editTitle);

		portfolio.prepend(editBox);
	}
}