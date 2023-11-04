// Gestionnaire de visibilité
export function loadEdit() {
	// Vérifie si le jeton est présent dans le localStorage
	const key = localStorage.getItem('token');
	if (key) {
	  const editSignElement = document.getElementById('editSign');
	  if (editSignElement) {
		// Si le jeton est présent, supprimez la classe "hidden" pour afficher l'élément
		editSignElement.classList.remove('hidden');
	  }
	}
}