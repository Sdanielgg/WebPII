async function login(email, password) {
      const errorMsg = document.getElementById('errorMsg');
      errorMsg.textContent = '';
      try {
        const response = await fetch('http://127.0.0.1:3000/Utilizador/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
          errorMsg.textContent = data.error || 'Erro no login.';
          return false;
        }

        localStorage.setItem('token', data.token);
        localStorage.setItem('utilizador', JSON.stringify(data.user));
        return true;
      } catch (error) {
        errorMsg.textContent = 'Erro de rede ou no servidor.';
        console.error(error);
        return false;
      }
    }

    function checkSession() {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('utilizador');

      if (token && userStr) {
        const user = JSON.parse(userStr);
        document.getElementById('loginCard').style.display = 'none';
        document.getElementById('sessionInfo').style.display = 'block';
        document.getElementById('username').textContent = user.nome || user.email || 'Utilizador';
      } else {
        document.getElementById('loginCard').style.display = 'block';
        document.getElementById('sessionInfo').style.display = 'none';
      }
    }

    document.getElementById('loginForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const success = await login(email, password);
      if (success) {
        checkSession();
      }
    });

    document.getElementById('logoutBtn').addEventListener('click', () => {
      localStorage.removeItem('token');
      localStorage.removeItem('utilizador');
      checkSession();
    });

    // Ao carregar a página verifica se já há sessão
    checkSession();