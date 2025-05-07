<?php
include_once 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $comentario_id = intval($_POST['comentario_id'] ?? 0);
    $voto = intval($_POST['voto'] ?? 0);

    if ($comentario_id && in_array($voto, [1, -1])) {
        $stmt = $conn->prepare("UPDATE comentarios SET votos = votos + ? WHERE id = ?");
        $stmt->bind_param("ii", $voto, $comentario_id);
        
        if ($stmt->execute()) {
            echo "ok";
        } else {
            echo "erro";
        }

        $stmt->close();
    } else {
        echo "dados inválidos";
    }
}

$conn->close();
?>
