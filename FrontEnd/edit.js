// Affiche l'interface d'édition
export function loadEditInterface() {
	const key = localStorage.getItem('token');

	if (key) {

		const editInterface = document.getElementById('editInterface');
		editInterface.classList.remove('hidden');
		
		const divFilters = document.getElementById('divFilters');
		if (divFilters) {
		 	divFilters.classList.add('hidden');
		}

		const portfolio = document.getElementById("portfolio");
		const editTitle = document.querySelector("#portfolio h2");

		const editBox = document.createElement("div");
		editBox.classList.add("editBox");

		const editBtn = document.createElement("button");
		editBtn.setAttribute("id", "editBtn");
		editBtn.classList.add("edit_Btn");
		editBtn.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> Modifier`;

		editBox.appendChild(editBtn);
		editBox.appendChild(editTitle);

		portfolio.prepend(editBox);
	}
}