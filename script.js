let invitati = [];
const form = document.getElementById("form-invitati");
const btnOrdina = document.querySelector("#ordina");
const cerca = document.getElementById("barraricerca");
const select = document.querySelector("#ordine");

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

    // Ogni primo nodo della lista, finchè ne esiste uno,
    // viene eliminato ad ogni invocazione per pulizia
    while (listaInvitati.firstChild) {
        listaInvitati.removeChild(listaInvitati.firstChild)
    }

    invitati.forEach((inv, pos) => {
        
        if (!cerca || `${inv.cognome} ${inv.nome} ${inv.email}`.includes(cerca.value)) {
            
            if (select.value === "tutti" || select.value === "confermati" && inv.confermato || select.value === "non_confermati" && !inv.confermato) {
                
                const item = document.createElement(`li`);
                item.innerHTML = `
                    <div class='d-flex justify-content-between align-items-center px-3'>
                        <p class='mb-0'><b>${inv.cognome} ${inv.nome}</b> - ${inv.email}</p>
                        
                        <div>
                            <input type="checkbox"> 
                            <button class='btn btn-danger my-2'>X</button>
                        </div>
                    </div>    
                `;
                
                const checkbox = item.querySelector(`input[type="checkbox"]`);  
                const btn = item.querySelector('button')
                
                if (inv.confermato) {
                    checkbox.checked = true;
                    item.classList.add(`confermato`)
                    item.classList.remove(`non-confermato`)
                } else {
                    checkbox.checked = false;
                    item.classList.remove(`confermato`)
                    item.classList.add(`non-confermato`)
                }

                checkbox.addEventListener(`change`, (event) => {

                    inv.confermato = checkbox.checked;

                    if (inv.confermato) {
                        item.classList.add(`confermato`)
                        item.classList.remove(`non-confermato`)
                    } else {
                        item.classList.add(`non-confermato`)
                        item.classList.remove(`confermato`)
                    }

                    salvaListaInLocalStorage();
                })

                btn.addEventListener("click", (event) => {
                    const index = invitati.indexOf(inv);
                    invitati.splice(index, 1);
                    popolaLista();
                })

                listaInvitati.appendChild(item);
            }
        }
    })

    salvaListaInLocalStorage();
}

function salvaListaInLocalStorage(){
    localStorage.setItem('listaInvitati26', JSON.stringify(invitati));
}

window.addEventListener('load', () => {

    // stored =  converto in json la stringa il cui contenuto è un vettore d'oggetti
    const stored = JSON.parse(localStorage.getItem('listaInvitati26'));

    if (stored) {
        invitati = stored;
        popolaLista();
    }
});

form.addEventListener('submit', aggiungiInvitato);

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

select.addEventListener('change',popolaLista);
cerca.addEventListener('input',popolaLista);