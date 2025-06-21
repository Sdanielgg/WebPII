function setupCarousel(carouselClass, indicatorId) {
    const carousel = document.querySelector(carouselClass);
    const slides = carousel.querySelectorAll('.carousel-slide');
    const indicatorsContainer = document.getElementById(indicatorId);

    const visibleSlides = 3;
    const totalSlides = slides.length;
    const maxIndex = totalSlides - visibleSlides >= 0 ? totalSlides - visibleSlides : 0;
    let currentIndex = 0;

    for (let i = 0; i <= maxIndex; i++) {
        const dot = document.createElement('span');
        dot.classList.add('carousel-indicator');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToIndex(i));
        indicatorsContainer.appendChild(dot);
    }

    const indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');

    function goToIndex(index) {
        const offset = (index * 100) / totalSlides;
        carousel.style.transform = `translateX(-${offset}%)`;
        indicators.forEach(dot => dot.classList.remove('active'));
        if (indicators[index]) indicators[index].classList.add('active');
        currentIndex = index;
    }

    goToIndex(0);
}


document.addEventListener('DOMContentLoaded', () => {
    setupCarousel('.carousel-1', 'carousel-indicators-1');
    setupCarousel('.carousel-section:nth-of-type(3) .carousel', 'carousel-indicators-2');
});

function animateCounter(stat) {
    const target = stat.getAttribute('data-target');

    if (target === '∞') {
        let count = 0;
        const maxBeforeInfinity = 100;
        const duration = 3000;
        const stepTime = Math.floor(duration / maxBeforeInfinity);

        const update = () => {
            count++;
            stat.textContent = count;

            if (count < maxBeforeInfinity) {
                setTimeout(update, stepTime);
            } else {
                stat.textContent = '∞';
            }
        };

        update();
        return;
    }

    const end = parseInt(target);
    let count = 0;
    const duration = 3000;
    const stepTime = Math.floor(duration / end);

    const update = () => {
        count++;
        stat.textContent = count;

        if (count < end) {
            setTimeout(update, stepTime);
        } else {
            stat.textContent = end;
        }
    };

    update();
}

window.addEventListener('DOMContentLoaded', () => {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => animateCounter(stat));
});

async function estatisticasLoad() {
  try {
    const response = await fetch('http://127.0.0.1:3000/Utilizador/')
    if (!response.ok) {
      throw new Error('Erro ao buscar utilizadores')
    }
    const data = await response.json();
    const utilizadores = data.data;
    console.log('Utilizadores:', utilizadores);
    const alunos = utilizadores.filter(utilizador => utilizador.cargo === 'utilizador').length;
    console.log(`Número de alunos: ${alunos}`);
    document.getElementById('alunosEnvolvidos').textContent = alunos;
  }
  catch (error) {
    console.error('Erro ao buscar dados de impacto:', error);
  }
    try {
        const response = await fetch('http://127.0.1:3000/Atividades/')
        if (!response.ok) {
            throw new Error('Erro ao buscar atividades');
        }
        const data = await response.json();
        const atividades = data.data;
        console.log('Atividades:', atividades);
        const totalAtividades = atividades.length;
        console.log(`Número total de atividades: ${totalAtividades}`);
        document.getElementById('atividadesRealizadas').textContent = totalAtividades;
    }
    catch (error) {
        console.error('Erro ao buscar dados de atividades:', error);
    }
}
estatisticasLoad();