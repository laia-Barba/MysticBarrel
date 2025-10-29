// Carrusel de imágenes - Mystic Barrel
window.addEventListener('DOMContentLoaded', function () {
  const imgs = document.querySelectorAll('.carousel-img');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  let current = 0;
  let timer = null;

  function showImage(idx) {
    imgs.forEach((img, i) => {
      img.classList.toggle('active', i === idx);
    });
  }

  function startCarousel() {
    timer = setInterval(() => {
      current = (current + 1) % imgs.length;
      showImage(current);
    }, 4000);
  }

  prevBtn.addEventListener('click', () => {
    clearInterval(timer);
    current = (current - 1 + imgs.length) % imgs.length;
    showImage(current);
    startCarousel();
  });

  nextBtn.addEventListener('click', () => {
    clearInterval(timer);
    current = (current + 1) % imgs.length;
    showImage(current);
    startCarousel();
  });

  showImage(current);
  startCarousel();
});
