let slideIndex = 0; // Indice corrente della slide
const slides = document.querySelectorAll(".project-slide"); // Seleziona tutte le slide
let autoScroll; // Variabile per il timer dello scorrimento automatico
let direction = 1; // Direzione dello scorrimento, 1 per avanti, -1 per indietro

function showSlides() {
    for (const slide of slides) {
        slide.style.transform = `translateX(-${slideIndex * 100}%)`; // Muove le slide
    }
}

function moveSlide(n) {
    slideIndex += n; // Aggiorna l'indice della slide

    // Controlla se superiamo i limiti
    if (slideIndex >= slides.length) {
        slideIndex = slides.length - 1; // Rimani sull'ultima slide
        direction = -1; // Cambia direzione a indietro
    } else if (slideIndex < 0) {
        slideIndex = 0; // Rimani sulla prima slide
        direction = 1; // Cambia direzione a avanti
    }

    showSlides(); // Mostra le slide aggiornate
}

// Funzione per avviare lo scorrimento automatico
function startAutoScroll() {
    autoScroll = setInterval(() => {
        moveSlide(direction); // Scorre nella direzione attuale
    }, 5000); // Ogni 5 secondi
}

// Funzione per fermare lo scorrimento automatico
function stopAutoScroll() {
    clearInterval(autoScroll); // Ferma lo scorrimento automatico
}

// Funzione per resettare lo scorrimento automatico
function resetAutoScroll() {
    stopAutoScroll(); // Ferma lo scorrimento
    startAutoScroll(); // Riavvia lo scorrimento
}

// Scorrimento automatico all'avvio della pagina
startAutoScroll();

// Inizializza le slide
showSlides();

