/* ==========================================================
   MALNATE.DOMANI 3 - COMUNE.JS (Archivio ed Iniezione Dati)
   ========================================================== */

// 1. MAPPA CENTRALE DEI CONTENUTI CIVICI (Aggiungi nuovi specchietti accodandoli qui)
const archivioComune = [
    {
        id: 1,
        icona: "🏛️",
        titolo: "L'Amministrazione",
        sintesi: "Chi guida la città? L'organizzazione politica descritta attraverso le funzioni chiave del Sindaco, della Giunta, del Consiglio Comunale e delle Commissioni di lavoro."
    },
    {
        id: 2,
        icona: "📜",
        titolo: "Lo Statuto Comunale",
        sintesi: "La vera e propria 'Costituzione' di Malnate. Il documento fondamentale che stabilisce i principi, i diritti dei cittadini e le regole d'oro dell'azione del Comune."
    },
    {
        id: 3,
        icona: "⚖️",
        titolo: "I Regolamenti Locali",
        sintesi: "Dalla Polizia Locale all'Igiene Urbana. L'insieme delle ordinanze e delle norme pratiche che governano il territorio, il decoro e la convivenza civile quotidiana."
    },
    {
        id: 4,
        icona: "🗣️",
        titolo: "La Partecipazione",
        sintesi: "Gli strumenti a disposizione del cittadino per farsi sentire. Come funzionano le Consulte, i Forum tematici, le assemblee di quartiere e la presentazione di istanze ufficiali."
    },
    {
        id: 5,
        icona: "🤖",
        titolo: "L'Assistente Virtuale",
        sintesi: "Hai un dubbio su un regolamento o un verbale? Fai una domanda diretta al nostro Assistente Virtuale per approfondire i documenti ufficiali del Comune."
    }
];

// 2. FUNZIONE AUTOMATICA PER COSTRUIRE LA GRIGLIA SULLO SCHERMO
function generaSpecchietti() {
    const contenitore = document.getElementById('griglia-argomenti');
    if (!contenitore) return;
    
    // Svuota il contenitore da eventuali residui
    contenitore.innerHTML = "";
    
    // Sfoglia la mappa dati e crea un blocco per ciascun elemento
    archivioComune.forEach(argomento => {
        
        // Crea il tag del link della scheda
        const scheda = document.createElement('a');
        
        // Se è l'Assistente Virtuale (id 5), apre la pagina interna dedicata con l'iframe
        if (argomento.id === 5) {
            scheda.href = "assistente-comune.html";
        } else {
            scheda.href = `dettaglio-comune.html?id=${argomento.id}`;
        }
        
        scheda.className = 'scheda-argomento';
        
        // Costruisce la struttura interna (Emoji + Titolo + Paragrafo)
        scheda.innerHTML = `
            <h2><span class="emoji-titolo">${argomento.icona}</span> ${argomento.titolo}</h2>
            <p>${argomento.sintesi}</p>
        `;
        
        // Inserisce lo specchietto appena creato dentro la griglia della pagina
        contenitore.appendChild(scheda);
    });
}

// 3. AVVIA IL PROCESSO AL CARICAMENTO DELLA PAGINA
document.addEventListener('DOMContentLoaded', generaSpecchietti);
