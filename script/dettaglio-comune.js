/**
 * MALNATE.DOMANI 4 - AMMINISTRAZIONE.JS (Motore di Dettaglio Unico)
 */
document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. RICONOSCIMENTO E ACCENSIONE DEL BOX CLICCATO
    // ==========================================
    const parametriUrl = new URLSearchParams(window.location.search);
    const idSelezionato = parametriUrl.get('id');

    // Mappa per associare i numeri ID ai rispettivi blocchi HTML della pagina
    if (idSelezionato === '1') {
        document.getElementById('sezione-amministrazione').style.display = 'block';
    } else if (idSelezionato === '2') {
        document.getElementById('sezione-statuto').style.display = 'block';
    } else if (idSelezionato === '3') {
        document.getElementById('sezione-regolamenti').style.display = 'block';
    } else if (idSelezionato === '4') {
        document.getElementById('sezione-partecipazione').style.display = 'block';
    } else {
        // Se l'ID non corrisponde o manca, mostra l'amministrazione come sicurezza
        document.getElementById('sezione-amministrazione').style.display = 'block';
    }

    // ==========================================
    // 2. LOGICA DI SCAMBIO DELLE SCHEDE INTERNE (PER IL TRIANGOLO)
    // ==========================================
    const nodiPolitici = document.querySelectorAll(".nodo-politico");
    const schedeInfo = document.querySelectorAll(".scheda-info");

    if (nodiPolitici.length > 0) {
        nodiPolitici.forEach(nodo => {
            nodo.addEventListener("click", () => {
                if (nodo.classList.contains("attivo")) return;

                nodiPolitici.forEach(n => n.classList.remove("attivo"));
                nodo.classList.add("attivo");

                schedeInfo.forEach(scheda => scheda.classList.remove("attiva"));

                const targetId = nodo.getAttribute("data-target");
                const schedaTarget = document.getElementById(targetId);
                if (schedaTarget) {
                    schedaTarget.classList.add("attiva");
                }
            });
        });
    }
});
