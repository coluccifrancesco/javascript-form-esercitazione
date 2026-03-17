console.log("Here we are");

const invitati = [];

function aggiungiInvitato(){
    e.preventDefault();

    let cognome = document.querySelector("#cognome").value.trim()
    let nome = document.querySelector("#nome").value.trim()
    let email = document.querySelector("#email").value.trim()

    const invitato = {
        "cognome": cognome ,
        "nome": nome ,
        "email": email ,
        "confermato": false
    }

    invitati.push(invitato)
}