/**
 * MALNATE.DOMANI 5 - DETTAGLIO-COMUNE.JS (Versione Completa)
 */
document.addEventListener("DOMContentLoaded", () => {
    
    // -----------------------------------------------------------------
    // 1. CONTROLLO DELLA MACRO-SEZIONE DA MOSTRARE (Lettura parametri URL)
    // -----------------------------------------------------------------
    const parametriUrl = new URLSearchParams(window.location.search);
    const idSelezionato = parametriUrl.get('id');

    // Seleziona ed esegue il reset visivo totale di tutti i macro blocchi civici
    const tutteLeSezioni = document.querySelectorAll(".blocco-argomento-dinamico");
    tutteLeSezioni.forEach(sez => {
        sez.style.display = "none";
    });

    // Mostra esclusivamente la macro area che corrisponde al parametro URL
    if (idSelezionato === '1') {
        const sezAdmin = document.getElementById('sezione-amministrazione');
        if (sezAdmin) sezAdmin.style.display = 'block';
    } else if (idSelezionato === '2') {
        const sezStatuto = document.getElementById('sezione-statuto');
        if (sezStatuto) sezStatuto.style.display = 'block';
    } else if (idSelezionato === '3') {
        const sezReg = document.getElementById('sezione-regolamenti');
        if (sezReg) sezReg.style.display = 'block';
    } else if (idSelezionato === '4') {
        const sezPart = document.getElementById('sezione-partecipazione');
        if (sezPart) sezPart.style.display = 'block';
    } else {
        // Fallback e salvataggio di sicurezza se l'ID è assente o errato
        const sezAdmin = document.getElementById('sezione-amministrazione');
        if (sezAdmin) sezAdmin.style.display = 'block';
    }

    // -----------------------------------------------------------------
    // 2. MOTORE DI ATTIVAZIONE OVERLAY AL CLIC SUI NODI GEOMETRICI
    // -----------------------------------------------------------------
    const nodiBox = document.querySelectorAll(".nodo-politico");

    nodiBox.forEach(box => {
        box.addEventListener("click", () => {
            const targetId = box.getAttribute("data-target");
            const overlayTarget = document.getElementById(targetId);
            
            if (overlayTarget) {
                // Rimuove lo stato attivo dai nodi fratelli all'interno del blocco corrente
                const sezioneAttiva = box.closest(".blocco-argomento-dinamico");
                if (sezioneAttiva) {
                    sezioneAttiva.querySelectorAll(".nodo-politico").forEach(n => n.classList.remove("attivo"));
                }
                
                // Accende visivamente con bordo verde il nodo cliccato
                box.classList.add("attivo");

                // Esegue l'animazione di scivolamento e dissolvenza dell'overlay
                overlayTarget.classList.add("attivo");
                
                // Blocca lo scorrimento della pagina principale sottostante
                document.body.style.overflow = "hidden"; 
            }
        });
    });

    // -----------------------------------------------------------------
    // 3. MOTORE UNIVERSALE DI CHIUSURA DEI PANNELLI OVERLAY
    // -----------------------------------------------------------------
    function chiudiPannello(pannello) {
        if (!pannello) return;
        
        // Rimuove la classe attivo disattivando l'overlay verso l'alto
        pannello.classList.remove("attivo");
        
        // Ripristina lo scorrimento naturale della pagina principale
        document.body.style.overflow = "auto"; 

        // Spegne l'illuminazione (bordo verde) su tutti i nodi geometrici
        nodiBox.forEach(n => n.classList.remove("attivo"));
    }

    // Associa l'evento di chiusura a tutti i pulsanti "X" degli overlay
    document.querySelectorAll(".pulsante-chiudi-overlay").forEach(pulsante => {
        pulsante.addEventListener("click", (evento) => {
            evento.stopPropagation(); // Previene conflitti di clic nidificati
            const pannelloGenitore = pulsante.closest(".sovrapposizione-overlay");
            chiudiPannello(pannelloGenitore);
        });
    });

    // Associa l'evento di chiusura al clic sullo sfondo scuro esterno alla finestra
    document.querySelectorAll(".sovrapposizione-overlay").forEach(overlay => {
        overlay.addEventListener("click", (evento) => {
            if (evento.target === overlay) {
                chiudiPannello(overlay);
            }
        });
    });
});
