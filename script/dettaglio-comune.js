/**
 * MALNATE.DOMANI 5 - DETTAGLIO-COMUNE.JS (Esclusivo Macchina Amministrativa)
 */
document.addEventListener("DOMContentLoaded", () => {
    
    // -----------------------------------------------------------------
    // 1. FILTRO SEZIONI CIVICHE DA LINK DELLA HOME (?area=...)
    // -----------------------------------------------------------------
    const parametriUrl = new URLSearchParams(window.location.search);
    const areaSelezionata = parametriUrl.get('area');

    // Reset visivo di tutti i macro argomenti comunali
    const tutteLeSezioni = document.querySelectorAll(".blocco-argomento-dinamico");
    tutteLeSezioni.forEach(sez => {
        sez.style.display = "none";
    });

    // Mostra la sezione basandosi sui parametri reali della vita civica
    if (areaSelezionata === 'amministrazione') {
        document.getElementById('sezione-amministrazione').style.display = 'block';
    } else if (areaSelezionata === 'statuto') {
        document.getElementById('sezione-statuto').style.display = 'block';
    } else if (areaSelezionata === 'regolamenti') {
        document.getElementById('sezione-regolamenti').style.display = 'block';
    } else if (areaSelezionata === 'partecipazione') {
        document.getElementById('sezione-partecipazione').style.display = 'block';
    } else {
        // Di base, se il link è generico, mostra l'amministrazione
        document.getElementById('sezione-amministrazione').style.display = 'block';
    }

    // -----------------------------------------------------------------
    // 2. APERTURA DEGLI OVERLAY CON EFFETTO SLIDE
    // -----------------------------------------------------------------
    const nodiBox = document.querySelectorAll(".nodo-politico");

    nodiBox.forEach(box => {
        box.addEventListener("click", () => {
            const targetId = box.getAttribute("data-target");
            const overlayTarget = document.getElementById(targetId);
            
            if (overlayTarget) {
                // Rimuove lo stato attivo dai nodi vicini
                const sezioneAttiva = box.closest(".blocco-argomento-dinamico");
                if (sezioneAttiva) {
                    sezioneAttiva.querySelectorAll(".nodo-politico").forEach(n => n.classList.remove("attivo"));
                }
                
                // Accende il contorno del nodo premuto
                box.classList.add("attivo");

                // Fa scivolare l'overlay a tutto schermo
                overlayTarget.classList.add("attivo");
                document.body.style.overflow = "hidden"; // Ferma la pagina sotto
            }
        });
    });

    // -----------------------------------------------------------------
    // 3. CHIUSURA DEI PANNELLI OVERLAY CIVICI
    // -----------------------------------------------------------------
    function chiudiPannello(pannello) {
        if (!pannello) return;
        
        pannello.classList.remove("attivo");
        document.body.style.overflow = "auto"; // Sblocca la pagina principale
        nodiBox.forEach(n => n.classList.remove("attivo"));
    }

    // Clic sulla "X"
    document.querySelectorAll(".pulsante-chiudi-overlay").forEach(pulsante => {
        pulsante.addEventListener("click", (evento) => {
            evento.stopPropagation();
            const pannelloGenitore = pulsante.closest(".sovrapposizione-overlay");
            chiudiPannello(pannelloGenitore);
        });
    });

    // Clic fuori dalla finestra (sullo sfondo scuro)
    document.querySelectorAll(".sovrapposizione-overlay").forEach(overlay => {
        overlay.addEventListener("click", (evento) => {
            if (evento.target === overlay) {
                chiudiPannello(overlay);
            }
        });
    });
});
