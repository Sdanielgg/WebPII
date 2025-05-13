
document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");
  const links = document.querySelectorAll("#sidebar a");

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = link.getAttribute("href").substring(1);
      loadPage(page);
    });
  });

  function loadPage(page) {
    switch (page) {
      case "dashboard":
        content.innerHTML = `
          <h2>Dashboard</h2>
          <p>Acompanhe o progresso do plano de atividades.</p>
          <div class="placeholder">Gráficos de progresso e estatísticas aqui.</div>
        `;
        break;
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
      case "execucao":
        content.innerHTML = `
          <h2>Execução das Atividades</h2>
          <form>
            <label>Nome da Atividade: <input type="text" /></label>
            <label>Observações: <textarea></textarea></label>
            <label>Upload de Fotos: <input type="file" /></label>
            <button>Registar Execução</button>
          </form>
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
      case "relatorio":
        content.innerHTML = `
          <h2>Relatório Final</h2>
          <p>Gerar relatório com os dados recolhidos.</p>
          <button>Exportar Relatório</button>
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
      case "gamificacao":
        content.innerHTML = `
          <h2>Gamificação</h2>
          <p>Ranking e conquistas:</p>
          <ul>
            <li>Escola Verde - 150 pontos</li>
            <li>Escola Sustentável - 120 pontos</li>
            <li>Escola Iniciativa - 90 pontos</li>
          </ul>
        `;
        break;
      default:
        content.innerHTML = `
          <h2>Bem-vindo</h2>
          <p>Escolha uma secção do menu para começar.</p>
        `;
    }
  }

  loadPage("dashboard");
});
