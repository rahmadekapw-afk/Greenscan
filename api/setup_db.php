<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$servername = "localhost";
$username = "root";
$password = "";

// Create connection
$conn = new mysqli($servername, $username, $password);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create database
$sql = "CREATE DATABASE IF NOT EXISTS greenscan_db";
if ($conn->query($sql) === TRUE) {
    echo "Database created successfully<br>";
} else {
    echo "Error creating database: " . $conn->error . "<br>";
}

$conn->select_db("greenscan_db");

// Create users table
// Added 'username' column
$sql = "CREATE TABLE IF NOT EXISTS users (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100),
    email VARCHAR(100),
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
    echo "Table users created successfully<br>";
} else {
    echo "Error creating table: " . $conn->error . "<br>";
}

// Insert dummy user if not exists
$username_val = "admin";
$password_val = "admin123";
$name_val = "Admin User";

$check = $conn->query("SELECT * FROM users WHERE username='$username_val'");
if ($check->num_rows == 0) {
    $sql = "INSERT INTO users (username, password, name) VALUES ('$username_val', '$password_val', '$name_val')";
    if ($conn->query($sql) === TRUE) {
        echo "Dummy user created (user: admin, pass: admin123)<br>";
    } else {
        echo "Error creating dummy user: " . $conn->error;
    }
} else {
    echo "Dummy user already exists<br>";
}

$conn->close();
?>