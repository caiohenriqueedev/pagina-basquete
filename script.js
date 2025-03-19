var logoElement = document.createElement('img');

logoElement.src = "minnesota.png";

document.body.appendChild(logoElement);

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("searchForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        let query = document.getElementById("searchInput").value.trim(); // Pega o valor digitado
        if (query) {
            let encodedQuery = encodeURIComponent(query); // Evita caracteres especiais na URL
            window.location.href = "https://www.google.com/search?q=" + encodedQuery; // Redireciona
        }
    });
});
