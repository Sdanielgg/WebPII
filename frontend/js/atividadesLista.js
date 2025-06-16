document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('atividade-lista');

  try {
    const resposta = await fetch("http://localhost:3000/atividades");
    const json = await resposta.json();

    const atividades = json.data || json; // para suportar ambos os formatos

    atividades.forEach(atividade => {
      const card = document.createElement('div');
      card.classList.add('atividade-card');

      card.innerHTML = `
        <h3>${atividade.nome}</h3>
        <p>${atividade.descricao}</p>
        <button onclick="verAtividade(${atividade.id})">Ver mais</button>
      `;

      container.appendChild(card);
    });

  } catch (erro) {
    console.error('Erro ao carregar atividades:', erro);
  }
});

function verAtividade(id) {
  window.location.href = `atividades.html?id=${id}`;
}
