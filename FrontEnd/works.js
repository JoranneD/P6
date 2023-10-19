// Récupération des travaux depuis l'API
//const reponse = await fetch("http://localhost:5678/works");
//const works = await reponse.json();


// Je génére mes elements via le DOM
// Récupération de l'élément du DOM qui accueillera les travaux
const sectionPortfolio = document.querySelector("#portfolio");
console.log(sectionPortfolio)

// Création d’une balise dédiée au titre de la gallerie
const galleryTitle = document.createElement("h2");
// Création d’une balise dédiée à la gallerie
const galleryPortfolio = document.createElement("div");
// Création d’une balise dédiée à un travail de la gallerie
const galleryElement = document.createElement("figure");