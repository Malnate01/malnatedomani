/**
 * MALNATE.DOMANI 5 - DETTAGLIO-COMUNE.JS (Risoluzione del Filtro Numerico)
 */
document.addEventListener("DOMContentLoaded", () => {
    
    // -----------------------------------------------------------------
    // 1. LETTURA RIGIDA DEL PARAMETRO ?id= DALL'URL
    // -----------------------------------------------------------------
    const parametriUrl = new URLSearchParams(window.location.search);
    const idSelezionato = parametriUrl.get('id');

    // Nasconde preventivamente tutti i macro-blocchi geometrici della pagina
    const tutteLeSezioni = document.querySelectorAll(".blocco-argomento-dinamico");
    tutteLeSezioni.forEach(sez => {
        sez.style.display = "none";
    });

    // Filtra e mostra solo la sezione corretta in base al numero cliccato
    if (idSelezionato === '1') {
        document.getElementById('sezione-amministrazione').style.display = 'block';
    } else if (idSelezionato === '2') {
        document.getElementById('sezione-statuto').style.display = 'block';
    } else if (idSelezionato === '3') {
        document.getElementById('sezione-regolamenti').style.display = 'block';
    } else if (idSelezionato === '4') {
        document.getElementById('sezione-partecipazione').style.display = 'block';
    } else {
        // Fallback di sicurezza: se l'id manca o non è valido, mostra l'amministrazione
        document.getElementById('sezione-amministrazione').style.display = 'block';
    }

    // -----------------------------------------------------------------
    // 2. MOTORE DI APERTURA OVERLAY AL CLIC SUI NODI INTERNI
    // -----------------------------------------------------------------
    const nodiBox = document.querySelectorAll(".nodo-politico");

    nodiBox.forEach(box => {
        box.addEventListener("click", () => {
            const targetId = box.getAttribute("data-target");
            const overlayTarget = document.getElementById(targetId);
            
            if (overlayTarget) {
                // Disattiva graficamente i nodi fratelli nella sezione attualmente visibile
                const sezioneAttiva = box.closest(".blocco-argomento-dinamico");
                if (sezioneAttiva) {
                    sezioneAttiva.querySelectorAll(".nodo-politico").forEach(n => n.classList.remove("attivo"));
                }
                
                // Accende il contorno verde sul nodo cliccato
                box.classList.add("attivo");

                // Fa scivolare il pannello overlay a schermo intero
                overlayTarget.classList.add("attivo");
                document.body.style.overflow = "hidden"; // Blocca lo scorrimento inferiore
            }
        });
    });

    // -----------------------------------------------------------------
    // 3. CHIUSURA UNIVERSALE DEI PANNELLI OVERLAY CIVICI
    // -----------------------------------------------------------------
    function chiudiPannello(pannello) {
        if (!pannello) return;
        
        pannello.classList.remove("attivo");
        document.body.style.overflow = "auto"; // Ripristina lo scorrimento naturale
        nodiBox.forEach(n => n.classList.remove("attivo"));
    }

    // Aggancia la chiusura alla "X" di tutti gli overlay
    document.querySelectorAll(".pulsante-chiudi-overlay").forEach(pulsante => {
        pulsante.addEventListener("click", (evento) => {
            evento.stopPropagation();
            const pannelloGenitore = pulsante.closest(".sovrapposizione-overlay");
            chiudiPannello(pannelloGenitore);
        });
    });

    // Aggancia la chiusura al clic sullo sfondo scuro esterno alla finestra
    document.querySelectorAll(".sovrapposizione-overlay").forEach(overlay => {
        overlay.addEventListener("click", (evento) => {
            if (evento.target === overlay) {
                chiudiPannello(overlay);
            }
        });
    });
});
