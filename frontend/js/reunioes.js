const urlParams = new URLSearchParams(window.location.search);
const reuniaoId = urlParams.get('id');

// Fetch reuniao details
async function fetchReuniaoDetails() {
    try {
        const response = await fetch(`http://127.0.1:3000/reunioes/${reuniaoId}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar detalhes da reunião');
        }
        const reuniao = await response.json();
        
        console.log('Reunião:', reuniao);
        document.getElementById('ReuniaoTitulo').textContent = reuniao.titulo;
        document.getElementById('ReuniaoResponsavel').textContent = 'Criador: ' + reuniao.utilizador.nomeUtilizador;
        document.getElementById('ReuniaoEstado').textContent = 'Estado: ' + reuniao.estado;
        document.getElementById('ReuniaoLocal').textContent = 'Local: ' + reuniao.local;
        document.getElementById('ReuniaoData').textContent = 'Data: ' + new Date(reuniao.data).toLocaleDateString('pt-PT', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        document.getElementById('Descricao').textContent = reuniao.ata;
    }
    catch (error) {
        console.error('Erro ao carregar reunião:', error);
        alert('Erro ao carregar detalhes da reunião: ' + error.message);
    }
}
fetchReuniaoDetails();