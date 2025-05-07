<?php
include 'conexao.php';  // Incluir a conexão com o banco de dados

// Verificando se o formulário foi enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $comentario = $_POST['comentario'];  // Pegando o comentário do formulário

    // Inserindo o comentário no banco de dados
    $sql = "INSERT INTO comentarios (texto) VALUES ('$comentario')";
    if ($conn->query($sql) === TRUE) {
        echo "Comentário enviado com sucesso!";
    } else {
        echo "Erro ao enviar comentário: " . $conn->error;
    }
    
    // Fechando a conexão
    $conn->close();
    
    // Redirecionando para a página inicial ou notícias
    header("Location: index.html");  // Redireciona para a página inicial
    exit();
}
?>
