console.log("Script_question running");
console.log(localStorage);

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

const liste_question = [
    [new Question("Quel est le sportif le mieux payé ?","Cristiano Ronaldo","Floyd Mayweather","Lebron James","Roger Federer",4),
        new Question("Quel est le sportif le plus médaillé des J.O. ?","Michael Phelps","Usain Bolt","Rafael Nadal","Martin Fourcade",1),
        new Question("Quel est le sportif le plus riche ?","Tiger Woods","Lionel Messi","Roger Federer","Michael Jordan",4),
        new Question("Basket : à quelle hauteur se situe le panier ?","2m95","3m05","3m15","3m25",2),
        new Question("Dans quel sport un club français a-t-il remporté une Coupe d’Europe pour la première fois ?","Basketball","Football","Handball","Volleyball",4),
        new Question("Judo : quel est le grade le plus élevé parmi ces ceintures ?","Bleue","Verte","Orange","Jaune",1),
        new Question("Basketball : quelle taille mesurait Muggsy Bogues, le plus petit joueur de l’histoire de la NBA ?","1m59","1m62","1m64","1m67",1),
        new Question("Où auront lieu les Jeux Olympiques 2022 ?","Almaty","Oslo","Pékin","Stockholm",3),
        new Question("Quelle discipline fera son apparition à Paris 2024 ?","Breakdance","Escalade","Skateboard","Surf",1),
        new Question("Le 15 avril 1993, ce club français fut le premier à gagner la plus prestigieuse coupe d'Europe, tous sports confondus ?","Olympique de Marseille","Chambéry","CSP Limoges","Paris SG-Asnières",3),
        new Question("Durant la décennie 90, Michael Jordan et les Chicago Bulls ont remportés","6 titres NBA","7 titres NBA","8 titres NBA","5 titres NBA",1),
        new Question("Michael Schumacher détient le record de titres de champion du monde de Formule 1 avec","5 titres","7 titres","6 titres","8 titres",2),
        new Question("L'alsacien Sébastien Loeb détient le record du nombre de titres de champion du monde de rallye avec","7 titres","9 titres","6 titres","8 titres",2),
        new Question("Quelle est la vitesse de pointe de Usain Bolt ?","37,58 km/h","44,72 km/h","46,24 km/h","39,56km/h",2),],
    [new Question("Question 1","a","b","c","d",1),
        new Question("Question 2","a","b","c","d",2),
        new Question("Question 3","a","b","c","d",3),
        new Question("Question 4","a","b","c","d",4)]
] ;
numero_question = -1;
numero_quiz = localStorage.getItem("numero_quiz");
console.log(numero_quiz);
afficher_question_suivante();

function Question(Intitule, rep1, rep2, rep3, rep4, BonneRep) {
    this.Intitule = Intitule;
    this.rep1 = rep1;
    this.rep2 = rep2;
    this.rep3 = rep3;
    this.rep4 = rep4;
    this.BonneRep = BonneRep;
}

function valider_question(){
    verif_reponse();
    if (numero_question < liste_question[numero_quiz].length - 1){
        afficher_question_suivante();
    }else{
        alert("Fin du quiz !");
        window.location='index.html';
    }
}

function verif_reponse(){
    const num_bonnerep = liste_question[numero_quiz][numero_question].BonneRep;
    bonnerep1 = num_bonnerep == 1 && radio1.checked;
    bonnerep2 = num_bonnerep == 2 && radio2.checked;
    bonnerep3 = num_bonnerep == 3 && radio3.checked;
    bonnerep4 = num_bonnerep == 4 && radio4.checked;
    if (bonnerep1 || bonnerep2 || bonnerep3 || bonnerep4){
        pseudo = localStorage.getItem("mode");
        joueur = localStorage.getObject(pseudo);
        joueur.score += 1;
        localStorage.setObject(pseudo, joueur);
        alert("Bonne réponse !");
    }else{
        alert("Mauvaise réponse ! La bonne réponse était la réponse " + num_bonnerep.toString() + ".");
    }
}

function afficher_question_suivante(){
    const intitule = document.getElementById("intitule");
    const rep1 = document.getElementById("reponse1");
    const rep2 = document.getElementById("reponse2");
    const rep3 = document.getElementById("reponse3");
    const rep4 = document.getElementById("reponse4");
    numero_question += 1;
    question = liste_question[numero_quiz][numero_question];
    intitule.innerText = question.Intitule;
    rep1.innerText = "1) " + question.rep1;
    rep2.innerText = "2) " + question.rep2;
    rep3.innerText = "3) " + question.rep3;
    rep4.innerText = "4) " + question.rep4;
}
