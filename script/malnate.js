/**
 * MALNATE.DOMANI 5 - MALNATE.JS (Rendering Dinamico Griglia)
 * Gestisce l'inserimento e la scalabilità delle macro-aree del territorio.
 */
document.addEventListener("DOMContentLoaded", () => {
    // Array dati iniziale (Predisposto per future e infinite aggiunte)
    const macroAree = [

	{
            id: "storia-archeologia",
            titolo: "Storia e Archeologia",
            descrizione: "Dal passato romano ai monumenti industriali che hanno fatto la città.",
            icona: "🏛️",
            link: "dettaglio-malnate.html?area=storia"
        },


        {
            id: "natura-sentieri",
            titolo: "Natura e Sentieri",
            descrizione: "Scopri la Valle Olona, i fontanili e i percorsi nel verde malnatese.",
            icona: "🥾",
            link: "dettaglio-malnate.html?area=natura"
        },
        
        {
            id: "sapori-cultura",
            titolo: "Sapori e Cultura",
            descrizione: "Tradizioni locali, eventi culturali e i prodotti tipici del territorio.",
            icona: "🍷",
            link: "dettaglio-malnate.html?area=cultura"
        }
    ];

    const gridContainer = document.getElementById("malnate-grid");

    // Funzione per generare i box quadrati all'interno della sezione
    function renderMalnateGrid(aree) {
        if (!gridContainer) return;
        
        gridContainer.innerHTML = aree.map(area => `
            <a href="${area.link}" class="grid-box" data-id="${area.id}">
                <div class="box-icon">${area.icona}</div>
                <h2 class="box-title">${area.titolo}</h2>
                <p class="box-desc">${area.descrizione}</p>
            </a>
        `).join('');
    }

    // Esecuzione del rendering dinamico
    renderMalnateGrid(macroAree);
});
