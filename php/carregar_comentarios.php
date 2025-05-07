<?php
include_once 'conexao.php';

$sql = "SELECT * FROM comentarios ORDER BY id DESC";
$result = $conn->query($sql);

$comentarios = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $comentarios[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($comentarios);
$conn->close();
?>
