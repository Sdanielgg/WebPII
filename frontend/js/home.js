document.addEventListener('DOMContentLoaded', function () {
  const track = document.querySelector('.carousel-track');
  const indicators = document.querySelector('.carousel-indicators');
  const images = track.children;
  const imageCount = images.length;
  const imagesPerView = 3;
  let currentIndex = 0;

  // Criar um indicador por imagem
  for (let i = 0; i < imageCount; i++) {
    const dot = document.createElement('button');
    if (i === 0) dot.classList.add('active');
    indicators.appendChild(dot);
  }

  function updateCarousel(index) {
    // Garante que o índice não excede os limites possíveis
    const maxIndex = imageCount - imagesPerView;
    currentIndex = Math.min(Math.max(index, 0), maxIndex);

    const slideWidth = track.clientWidth / imagesPerView;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

    // Atualiza os indicadores
    [...indicators.children].forEach((btn, i) =>
      btn.classList.toggle('active', i === currentIndex)
    );
  }

  // Adiciona eventos aos círculos
  [...indicators.children].forEach((btn, i) => {
    btn.addEventListener('click', () => updateCarousel(i));
  });

  window.addEventListener('resize', () => updateCarousel(currentIndex));
});
