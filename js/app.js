document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");
  const links = document.querySelectorAll("#topbar a");
  const topbar = document.getElementById("topbar");
  const heroLogo = document.querySelector(".hero-logo");

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = link.getAttribute("href").substring(1);
      loadPage(page);
    });
  });

  function loadPage(page) {
    switch (page) {
      case "atividades":
        content.innerHTML = `
          <h2>Plano de Atividades</h2>
          <form>
            <label>Nova Atividade: <input type="text" placeholder="Nome da atividade" /></label>
            <button>Adicionar</button>
          </form>
          <p>Lista de atividades com filtros...</p>
        `;
        break;
      case "reunioes":
        content.innerHTML = `
          <h2>Reuniões</h2>
          <form>
            <label>Data: <input type="date" /></label>
            <label>Participantes: <input type="text" placeholder="Separar por vírgulas" /></label>
            <label>Atas (upload): <input type="file" /></label>
            <button>Guardar Reunião</button>
          </form>
        `;
        break;
      case "utilizadores":
        content.innerHTML = `
          <h2>Gestão de Utilizadores</h2>
          <form>
            <label>Nome: <input type="text" /></label>
            <label>Email: <input type="email" /></label>
            <label>Tipo de Utilizador:
              <select>
                <option>Administrador</option>
                <option>Coordenador</option>
                <option>Participante</option>
              </select>
            </label>
            <button>Adicionar Utilizador</button>
          </form>
        `;
        break;
      default:
        content.innerHTML = ``;
    }
  }

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    if (scrollY > 100) {
      topbar.classList.add("visible");
      heroLogo.classList.add("hidden");
    } else {
      topbar.classList.remove("visible");
      heroLogo.classList.remove("hidden");
    }
  });

  loadPage("");
});
