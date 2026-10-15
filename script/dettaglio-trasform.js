/* ==========================================================
   MALNATE.DOMANI 3 - FUTURO.JS (Fading Varianti ad Alternanza)
   ========================================================== */

// 1. MAPPA CENTRALE DEI DATI
const archivioTrasformazioni = [
    { 
        id: 1, 
        ubicazione: "Via Binaghi - Centro", 
        presente: "Ora via Binaghi.jpg", 
        futuro: ["Dopo via Binaghi.jpg"]
    },
    { 
        id: 2, 
        ubicazione: "Via Somalia - Centro", 
        presente: "Ora via Somalia fronte.jpg", 
        futuro: ["Dopo via Somalia fronte.jpg"] 
    },
    { 
        id: 3, 
        ubicazione: "Via Somalia (retro) - Centro", 
        presente: "Ora via Somalia retro.jpg", 
        futuro: ["Dopo via Somalia retro.jpg"] 
    },
    { 
        id: 4, 
        ubicazione: "Via Volta - Centro Storico", 
        presente: "Ora cen sto via Volta.jpg", 
        futuro: ["Dopo cen sto via Volta.jpg"] 
    },

    { 
        id: 5, 
        ubicazione: "Via Gramsci - Centro Storico", 
        presente: "Ora cen sto via Gramsci.jpg", 
        futuro: ["Dopo cen sto via Gramsci.jpg"] 
    },

{ 
        id: 6, 
        ubicazione: "Piazza Cavour - Centro Storico", 
        presente: "Ora cen sto pza Cavour.jpg", 
        // ESEMPIO REALE: più soluzioni per lo stesso identico luogo con transizione lenta
        futuro: ["Dopo cen sto pza Cavour.jpg", "Dopo cen sto pza Cavour 2.mp4" ,  "Dopo cen sto pza Cavour 2.jpg" , "Dopo cen sto pza Cavour 1.mp4"] 
    },

    { 
        id: 7, 
        ubicazione: "SOS e Protezione Civile - Centro", 
        presente: "Ora sos pro civ.jpg", 
        futuro: ["Dopo sos pro civ.jpg"] 
    },
    

    { 
        id: 8, 
        ubicazione: "exSiome - Loc. Folla di Malnate", 
        presente: "Ora exSiome prima.jpg", 
        // ESEMPIO REALE: Due diverse soluzioni per lo stesso identico luogo con transizione lenta
        futuro: ["Ora exSiome panoramica.jpg", "Dopo exSiome 1+2.mp4", "Dopo exSiome giorno.mp4"] 
    }
];

// 2. RECUPERO DEI RIFERIMENTI DALL'HTML
const imgPresente = document.getElementById('foto-presente');
const imgFuturo = document.getElementById('foto-futuro');
const videoFuturo = document.getElementById('video-futuro');
const testoLuogo = document.getElementById('testo-luogo');
const istruzioneClic = document.getElementById('istruzione-clic');
const btnInizio = document.getElementById('box-cliccabile');
const btnSinistra = document.getElementById('freccia-sinistra');
const btnDestra = document.getElementById('freccia-destra');

// Stato globale dello slider
let indiceLuogoCorrente = 0;
let sottoIndiceFuturo = -1; // -1 = PRESENTE. 0, 1, 2... = FUTURI

// 3. FUNZIONE DI CONTROLLO: VERIFICA SE IL FILE È UN VIDEO (.mp4)
function cambiaInVideo(nomeFile) {
    if (!nomeFile) return false;
    const estensione = nomeFile.split('.').pop().toLowerCase();
    return estensione === 'mp4';
}

// 4. FUNZIONE PRINCIPALE: CARICAMENTO DEI CONTENUTI DI UN LUOGO
function mostraLuogo(indice) {
    if (indice < 0 || indice >= archivioTrasformazioni.length) return;
    
    indiceLuogoCorrente = indice;
    const dati = archivioTrasformazioni[indiceLuogoCorrente];
    
    // Disattiviamo le transizioni per evitare flash visivi durante il cambio luogo con le frecce
    imgPresente.style.transition = 'none';
    imgFuturo.style.transition = 'none';
    videoFuturo.style.transition = 'none';
    
    // Ripristiniamo lo stato sul PRESENTE
    sottoIndiceFuturo = -1;
    imgFuturo.classList.remove('visibile');
    videoFuturo.classList.remove('visibile');
    videoFuturo.pause();
    imgPresente.classList.add('visibile');
    
    // Svuotiamo le vecchie sorgenti
    imgPresente.src = "";
    imgFuturo.src = "";
    videoFuturo.src = "";
    
    // Carichiamo la nuova foto del presente e il testo dell'ubicazione
    imgPresente.src = `immagini/${dati.presente}`;
    testoLuogo.textContent = dati.ubicazione;
    
    // Forza il browser ad applicare le modifiche a tempo zero
    imgPresente.offsetHeight; 
    
    // Riattiviamo il comportamento naturale delle transizioni CSS
    imgPresente.style.transition = '';
    imgFuturo.style.transition = '';
    videoFuturo.style.transition = '';
    
    // Scrittura dinamica dell'istruzione iniziale
    if (dati.futuro.length > 1) {
        istruzioneClic.textContent = `Clicca sulla foto per vedere il futuro (Disponibili ${dati.futuro.length} soluzioni)`;
    } else {
        istruzioneClic.textContent = "Clicca sulla foto per vedere il futuro";
    }
    istruzioneClic.style.color = "#28a745";
}

// 5. GESTIONE DEL CLICK INTERNO ALLA FOTO (CICLO DELLE TRASFORMAZIONI CON ALTERNANZA DI LAYER)
btnInizio.addEventListener('click', () => {
    const dati = archivioTrasformazioni[indiceLuogoCorrente];
    const totaleSoluzioni = dati.futuro.length;
    
    // Avanziamo nel ciclo delle soluzioni
    sottoIndiceFuturo++;
    if (sottoIndiceFuturo >= totaleSoluzioni) {
        sottoIndiceFuturo = -1; 
    }
    
    if (sottoIndiceFuturo === -1) {
        // AZIONE: RITORNO AL PRESENTE (Spegne tutto il resto)
        imgFuturo.classList.remove('visibile');
        videoFuturo.classList.remove('visibile');
        videoFuturo.pause();
        imgPresente.classList.add('visibile');
        
        if (totaleSoluzioni > 1) {
            istruzioneClic.textContent = `Clicca sulla foto per vedere il futuro (Disponibili ${totaleSoluzioni} soluzioni)`;
        } else {
            istruzioneClic.textContent = "Clicca sulla foto per vedere il futuro";
        }
        istruzioneClic.style.color = "#28a745";
    } else {
        // AZIONE: MOSTRA LA TRASFORMAZIONE ATTUALE IN UN LAYER SPENTO PER ATTIVARE IL FADING
        const fileFuturoCorrente = dati.futuro[sottoIndiceFuturo];
        const eUnVideo = cambiaInVideo(fileFuturoCorrente);
        
        // Spegne lo schermo del presente
        imgPresente.classList.remove('visibile');
        
        // BILANCIAMENTO DEL CARICAMENTO:
        // Se sottoIndiceFuturo è PAR (0, 2, 4...) carichiamo nel tag <img> e spegniamo il <video>.
        // Se sottoIndiceFuturo è DISPARI (1, 3, 5...) usiamo il tag <video> come contenitore grafico d'appoggio per l'immagine.
        if (sottoIndiceFuturo % 2 === 0) {
            // Usa il tag IMMAGINE (Layer A)
            videoFuturo.classList.remove('visibile');
            videoFuturo.pause();
            
            if (eUnVideo) {
                // Caso rarissimo di video in posizione pari, gestito per stabilità
                imgFuturo.classList.remove('visibile');
                videoFuturo.src = `immagini/${fileFuturoCorrente}`;
                videoFuturo.classList.add('visibile');
                videoFuturo.play().catch(err => console.log(err));
            } else {
                imgFuturo.src = `immagini/${fileFuturoCorrente}`;
                imgFuturo.classList.add('visibile'); // Adesso sfuma lentamente perché nasce da una classe spenta!
            }
        } else {
            // Usa il tag VIDEO (Layer B) - Se è un'immagine, la appoggiamo qui sfruttando il trucco del poster/sorgente
            imgFuturo.classList.remove('visibile');
            
            if (eUnVideo) {
                videoFuturo.src = `immagini/${fileFuturoCorrente}`;
                videoFuturo.classList.add('visibile');
                videoFuturo.play().catch(err => console.log(err));
            } else {
                // TRUCCO: Usiamo l'attributo 'poster' del tag video per mostrare l'immagine statica nel secondo pannello spento
                videoFuturo.src = ""; // Disattiva flussi video precedenti
                videoFuturo.poster = `immagini/${fileFuturoCorrente}`;
                videoFuturo.classList.add('visibile'); // Sfuma lentamente in ingresso!
            }
        }
        
        // Testo di cortesia dinamico calibrato
        if (totaleSoluzioni > 1) {
            istruzioneClic.textContent = `Soluzione ${sottoIndiceFuturo + 1} di ${totaleSoluzioni} - Clicca per avanzare`;
            istruzioneClic.style.color = "#00adb5"; 
        } else {
            istruzioneClic.textContent = "Clicca per tornare al presente";
            istruzioneClic.style.color = "#aaaaaa";
        }
    }
});

// 6. COMANDI DELLE FRECCE LATERALI (CAMBIO LUOGO)
btnSinistra.addEventListener('click', (e) => {
    e.stopPropagation(); 
    let nuovoIndice = indiceLuogoCorrente - 1;
    if (nuovoIndice < 0) nuevoIndice = archivioTrasformazioni.length - 1;
    mostraLuogo(nuovoIndice);
});

btnDestra.addEventListener('click', (e) => {
    e.stopPropagation();
    let nuovoIndice = indiceLuogoCorrente + 1;
    if (nuovoIndice >= archivioTrasformazioni.length) nuovoIndice = 0;
    mostraLuogo(nuovoIndice);
});

// 7. LETTURA DELL'ID DALL'INDIRIZZO DELLA PAGINA
function inizializzaPagina() {
    const parametriURL = new URLSearchParams(window.location.search);
    const idSelezionato = parseInt(parametriURL.get('id'));
    const indiceTrovato = archivioTrasformazioni.findIndex(item => item.id === idSelezionato);
    
    if (indiceTrovato !== -1) {
        mostraLuogo(indiceTrovato);
    } else {
        mostraLuogo(0);
    }
}

// Accende lo slider
inizializzaPagina();
