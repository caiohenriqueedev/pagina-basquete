<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Comentários e Votos</title>
  <style>
    .comentario {
      border: 1px solid #ccc;
      padding: 10px;
      margin-bottom: 8px;
    }
  </style>
</head>
<body>

  <h2>Comentários</h2>
  <textarea id="comentario" rows="3" cols="40" placeholder="Escreva seu comentário..."></textarea><br>
  <button onclick="enviarComentario()">Enviar</button>

  <div id="comentarios"></div>

  <script>
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
      fetch("php/carregar_comentarios.php")
        .then(res => res.json())
        .then(data => {
          const container = document.getElementById("comentarios");
          container.innerHTML = "";
          data.forEach(comentario => {
            const div = document.createElement("div");
            div.className = "comentario";
            div.innerHTML = `
              <p>${comentario.texto}</p>
              <p>Votos: <span id="votos-${comentario.id}">${comentario.votos}</span></p>
              <button onclick="votar(${comentario.id}, 1)">👍</button>
              <button onclick="votar(${comentario.id}, -1)">👎</button>
            `;
            container.appendChild(div);
          });
        });
    }

    function votar(id, voto) {
      fetch("php/carregar_votos.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `comentario_id=${id}&voto=${voto}`
      }).then(() => carregarComentarios());
    }

    window.onload = function () {
      carregarComentarios();
    };
  </script>
</body>
</html>
