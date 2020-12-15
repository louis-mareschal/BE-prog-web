console.log("Script running");
const liste_question = [
    new Question("Mange","a","b","mange","d","reponse3"),
    new Question("1","moi","b","c","d","reponse1"),
    new Question("different","a","b","yo","d","reponse3"),
    new Question("negation","a","b","non","d","reponse3")
] ;
let score = 0 ;

function Question(Intitule, rep1, rep2, rep3, rep4, BonneRep) {
    this.Intitule = Intitule;
    this.rep1 = rep1;
    this.rep2 = rep2;
    this.rep3 = rep3;
    this.rep4 = rep4;
    this.BonneRep = BonneRep;
}


function AfficherQuestion(question) {
    const intitule = document.getElementById("intitule");
    const rep1 = document.getElementById("reponse1");
    const rep2 = document.getElementById("reponse2");
    const rep3 = document.getElementById("reponse3");
    const rep4 = document.getElementById("reponse4");
    intitule.innerText = question.Intitule;
    rep1.innerText = "1) " + question.rep1;
    rep2.innerText = "2) " + question.rep2;
    rep3.innerText = "3) " + question.rep3;
    rep4.innerText = "4) " + question.rep4;
}

function UneSeuleReponse () {
    const checkboxes = document.querySelectorAll('input[name="case"]:checked');
    return (checkboxes.length == 1 );
}

function BienRepondu (question,point) {
    const checkboxes = document.querySelectorAll('input[name="case"]:checked');
    if (UneSeuleReponse()) {
        if (question.BonneRep == checkboxes.item(0)) {
            point += 1 ;
        }
    }
    else {
        alert("On attend une unique réponse") ;
    }
}



validerButton = document.getElementById("valider") ;
AfficherQuestion(liste_question[0]) ;
validerButton.addEventListener("click", BienRepondu(liste_question[0],score));



