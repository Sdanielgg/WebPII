document.addEventListener('DOMContentLoaded', () => {
  fetchUsers();

  document.getElementById('createUserForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const cargo = document.getElementById('cargo').value;

    const response = await fetch('http://127.0.0.1:3000/Utilizador', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nomeUtilizador: nome, email, password, cargo })
    });

    if (response.ok) {
      alert('Utilizador criado com sucesso.');
      e.target.reset();
      fetchUsers();
    } else {
      const data = await response.json();
      alert(data.error || 'Erro ao criar utilizador.');
    }
  });
});

async function fetchUsers() {
  const response = await fetch('http://127.0.0.1:3000/Utilizador');
  const data = await response.json();

  const tbody = document.getElementById('userTableBody');
  tbody.innerHTML = '';

  data.data.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.IdUtilizador}</td>
      <td>${user.nomeUtilizador}</td>
      <td>${user.email}</td>
      <td>${user.cargo}</td>
      <td>
        <button onclick="deleteUser(${user.IdUtilizador})">Remover</button>
        <button onclick="editUser(${user.IdUtilizador}, '${user.nomeUtilizador}', '${user.email}', '${user.cargo}')">Editar</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

async function deleteUser(id) {
  if (!confirm('Deseja realmente remover este utilizador?')) return;

  const response = await fetch(`http://127.0.0.1:3000/Utilizador/${id}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    alert('Utilizador removido.');
    fetchUsers();
  } else {
    alert('Erro ao remover utilizador.');
  }
}

function editUser(id, nome, email, cargo) {
  const novoNome = prompt('Novo nome:', nome);
  const novoEmail = prompt('Novo email:', email);
  const novoCargo = prompt('Novo cargo:', cargo);

  if (novoNome && novoEmail && novoCargo) {
    updateUser(id, novoNome, novoEmail, novoCargo);
  }
}

async function updateUser(id, nomeUtilizador, email, cargo) {
  const response = await fetch(`http://127.0.0.1:3000/Utilizador/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nomeUtilizador, email, cargo })
  });

  if (response.ok) {
    alert('Utilizador atualizado.');
    fetchUsers();
  } else {
    alert('Erro ao atualizar utilizador.');
  }
}
