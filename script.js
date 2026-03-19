const invitati = [];
const form = document.getElementById("form-invitati");
const btnOrdina = document.querySelector("#ordina");
const cerca = document.querySelector("#barraricerca");

function aggiungiInvitato(e) {

    e.preventDefault();

    let cognome = document.querySelector("#cognome").value.trim();
    let nome = document.querySelector("#nome").value.trim();
    let email = document.querySelector("#email").value.trim();

    const invitato = {
        "cognome": cognome,
        "nome": nome,
        "email": email,
        "confermato": false
    }

    invitati.push(invitato);
    popolaLista();
    form.reset();
}

function popolaLista() {

    const listaInvitati = document.getElementById(`lista-invitati`)

    while (listaInvitati.firstChild) {
        listaInvitati.removeChild(listaInvitati.firstChild)
    }

    invitati.forEach((inv, pos) => {

        const item = document.createElement(`li`);
        item.innerHTML = `${inv.cognome} ${inv.nome}: ${inv.email} <input type="checkbox"> <button>X</button>`;

        const btn = item.querySelector(`button`);
        const checkbox = item.querySelector(`input[type="checkbox"]`);

        const selectDotValue = document.querySelector("#ordine-select").value;

        if (!cerca || `${inv.cognome} ${inv.nome} ${inv.email}`.contains(cerca)) {

            if (
                (selectDotValue === "tutti") ||
                (selectDotValue === "confermati" && inv.confermato) ||
                (selectDotValue === "nonconfermati" && !inv.confermato)
            ) {

                if (inv.confermato) {
                    checkbox.checked = true;
                    item.classList.add(`confermato`)
                    item.classList.remove(`non-confermato`)
                } else {
                    checkbox.checked = false;
                    item.classList.remove(`confermato`)
                    item.classList.add(`non-confermato`)
                }

                btn.addEventListener("click", (event) => {
                    invitati.splice(pos, 1);
                    popolaLista();
                })

                checkbox.addEventListener(`change`, (event) => {

                    inv.confermato = checkbox.checked;

                    if (inv.confermato) {
                        item.classList.add(`confermato`)
                        item.classList.remove(`non-confermato`)
                    } else {
                        item.classList.add(`non-confermato`)
                        item.classList.remove(`confermato`)
                    }
                })

                listaInvitati.appendChild(item);
            }
        }
    })
}

btnOrdina.addEventListener('click', (event) => {

    invitati.sort((a, b) => {
        if (a.cognome < b.cognome) {
            return -1;
        } else {

            if (a.cognome > b.cognome) {
                return 1;
            } else {
                if (a.nome < b.nome) {
                    return -1;
                } else if (a.nome > b.nome) {
                    return 1;
                } else {
                    return 0;
                }
            }
        }
    });

    popolaLista();
})

form.addEventListener('submit', aggiungiInvitato);