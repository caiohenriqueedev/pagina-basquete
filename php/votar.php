<?php
include 'conexao.php';  // Incluir a conexão com o banco de dados

// Verificando se o voto foi enviado
if (isset($_GET['jogador'])) {
    $jogador = $_GET['jogador'];

    // Atualizando a quantidade de votos do jogador
    $sql = "UPDATE votos SET votos = votos + 1 WHERE jogador = '$jogador'";
    
    if ($conn->query($sql) === TRUE) {
        echo "Voto computado com sucesso!";
    } else {
        echo "Erro ao computar o voto: " . $conn->error;
    }

    $conn->close();

    // Redirecionando para a página de resultados ou notícias
    header("Location: index.html");  // Redireciona para a página inicial
    exit();
}
?>
