<?php
$servername = "127.0.0.1:3306";  
$username = "root";              
$password = "";             
$dbname = "esporteDB";      

// Criando a conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificando a conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}
?>
