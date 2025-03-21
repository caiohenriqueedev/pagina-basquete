var logoElement = document.createElement("img");

logoElement.src = "minnesota.png";

document.body.appendChild(logoElement);

// REDIRECIONAR PARA OUTRO SITE
// Objeto com URLs das logos dos times
const logosTimes = {
  Lakers: "https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg", // Exemplo: Los Angeles Lakers
  Warriors: "https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg", // Exemplo: Golden State Warriors
  Bulls: "https://cdn.nba.com/logos/nba/1610612741/primary/L/logo.svg", // Exemplo: Chicago Bulls
  Heat: "https://cdn.nba.com/logos/nba/1610612748/primary/L/logo.svg", // Exemplo: Miami Heat
  Celtics: "https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg", // Exemplo: Boston Celtics
  Nets: "https://cdn.nba.com/logos/nba/1610612751/primary/L/logo.svg", // Exemplo: Brooklyn Nets
  // Adicione mais times e seus logos aqui
};

async function buscarPlacarNBA() {
  try {
    console.log("Buscando placar...");
    const resposta = await fetch(
      "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard"
    );
    const dados = await resposta.json();

    const placarDiv = document.getElementById("placar");
    placarDiv.innerHTML = "";

    if (!dados.events.length) {
      placarDiv.innerHTML = "Nenhum jogo encontrado para hoje.";
      return;
    }

    dados.events.forEach((evento) => {
      const jogoDiv = document.createElement("div");
      jogoDiv.classList.add("jogo");

      const time1 = evento.competitions[0].competitors[0];
      const time2 = evento.competitions[0].competitors[1];

      // Logo do Time 1
      const logoTime1 =
        logosTimes[time1.team.displayName] || "https://via.placeholder.com/40"; // Logo default caso não tenha
      // Logo do Time 2
      const logoTime2 =
        logosTimes[time2.team.displayName] || "https://via.placeholder.com/40"; // Logo default

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

      placarDiv.appendChild(jogoDiv);
    });
  } catch (erro) {
    document.getElementById("placar").innerHTML = "Erro ao carregar placar.";
    console.error("Erro ao buscar placar:", erro);
  }
}

// Atualiza a cada 30 segundos
setInterval(buscarPlacarNBA, 30000);

// Carrega os dados inicialmente
buscarPlacarNBA();


// mvp, cestinha e conferencias 
// Substitua "SUA_CHAVE_DE_API" com a chave da API que você obteve no RapidAPI
const apiKey = 'CYWFA52uioZcvuVS3H4iBHvJaBjqXONFvS30A6DK'; // Substitua com sua chave de API do SportsRadar
const apiUrl = 'https://api.sportradar.us/nba/official/trial/v7/en/teams.json'; // Endpoint para os times da NBA

// Função para exibir os times da NBA
function exibirTimes(times) {
  const tableBody = document.getElementById('nba-data'); // A tabela onde os dados vão aparecer

  times.forEach(team => {
    const row = document.createElement('tr');

    // Coluna para o nome do time
    const teamCell = document.createElement('td');
    teamCell.textContent = team.full_name;
    row.appendChild(teamCell);

    // Coluna para a cidade do time
    const cityCell = document.createElement('td');
    cityCell.textContent = team.city;
    row.appendChild(cityCell);

    tableBody.appendChild(row);
  });
}

// Função para buscar os dados dos times
function buscarTimes() {
  fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiKey}` // A chave da API como 'Bearer'
    }
  })
    .then(response => response.json()) // Converte a resposta em JSON
    .then(data => exibirTimes(data.teams)) // Exibe os times na tabela
    .catch(error => console.error('Erro ao buscar os dados:', error));
}

// Chama a função assim que a página for carregada
window.onload = buscarTimes;


