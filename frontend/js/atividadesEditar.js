let mostrarExcluir = false;

  async function carregarAtividades() {
    try {
      const res = await fetch("http://localhost:3000/atividades");
      const json = await res.json();

      const ul = document.getElementById("atividades-list");
      ul.innerHTML = "";
      json.data?.forEach((ativ) => {
        const li = document.createElement("li");

        li.innerHTML = `
          <strong>${ativ.titulo}</strong> - ${ativ.local} - ${new Date(
          ativ.data
        ).toLocaleDateString()}
          <br>${ativ.descricao}
        `;

        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.className = "btn-excluir";
        if (mostrarExcluir) btnExcluir.classList.add("mostrar");

        btnExcluir.onclick = async () => {
          if (
            confirm(`Deseja realmente excluir a atividade "${ativ.titulo}"?`)
          ) {
            const resDelete = await fetch(
              `http://localhost:3000/atividades/${ativ.IdAtividade}`,
              {
                method: "DELETE",
              }
            );

            if (resDelete.status === 204) {
              alert("Atividade excluída com sucesso!");
              carregarAtividades();
            } else {
              alert("Erro ao excluir atividade!");
            }
          }
        };

        li.appendChild(btnExcluir);
        ul.appendChild(li);
      });
    } catch (err) {
      console.error(err);
    }
  }

  document
    .getElementById("btn-editar-atividades")
    .addEventListener("click", () => {
      mostrarExcluir = !mostrarExcluir;
      document.querySelectorAll(".btn-excluir").forEach((btn) => {
        if (mostrarExcluir) {
          btn.classList.add("mostrar");
        } else {
          btn.classList.remove("mostrar");
        }
      });
    });

  document.getElementById("add-form").addEventListener("submit", async (e) => {
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
      const res = await fetch("http://localhost:3000/atividades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaAtividade),
      });

      if (res.ok) {
        form.reset();
        await carregarAtividades();
      } else {
        const erro = await res.json();
        console.error("Erro ao salvar atividade!", erro);
      }
    } catch (err) {
      console.error(err);
    }
  });

  window.onload = carregarAtividades;