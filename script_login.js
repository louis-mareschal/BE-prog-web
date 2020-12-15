console.log("Script running");
console.log(localStorage);

// Affichage lors du changement de page des bonnes choses :

if(localStorage.getItem("mode") == 1){
    $(register).css('display', 'none');
    $(login).css('display', 'block');
}else{
    $(register).css('display', 'block');
    $(login).css('display', 'none');
}

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

//Prototye pour mettre au bon format les nom et prénom

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.toLowerCase().slice(1);
}

//Définition de la fonction pour crééer des objets "personne"

function Person(pseudo, prénom, nom, mdp, score) {
    this.pseudo = pseudo;
    this.prénom = prénom;
    this.nom = nom;
    this.mdp = mdp;
    this.score = score;
}

Object.prototype.nomComplet = function() {
    return this.prénom + " " + this.nom;
}

// Déclaration des variables

let liste_personne = [];

// Permet d'afficher les scores en les prenant dans la mémoire

for(let i = 0; i < localStorage.length; i++ ){
    if (localStorage.key(i) != "mode"){
        personne = localStorage.keyindex(i);
        liste_personne.push([personne.nomComplet(), personne.score]);
        Ajouter_personne();
    }
}

//Fonction qui permettent de vérifier si les attributs rentrés sont valables

function Verif_pseudo(){
    const pseudo_verif = document.getElementById("pseudo").value;
    if(!/^[a-z0-9A-Z]+$/i.test(pseudo_verif)){
        alert("Votre pseudo doit contenir que des lettres (pas d'accents c'est chiant :) et chiffres uniquement !");
        document.getElementById("pseudo").value = "";
    }
}

function Verif_prénom(){
    const prénom_verif = document.getElementById("prénom").value;
    if(!/^[a-zA-Z]+$/i.test(prénom_verif)){
        alert("Votre prénom doit contenir que des lettres (pas d'accents c'est chiant :) !");
        document.getElementById("prénom").value = "";
    }
}

function Verif_nom(){
    const nom_verif = document.getElementById("nom").value;
    if(!/^[a-zA-Z]+$/i.test(nom_verif)){
        alert("Votre nom doit contenir que des lettres (pas d'accents c'est chiant :) !");
        document.getElementById("nom").value = "";
    }
}

function verification_register(){
    const pseudo = document.getElementById("pseudo").value;
    const prénom = document.getElementById("prénom").value;
    const nom = document.getElementById("nom").value;
    const mdp = document.getElementById("mdp").value;
    const cmdp = document.getElementById("cmdp").value;
    if (! (pseudo && prénom && nom && mdp && cmdp)){
        alert("Merci de remplir tous les champs !");
    }else if(mdp != cmdp){
        alert("Le mot de passe rentré est différent de la confirmation !");
    }else{
        let valide = 1;
        for(let i = 0; i < localStorage.length; i++ ){
            if (pseudo == localStorage.key(i)){
                alert("Ce pseudo est déjà pris !");
                valide = 0;
                break;
            }
        }
        if (valide){
            if(confirm("Voulez vous vraiment vous inscire ?")){
                enregistrer(pseudo, prénom.capitalize(), nom.capitalize(), mdp);
                document.getElementById("pseudo").value = "";
                document.getElementById("prénom").value = "";
                document.getElementById("nom").value = "";
                document.getElementById("mdp").value = "";
                document.getElementById("cmdp").value = "";
            }
        }
    }
}

function verification_login(){
    const pseudo = document.getElementById("pseudo2").value;
    const mdp = document.getElementById("mdp2").value;
    if (!(pseudo && mdp)){
        alert("Merci de remplir tous les champs !");
    }else{
        let valide = -1;
        for(let i = 1; i < localStorage.length; i++ ){
            if (localStorage.key(i) != "mode"){
                if (pseudo == localStorage.key(i) && mdp == localStorage.keyindex(i).mdp){
                    valide = i;
                    break;
                }
            }
        }
        if (valide != -1){
            if(confirm("Voulez vraiment vous connectez monsieur " + localStorage.keyindex(valide).nom + " ?")){
                document.getElementById("pseudo2").value = "";
                document.getElementById("mdp2").value = "";
                connecter(localStorage.keyindex(valide));
            }
        }else{
            alert("Ce compte n'existe pas !");
        }
    }
}

// Fonctions pour enregistrer un nouvel utilisateur ou se connecter ou supprimer son compte ou se déconnecter

function enregistrer(pseudo, prénom, nom, mdp) {
    $(register).css('display', 'none');
    $(login).css('display', 'block');
    personne = new Person(pseudo, prénom, nom, mdp, 0);
    localStorage.setObject(pseudo, personne);
    liste_personne.push([personne.nomComplet(), personne.score]);
    Ajouter_personne();
}

function connecter(personne){
    $(register).css('display', 'block');
    $(login).css('display', 'none');
    localStorage.setItem("mode",personne.pseudo);
    window.location='/';
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
