const utilizador = JSON.parse(localStorage.getItem('utilizador'));


async function fetchUtilizadorDetails() {
    try {
        const response = await fetch(`http://127.0.1:3000/Utilizador/${utilizador.id}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar detalhes do utilizador');
        }
        const data = await response.json();
        const utilizadorLoggedIn = document.getElementById('nomeUtilizadorLoggedIn');
        utilizadorLoggedIn.textContent = data.nomeUtilizador;
    } catch (error) {
        console.error('Erro ao carregar detalhes do utilizador:', error);
        alert('Erro ao carregar detalhes do utilizador: ' + error.message);
    }
}
fetchUtilizadorDetails();

document.getElementById('updateForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    if (nome== '' || password == '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    try {
        const response = await fetch(`http://127.0.1:3000/Utilizador/${utilizador.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nomeUtilizador: nome,
                password: password
            })
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Erro ao atualizar perfil.');
        }
        const data = await response.json();
        console.log('Perfil atualizado:', data);
        alert('Perfil atualizado com sucesso!');
        // Redirecionar para a página de perfil ou outra página
        window.location.href = 'perfil.html';
    } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        alert('Erro ao atualizar perfil: ' + error.message);
    }
}
);

//  Para esconder o formulario para mudar os detalhes do utilizador
const updateFormBtn = document.getElementById('updateFormBtn');
updateFormBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const updateForm = document.getElementById('updateForm');
    updateForm.style.display = 'block';
    updateFormBtn.style.display = 'none';
        
});

// Botao para o logout

document.getElementById('logoutBtn').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('utilizador');
    window.location.href = 'home.html';
});