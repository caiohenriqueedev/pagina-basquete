// Objeto que mapeia os nomes dos times para suas respectivas URLs de logos
const logosTimes = {
  Lakers: "https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg",
  Warriors: "https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg",
  Bulls: "https://cdn.nba.com/logos/nba/1610612741/primary/L/logo.svg",
  Heat: "https://cdn.nba.com/logos/nba/1610612748/primary/L/logo.svg",
  Celtics: "https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg",
  Nets: "https://cdn.nba.com/logos/nba/1610612751/primary/L/logo.svg",
};

// Função assíncrona para buscar os placares da NBA
async function buscarPlacarNBA() {
  try {
    console.log("Buscando placar..."); // Mensagem de log no console

    // Faz a requisição para a API da ESPN
    const resposta = await fetch(
      "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard"
    );
    const dados = await resposta.json(); // Converte a resposta para JSON

    // Obtém a div onde os placares serão exibidos e limpa o conteúdo anterior
    const placarDiv = document.getElementById("placar");
    placarDiv.innerHTML = "";

    // Verifica se há jogos disponíveis
    if (!dados.events.length) {
      placarDiv.innerHTML = "Nenhum jogo encontrado para hoje.";
      return; // Encerra a função
    }

    // Percorre a lista de jogos disponíveis
    dados.events.forEach((evento) => {
      // Cria um elemento div para armazenar o placar do jogo
      const jogoDiv = document.createElement("div");
      jogoDiv.classList.add("jogo"); // Adiciona uma classe CSS

      // Obtém os times que estão jogando
      const time1 = evento.competitions[0].competitors[0];
      const time2 = evento.competitions[0].competitors[1];

      // Obtém as URLs das logos dos times, caso não encontre, usa uma imagem padrão
      const logoTime1 =
        logosTimes[time1.team.displayName] || "https://via.placeholder.com/40";
      const logoTime2 =
        logosTimes[time2.team.displayName] || "https://via.placeholder.com/40";

      // Define o conteúdo HTML do placar do jogo
      jogoDiv.innerHTML = `
        <div class="time">
            <img src="${logoTime1}" alt="${time1.team.displayName}" style="width: 40px; height: 40px; margin-right: 10px;"> 
            ${time1.team.displayName} ${time1.score} 
            x ${time2.score} 
            <img src="${logoTime2}" alt="${time2.team.displayName}" style="width: 40px; height: 40px; margin-left: 10px;"> 
            ${time2.team.displayName}
        </div>
        <div>Status: ${evento.status.type.description}</div>
      `;

      // Adiciona o placar do jogo à div principal
      placarDiv.appendChild(jogoDiv);
    });
  } catch (erro) {
    // Em caso de erro, exibe uma mensagem e registra no console
    document.getElementById("placar").innerHTML = "Erro ao carregar placar.";
    console.error("Erro ao buscar placar:", erro);
  }
}

// Atualiza os placares a cada 30 segundos
setInterval(buscarPlacarNBA, 30000);

// Chama a função ao carregar a página
buscarPlacarNBA();

// Chave de API para acessar os dados dos times
const apiKey = 'CYWFA52uioZcvuVS3H4iBHvJaBjqXONFvS30A6DK';
const apiUrl = 'https://api.sportradar.us/nba/official/trial/v7/en/teams.json';

// Função para exibir os times em uma tabela
function exibirTimes(times) {
  const tableBody = document.getElementById('nba-data');

  times.forEach(team => {
    const row = document.createElement('tr'); // Cria uma linha na tabela

    const teamCell = document.createElement('td'); // Cria a célula do nome do time
    teamCell.textContent = team.full_name;
    row.appendChild(teamCell);

    const cityCell = document.createElement('td'); // Cria a célula da cidade do time
    cityCell.textContent = team.city;
    row.appendChild(cityCell);

    tableBody.appendChild(row); // Adiciona a linha à tabela
  });
}

// Função para buscar os times da API
function buscarTimes() {
  fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiKey}` // Insere a chave da API na requisição
    }
  })
    .then(response => response.json()) // Converte a resposta para JSON
    .then(data => exibirTimes(data.teams)) // Passa os dados para a função de exibição
    .catch(error => console.error('Erro ao buscar os dados:', error)); // Captura erros
}

// Busca os times ao carregar a página
window.onload = buscarTimes;

// enquete e comentarios
// enquete e comentarios
function enviarComentario() {
  const texto = document.getElementById("comentario").value;
  fetch("php/enviar_comentario.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "texto=" + encodeURIComponent(texto)
  }).then(() => {
    document.getElementById("comentario").value = "";
    carregarComentarios();
  });
}

function carregarComentarios() {
  fetch("carregar_comentarios.php")
    .then(res => res.json()) // Agora esperamos um JSON com os comentários
    .then(comentarios => {
      const comentariosContainer = document.getElementById("comentarios");
      comentariosContainer.innerHTML = ''; // Limpa a área de comentários

      // Adiciona cada comentário na tela
      comentarios.forEach(comentario => {
        const comentarioDiv = document.createElement("div");
        comentarioDiv.classList.add("comentario");

        // Exibe o texto do comentário
        comentarioDiv.innerHTML = `
          <p><strong>Comentário de ${comentario.id}:</strong> ${comentario.texto}</p>
          <p><small>Data: ${comentario.data}</small></p>
        `;
        comentariosContainer.appendChild(comentarioDiv);
      });
    })
    .catch(err => console.error('Erro ao carregar comentários:', err));
}
