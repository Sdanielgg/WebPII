// isto busca o id da atividade 
const urlParams = new URLSearchParams(window.location.search);
const atividadeId = urlParams.get('id');

// Fetch atividade
async function fetchAtividadeDetails() {
    try {
        const response = await fetch(`http://127.0.0.1:3000/atividades/${atividadeId}`);
        const atividade = await response.json();

        console.log('Atividade:', atividade);
        document.getElementById('AtividadeTitulo').textContent = atividade.titulo;
        document.getElementById('AtividadeResponsavel').textContent = 'Responsavel: ' + atividade.utilizador.nomeUtilizador;
        document.getElementById('AtividadeEstado').textContent = 'Estado: ' + atividade.estado;
        document.getElementById('AtividadeLocal').textContent = 'Local: ' + atividade.local;
        document.getElementById('AtividadeData').textContent = 'Data: ' + new Date(atividade.data).toLocaleDateString('pt-PT', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        document.getElementById('Descricao').textContent = atividade.descricao;

    } catch (error) {
        console.error('Erro ao carregar atividade:', error);
    }
}
fetchAtividadeDetails();

async function fetchAtividadeInscritos() {
    try {
        const response = await fetch(`http://127.0.1:3000/inscritos/${atividadeId}`);
        const inscritos = await response.json();
        console.log('Inscritos:', inscritos);
        if (document.getElementById('AtividadeEstado').textContent !== "Estado: Por Realizar") {
            document.getElementById('btnInscrever').disabled = false;
        }XMLDocument
        document.getElementById('AtividadeInscritos').textContent = "Inscritos: " + inscritos.length || 0;
    }
    catch (error) {
        console.error('Erro ao carregar inscritos:', error);
    }
}
fetchAtividadeInscritos();

async function EstadoAtividadeCheck() {
    try {
        const response = await fetch(`http://127.0.1:3000/atividades/${atividadeId}`);
        const atividade = await response.json();
        if (atividade.estado === "Realizada") {
            document.getElementById('btnInscrever').disabled = true;
            document.getElementById('btnInscrever').textContent = "Inscrever"; // typo fixed too
        } else if (atividade.estado === "Por Realizar") {
            document.getElementById('btnInscrever').disabled = false;
            document.getElementById('btnInscrever').textContent = "Inscrever";
        }

    }
    catch (error) {
        console.error('Erro ao verificar estado da atividade:', error);
    }
}
EstadoAtividadeCheck();

async function carregarFotos() {
    try {
        const response = await fetch(`http://127.0.1:3000/fotos/${atividadeId}`);
        const fotos = await response.json();
        console.log('Fotos:', fotos);
        const grid = document.getElementById('fotosGrid');
        fotos.forEach(foto => {
            const container = document.createElement('div');
            container.classList.add('foto-container');

            const img = document.createElement('img');
            img.src = foto.url;
            img.alt = 'Foto da Atividade';
            img.classList.add('fotosGridImg');

            const titulo = document.createElement('p');
            titulo.textContent = foto.titulo;
            titulo.classList.add('fotosGridTitulo');

            const data = document.createElement('p');

            data.textContent = new Date(foto.data).toLocaleDateString('pt-PT', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
            container.appendChild(img);
            container.appendChild(titulo);
            container.appendChild(data);
            grid.appendChild(container);
        });

    }
    catch (error) {
        console.error('Erro ao carregar fotos:', error);
    }
}
carregarFotos();