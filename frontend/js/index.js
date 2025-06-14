document.addEventListener("DOMContentLoaded", function () {
  console.log("JavaScript carregado com sucesso!");

  // Animação simples ao rolar a página
  const sections = document.querySelectorAll("section");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = "translateY(30px)";
    section.style.transition = "all 0.6s ease-out";
    observer.observe(section);
  });




  // --- Carrossel de Imagem Única (5 imagens) ---
  const singleSlides = document.querySelectorAll('.full-width-carousel .carousel-slide-single');
  const singleCarouselContainer = document.querySelector('.full-width-carousel .carousel-container');
  const singleDotsContainer = document.querySelector('.carousel-dots-single');
  let singleCurrentIndex = 0;
  let singleInterval;

  // Cria os pontos de navegação
  singleSlides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot-single');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      clearInterval(singleInterval); // Limpa o intervalo automático ao clicar no ponto
      singleCurrentIndex = index;
      updateSingleCarousel();
      startSingleCarousel(); // Reinicia o intervalo
    });
    singleDotsContainer.appendChild(dot);
  });

  const singleDots = document.querySelectorAll('.dot-single');

  const updateSingleCarousel = () => {
    singleCarouselContainer.style.transform = `translateX(-${singleCurrentIndex * 100}%)`;
    singleDots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === singleCurrentIndex);
    });
  };

  const nextSingleSlide = () => {
    singleCurrentIndex = (singleCurrentIndex + 1) % singleSlides.length;
    updateSingleCarousel();
  };

  const startSingleCarousel = () => {
    clearInterval(singleInterval); // Garante que não há múltiplos intervalos
    singleInterval = setInterval(nextSingleSlide, 5000); // Muda a cada 5 segundos
  };

  // Inicia o carrossel automático
  startSingleCarousel();

  // Garante que o carrossel se ajusta ao redimensionar
  window.addEventListener('resize', () => {
    updateSingleCarousel();
  });



  // --- Carrossel de Múltiplas Imagens (8 imagens) ---
  const multiCarouselTrack = document.querySelector('.multi-image-carousel .carousel-track');
  const multiSlides = Array.from(multiCarouselTrack.children);
  const multiNextButton = document.querySelector('.multi-image-carousel .next-btn');
  const multiPrevButton = document.querySelector('.multi-image-carousel .prev-btn');

  let multiCurrentSlideIndex = 0; // Índice do primeiro slide visível

  // Função para calcular quantos slides visíveis teremos
  const getMultiSlidesPerPage = () => {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    return 3;
  };

  const updateMultiCarouselPosition = () => {
    // Pega a largura do primeiro slide, incluindo padding/margin do CSS
    const slideWidth = multiSlides[0].getBoundingClientRect().width +
      (parseFloat(getComputedStyle(multiSlides[0]).paddingLeft) * 2); // Exemplo de como pegar o padding

    multiCarouselTrack.style.transform = 'translateX(' + (-slideWidth * multiCurrentSlideIndex) + 'px)';
  };

  const moveToMultiNextSlide = () => {
    const slidesPerPage = getMultiSlidesPerPage();
    // Se o próximo movimento exceder o final, vá para o último slide possível
    // (para que o espaço vazio não apareça no final)
    if (multiCurrentSlideIndex + 1 <= multiSlides.length - slidesPerPage) {
      multiCurrentSlideIndex++;
    } else {
      // Ou, se quiser que ele reinicie ao chegar ao final:
      multiCurrentSlideIndex = 0;
    }
    updateMultiCarouselPosition();
  };

  const moveToMultiPrevSlide = () => {
    if (multiCurrentSlideIndex > 0) {
      multiCurrentSlideIndex--;
    } else {
      // Ou, se quiser que ele vá para o final ao chegar ao início:
      multiCurrentSlideIndex = multiSlides.length - getMultiSlidesPerPage();
    }
    updateMultiCarouselPosition();
  };

  // Event Listeners para os botões do segundo carrossel
  multiNextButton.addEventListener('click', moveToMultiNextSlide);
  multiPrevButton.addEventListener('click', moveToMultiPrevSlide);

  // Atualiza a posição do carrossel ao redimensionar a janela
  window.addEventListener('resize', () => {
    // Ao redimensionar, redefina o índice para 0 para evitar problemas de layout
    multiCurrentSlideIndex = 0;
    updateMultiCarouselPosition();
  });


  // Contadores animados
  const counters = document.querySelectorAll('.counter');
  const speed = 200; // quanto menor, mais rápido

  counters.forEach(counter => {
    const animate = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;

      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(animate, 20);
      } else {
        counter.innerText = target;
      }
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate();
          observer.unobserve(counter);
        }
      });
    }, { threshold: 1 });

    observer.observe(counter);
  });


  // Inicializa a posição do carrossel quando a página carrega
  updateMultiCarouselPosition();
  AOS.init();

});

// Ultimas atividades
async function fetchTop3Atividades() {
  try {
    const response = await fetch('http://127.0.0.1:3000/atividades/');
    if (!response.ok) {
      throw new Error('Erro ao buscar atividades');
    }

    const data = await response.json();
    const atividades = data.data; // Adjust if needed

    // Get top 3 by IdAtividade
    const top3 = atividades
      .sort((a, b) => b.IdAtividade - a.IdAtividade)
      .slice(0, 3);
    top3.reverse()
    console.log('Top 3 atividades:', top3);
    const atividadesContainer = document.getElementById('cards');
    atividadesContainer.innerHTML = ''
    top3.forEach(atividade => {
      const card = document.createElement('div');
      card.classList.add('card');
      atividadesContainer.appendChild(card);
      const titulo = atividade.titulo;
      const tituloElement = document.createElement('h3');
      card.appendChild(tituloElement);
      tituloElement.textContent = titulo;
      const local = atividade.local;
      const localElement = document.createElement('p');
      card.appendChild(localElement);
      localElement.textContent = local;
      const data = atividade.data;
      const dataElement = document.createElement('p');
      card.appendChild(dataElement);
      dataElement.textContent = new Date(data).toLocaleDateString('pt-PT', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
      // vai levar a pagina da atividade correta
      card.addEventListener('click', () => {
        window.location.href = `atividades.html?id=${atividade.IdAtividade}`;
      });
    })

  } catch (error) {
    console.error('Erro ao buscar atividades:', error);
  }
}
fetchTop3Atividades()

// display de informações de impacto
// Numero de alunos, através do numero de utilizadores com o cargo de utilizador

async function fetchUserCargoData() {
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
}
fetchUserCargoData();
// Numero de atividades realizadas, através das atividades que estão concluídas

async function fetchActivitiesFinishedData() {
  try {
    const response = await fetch('http://127.0.0.1:3000/atividades')
    if (!response.ok) {
      throw new Error('Erro ao buscar atividades');
    }
    const data = await response.json();
    const atividades = data.data;
    console.log('Atividades:', atividades);
    document.getElementById('atividadesRealizadas').textContent = atividades.length;
    // Atribuir um valor as toneladas recicladas, porque é nao temos forma de calcular isso so podemos atribuir um valor arbitrário
    document.getElementById('toneladasRecicladas').textContent = atividades.length * 0.5;
  }
  catch (error) {
    console.error('Erro ao buscar dados de impacto:', error);
  }
}
fetchActivitiesFinishedData()