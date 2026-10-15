/**
 * MALNATE.DOMANI 5 - DETTAGLIO-MALNATE.JS (Versione Semplificata e Commentata)
 */
document.addEventListener("DOMContentLoaded", () => {
    
    // -----------------------------------------------------------------
    // 1. CONTROLLO DELLA PAGINA DA MOSTRARE (Lettura dell'URL)
    // -----------------------------------------------------------------
    
    // Legge i parametri scritti nell'indirizzo del browser (es. ?area=storia)
    const parametriUrl = new URLSearchParams(window.location.search);
    const areaSelezionata = parametriUrl.get('area');

    // Seleziona le tre macro-aree (Natura, Storia, Sapori) e le nasconde tutte
    const tutteLeSezioni = document.querySelectorAll(".blocco-argomento-dinamico");
    tutteLeSezioni.forEach(sez => sez.style.display = "none");

    // Mostra solo la sezione che corrisponde alla scelta dell'utente
    if (areaSelezionata === 'storia') {
        document.getElementById('sezione-storia').style.display = 'block';
    } else if (areaSelezionata === 'cultura') {
        document.getElementById('sezione-sapori').style.display = 'block';
    } else {
        // Se non c'è scritto nulla o c'è "natura", mostra la sezione Natura di base
        document.getElementById('sezione-natura').style.display = 'block';
    }

    // -----------------------------------------------------------------
    // 2. APERTURA DEI PANNELLI (Al clic sui box grigi)
    // -----------------------------------------------------------------
    
    // Seleziona tutti i box grigi cliccabili della pagina
    const nodiBox = document.querySelectorAll(".nodo-politico");

    nodiBox.forEach(box => {
        box.addEventListener("click", () => {
            // Legge il nome del pannello da aprire scritto nel codice del box (data-target)
            const targetId = box.getAttribute("data-target");
            const overlayTarget = document.getElementById(targetId);
            
            if (overlayTarget) {
                // Trova la sezione in cui si trova il box e spegne la luce agli altri box vicini
                const sezioneAttiva = box.closest(".blocco-argomento-dinamico");
                sezioneAttiva.querySelectorAll(".nodo-politico").forEach(n => n.classList.remove("attivo"));
                
                // Accende il box appena cliccato (sfondo grigio scuro e cornice verde)
                box.classList.add("attivo");

                // Fa scivolare il pannello dei contenuti a tutto schermo con l'effetto fading
                overlayTarget.classList.add("attivo");
                
                // Blocca lo scorrimento della pagina principale sotto
                document.body.style.overflow = "hidden"; 

                // Se nel pannello c'è un video, lo fa partire automaticamente dall'inizio
                const video = overlayTarget.querySelector("video");
                if (video) {
                    video.currentTime = 0;
                    video.play().catch(() => console.log("Riproduzione avviata con successo"));
                }
            }
        });
    });

    // -----------------------------------------------------------------
    // 3. CHIUSURA DEI PANNELLI (Funzione universale)
    // -----------------------------------------------------------------
    
    function chiudiPannello(pannello) {
        if (!pannello) return;
        
        // Fa sparire il pannello verso l'alto con l'effetto fading out
        pannello.classList.remove("attivo");
        
        // Ridà alla pagina principale la possibilità di scorrere normalmente
        document.body.style.overflow = "auto"; 

        // Se nel pannello c'era un video acceso, lo mette subito in pausa
        const video = pannello.querySelector("video");
        if (video) {
            video.pause();
        }

        // Spegne l'illuminazione (cornice verde) sul box che era stato cliccato
        nodiBox.forEach(n => n.classList.remove("attivo"));
    }

    // Aggancia la chiusura a tutte le "X" presenti nei pannelli
    document.querySelectorAll(".pulsante-chiudi-overlay").forEach(pulsante => {
        pulsante.addEventListener("click", (evento) => {
            evento.stopPropagation(); // Evita che il clic si confonda con lo sfondo
            const pannelloGenitore = pulsante.closest(".sovrapposizione-overlay");
            chiudiPannello(pannelloGenitore);
        });
    });

    // Aggancia la chiusura anche se l'utente clicca sullo sfondo scuro fuori dalla finestra del testo
    document.querySelectorAll(".sovrapposizione-overlay").forEach(overlay => {
        overlay.addEventListener("click", (evento) => {
            if (evento.target === overlay) {
                chiudiPannello(overlay);
            }
        });
    });
});
