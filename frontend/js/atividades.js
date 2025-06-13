  async function carregarAtividades(){
    try {
      const res = await fetch('http://localhost:3000/atividades');
      const json = await res.json();

      const ul = document.getElementById('atividades-list');
      ul.innerHTML = '';
      json.data?.forEach(ativ => {
        ul.innerHTML += `
          <li>
            <strong>${ativ.titulo}</strong> - ${ativ.local} - ${new Date(ativ.data).toLocaleDateString()} 
            <br>${ativ.descricao}
          </li>`;
      })
    } catch (err) {
      console.error(err);
    }
  }

  document.getElementById('add-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = e.target;
    const novaAtividade = {
      titulo: form.titulo.value,
      local: form.local.value,
      data: form.data.value,
      descricao: form.descricao.value,
      responsavel: parseInt(form.responsavel.value, 10),
    };
    try {
      const res = await fetch('http://localhost:3000/atividades', {
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(novaAtividade),
      });

      if (res.ok) {
        form.reset();
        await carregarAtividades();
      } else {
        const erro = await res.json();
        console.error('Erro ao salvar atividade!', erro);
      }
    } catch (err) {
      console.error(err);
    }
  });

  window.onload = carregarAtividades;