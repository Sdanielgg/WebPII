function toggleMenu() {
  document.getElementById('sideMenu').classList.toggle('open');
}

// Fechar menu com tecla ESC
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    document.getElementById('sideMenu').classList.remove('open');
  }
});

// Fechar menu ao clicar fora
document.addEventListener('click', function (e) {
  const menu = document.getElementById('sideMenu');
  const button = document.querySelector('.menu-button');
  if (!menu.contains(e.target) && !button.contains(e.target)) {
    menu.classList.remove('open');
  }
});

  function toggleMenu() {
    document.getElementById('sideMenu').classList.toggle('open');
  }
