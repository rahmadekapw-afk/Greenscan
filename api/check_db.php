<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "greenscan_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode([
        "status" => "error",
        "message" => "Connection failed: " . $conn->connect_error
    ]));
}

// Check if users table exists and get count
$sql = "SELECT count(*) as count FROM users";
$result = $conn->query($sql);

if ($result) {
    $row = $result->fetch_assoc();
    echo json_encode([
        "status" => "success",
        "message" => "Database connected successfully",
        "user_count" => $row['count'],
        "server_ip" => $_SERVER['SERVER_ADDR'] ?? 'unknown'
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Table 'users' check failed: " . $conn->error
    ]);
}

$conn->close();
?>