// Carrusel Simple Personalizado - Mystic Barrel
let currentSlideIndex = 0;
let slideInterval;

function showSlide(index) {
  const slides = document.getElementsByClassName('carousel-slide');
  const dots = document.getElementsByClassName('dot');
  
  if (slides.length === 0) return;
  
  // Ocultar todos los slides
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove('active');
  }
  
  // Quitar active de todos los dots
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove('active');
  }
  
  // Mostrar slide actual
  currentSlideIndex = index;
  if (currentSlideIndex >= slides.length) {
    currentSlideIndex = 0;
  } else if (currentSlideIndex < 0) {
    currentSlideIndex = slides.length - 1;
  }
  
  slides[currentSlideIndex].classList.add('active');
  dots[currentSlideIndex].classList.add('active');
}

function changeSlide(direction) {
  clearInterval(slideInterval);
  showSlide(currentSlideIndex + direction);
  startAutoSlide();
}

function currentSlide(index) {
  clearInterval(slideInterval);
  showSlide(index - 1);
  startAutoSlide();
}

function startAutoSlide() {
  slideInterval = setInterval(() => {
    showSlide(currentSlideIndex + 1);
  }, 3000);
}

// Inicializar carrusel
document.addEventListener('DOMContentLoaded', function() {
  showSlide(0);
  startAutoSlide();
});
