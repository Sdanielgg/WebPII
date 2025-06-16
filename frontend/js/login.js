document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const errorMsg = document.getElementById('errorMsg');

  try {
    const response = await fetch('http://127.0.0.1:3000/Utilizador/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        email: email,
        password: password
    })
})

    const data = await response.json();
    console.log(data.user.cargo);
    if (!response.ok) {
      errorMsg.textContent = data.error || 'Erro no login.';
      return;
    }
    if (data.user.cargo === 'utilizador') {
      window.location.href = 'index.html';
    } else{
      window.location.href = 'dashboard.html';
    }
    // Guardar token no localStorage
    localStorage.setItem('token', data.token);
    localStorage.setItem('utilizador', JSON.stringify(data.user));
  } catch (error) {
    errorMsg.textContent = 'Erro de rede ou no servidor.';
    console.error(error);
  }
});
localStorage.setItem('token', '');
localStorage.setItem('utilizador',''); 