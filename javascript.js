// Inicializa os valores a partir do localStorage ou usa os padrões---------------------------------------------------------
// Prova 1: Função para diminuir um dia útil
// Prova 2: Função para gerenciar os dias das provas



async function gerenciarDiasProvas() {
    let daysProva1 = parseInt(localStorage.getItem('daysProva1')) || 75;
    let daysProva2 = parseInt(localStorage.getItem('daysProva2')) || 85;

    console.log("Dias Prova 1:", daysProva1);
    console.log("Dias Prova 2:", daysProva2);

    // Obter feriados do ano atual
    const feriados = await obterFeriados(new Date().getFullYear());

    let dataProva1 = new Date();
    let dataProva2 = new Date();

    // Diminuir dias úteis
    dataProva1 = diminuirDiasUteis(dataProva1, daysProva1, feriados);
    dataProva2 = diminuirDiasUteis(dataProva2, daysProva2, feriados);

    console.log("Data Prova 1:", dataProva1.toLocaleDateString('pt-BR'));
    console.log("Data Prova 2:", dataProva2.toLocaleDateString('pt-BR'));
}

function diminuirDiasUteis(data, dias, feriados) {
    let diasContados = 0;
    while (diasContados < dias) {
        data.setDate(data.getDate() - 1);
        const diaDaSemana = data.getDay();
        const dataFormatada = data.toISOString().split('T')[0];

        // Verifica se é um dia letivo (sem sábados, domingos e feriados)
        if (diaDaSemana !== 0 && diaDaSemana !== 6 && !feriados.includes(dataFormatada)) {
            diasContados++;
        }
    }
    return data;
}

// Função para obter feriados de uma API pública
async function obterFeriados(ano) {
    try {
        const response = await axios.get(`https://brasilapi.com.br/api/feriados/v1/${ano}`);
        return response.data.map(feriado => feriado.date);
    } catch (error) {
        console.error("Erro ao obter feriados:", error);
        return [];
    }
}

// Chame a função para gerenciar dias das provas
gerenciarDiasProvas();


function exibirDataHora() {
    const agora = new Date();
    const opcoes = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const dataHoraFormatada = agora.toLocaleString('pt-BR', opcoes);
    document.getElementById('dataHora').innerText = dataHoraFormatada;
}

// Atualiza a data e hora a cada segundo
setInterval(exibirDataHora, 1000);

// Exibe a data e hora imediatamente
exibirDataHora();
