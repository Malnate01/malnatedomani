/**
 * MALNATE.DOMANI 5 - DETTAGLIO-COMUNE.JS (Allineato a Dettaglio-Malnate)
 */
document.addEventListener("DOMContentLoaded", () => {
    
    // -----------------------------------------------------------------
    // 1. GESTIONE DELLA SOTTO-PAGINA INIZIALE (Parametri URL)
    // -----------------------------------------------------------------
    const parametriUrl = new URLSearchParams(window.location.search);
    const idSelezionato = parametriUrl.get('id');

    // Nasconde tutti i macro blocchi civici prima di caricare quello corretto
    const tutteLeSezioni = document.querySelectorAll(".blocco-argomento-dinamico");
    tutteLeSezioni.forEach(sez => sez.style.display = "none");

    // Mostra il macro blocco richiesto nell'URL
    if (idSelezionato === '1') {
        document.getElementById('sezione-amministrazione').style.display = 'block';
    } else if (idSelezionato === '2') {
        document.getElementById('sezione-statuto').style.display = 'block';
    } else if (idSelezionato === '3') {
        document.getElementById('sezione-regolamenti').style.display = 'block';
    } else if (idSelezionato === '4') {
        document.getElementById('sezione-partecipazione').style.display = 'block';
    } else {
        // Backup di sicurezza se l'ID è vuoto o errato
        document.getElementById('sezione-amministrazione').style.display = 'block';
    }

    // -----------------------------------------------------------------
    // 2. APERTURA OVERLAY SLIDING AL CLIC SUI NODI CIVICI
    // -----------------------------------------------------------------
    const nodiBox = document.querySelectorAll(".nodo-politico");

    nodiBox.forEach(box => {
        box.addEventListener("click", () => {
            const targetId = box.getAttribute("data-target");
            const overlayTarget = document.getElementById(targetId);
            
            if (overlayTarget) {
                // Togli lo stato attivo dai vicini nello stesso blocco
                const sezioneAttiva = box.closest(".blocco-argomento-dinamico");
                sezioneAttiva.querySelectorAll(".nodo-politico").forEach(n => n.classList.remove("attivo"));
                
                // Accendi graficamente il nodo selezionato
                box.classList.add("attivo");

                // Fai scivolare l'overlay a tutto schermo
                overlayTarget.classList.add("attivo");
                document.body.style.overflow = "hidden"; // Blocca lo sfondo
            }
        });
    });

    // -----------------------------------------------------------------
    // 3. CHIUSURA UNIVERSALE DEI PANNELLI OVERLAY
    // -----------------------------------------------------------------
    function chiudiPannello(pannello) {
        if (!pannello) return;
        
        pannello.classList.remove("attivo");
        document.body.style.overflow = "auto"; // Sblocca la pagina sotto
        nodiBox.forEach(n => n.classList.remove("attivo"));
    }

    // Chiudi premendo sulla "X"
    document.querySelectorAll(".pulsante-chiudi-overlay").forEach(pulsante => {
        pulsante.addEventListener("click", (evento) => {
            evento.stopPropagation();
            const pannelloGenitore = pulsante.closest(".sovrapposizione-overlay");
            chiudiPannello(pannelloGenitore);
        });
    });

    // Chiudi premendo fuori dalla finestra di testo (sullo sfondo scuro)
    document.querySelectorAll(".sovrapposizione-overlay").forEach(overlay => {
        overlay.addEventListener("click", (evento) => {
            if (evento.target === overlay) {
                chiudiPannello(overlay);
            }
        });
    });
});
