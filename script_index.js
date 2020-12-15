console.log("Script running");

// Supprimer si il existe dans le stockage le numéro_quiz

localStorage.removeItem("numero_quiz");
console.log(localStorage);

// Définit le mode d'affichage lors du changement de page

let mode = localStorage.getItem("mode");
if (! mode){
    localStorage.setItem("mode","0");
}else if(mode == 0 || mode == 1) {
    $(co).css('display', 'block');
    $(deco).css('display', 'none');
}else{
    $(co).css('display', 'none');
    $(deco).css('display', 'block');
}

// Déclaration des variables

let liste_personne = []

//Déclaration des prototype pour recupérer les attributs des personnes dans la mémoire

Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}
Storage.prototype.getObject = function(key) {
    return JSON.parse(this.getItem(key));
}
Storage.prototype.keyindex = function(index) {
    return this.getObject(this.key(index));
}
Object.prototype.nomComplet = function() {
    return this.prénom + " " + this.nom;
}

// Permet d'afficher les scores en les prenant dans la mémoire

for(let i = 0; i < localStorage.length; i++ ){
    if (localStorage.key(i) != "mode"){
        personne = localStorage.keyindex(i);
        liste_personne.push([personne.nomComplet(), personne.score]);
        Ajouter_personne();
    }
}

// Permet de générer la table

function Ajouter_personne() {
    const table_personne = document.getElementById("table_personne");
    const personneRow = document.createElement("TR");
    const fullnameCell = document.createElement("TD");
    const scoreCell = document.createElement("TD");
    fullnameCell.innerText = liste_personne[liste_personne.length-1][0];
    scoreCell.innerText = liste_personne[liste_personne.length-1][1];
    const removeCell = document.createElement("TD");
    const removeButton = document.createElement("BUTTON");
    removeButton.value = liste_personne.length-1;
    removeButton.innerText = "Masquer";
    removeButton.addEventListener("click", Remove);
    removeCell.appendChild(removeButton);
    personneRow.appendChild(fullnameCell);
    personneRow.appendChild(scoreCell);
    personneRow.appendChild(removeCell);
    table_personne.appendChild(personneRow);
}
function Remove(mouseEvent) {
    mouseEvent.target.parentElement.parentElement.remove();
    liste_personne.splice(liste_personne.indexOf(liste_personne[mouseEvent.target.value]), 1);
}

// Permet de changer de page et d'afficher les bonnes choses

function changer_page_co(){
    localStorage.setItem("mode","1");
    window.location='login.html';
}

function changer_page_in(){
    localStorage.setItem("mode","0");
    window.location='login.html';
}

// Permet de supprimer son compte ou de se déconnecter

function supprimer_compte(){
    if(confirm("Etes vous sûrs de vouloir supprimer votre compte ?")){
        localStorage.removeItem(localStorage.getItem("mode"));
        localStorage.setItem("mode", 0);
        $(co).css('display', 'block');
        $(deco).css('display', 'none');
    }
}

function deconnexion(){
    if(confirm("Etes vous sûrs de vouloir vous déconnecter ?")){
        localStorage.setItem("mode", 0);
        $(co).css('display', 'block');
        $(deco).css('display', 'none');
    }
}

// Permet d'accéder au QUIZ

function quiz1(){
    mode = localStorage.getItem("mode");
    if(mode != 0 && mode != 1){
        localStorage.setItem("numero_quiz", 0);
        window.location='question.html';
    }else{
        alert("Vous devez être connecté pour lancer un quiz ! Pas de panique l'inscription est gratuite ! ;)");
    }
}

function quiz2(){
    mode = localStorage.getItem("mode");
    if(mode != 0 && mode != 1){
        localStorage.setItem("numero_quiz", 1);
        window.location='question.html';
    }else{
        alert("Vous devez être connecté pour lancer un quiz ! Pas de panique l'inscription est gratuite ! ;)");
    }
}