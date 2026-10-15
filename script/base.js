/**
 * MALNATE.DOMANI 4 - BASE.JS (Gestione Globale Hamburger Menu)
 * Questo script fa funzionare il menu su tutte le pagine del sito.
 */
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger-trigger");
    const menuPrincipale = document.getElementById("menu-principale");

    // Controllo di sicurezza: verifichiamo che gli elementi esistano nella pagina
    if (hamburger && menuPrincipale) {
        hamburger.addEventListener("click", () => {
            // Fa scivolare il cassetto da sinistra aggiungendo la classe CSS
            menuPrincipale.classList.toggle("menu-aperto");
            // Trasforma le tre linee dell'hamburger in una X
            hamburger.classList.toggle("attivo");
        });

        // Chiude il cassetto automaticamente se l'utente clicca in un punto vuoto dello schermo
        document.addEventListener("click", (evento) => {
            if (!hamburger.contains(evento.target) && !menuPrincipale.contains(evento.target)) {
                menuPrincipale.classList.remove("menu-aperto");
                hamburger.classList.remove("attivo");
            }
        });
    }
});
