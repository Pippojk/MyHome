<?php
    session_start();

    $name = $_POST['name'];
    $pass = $_POST['password'];

    $log_DB = new mysqli("localhost", "root", "", "sito_home");
    $query = "SELECT * FROM user WHERE nome = '$name'  AND password = '$pass'";
    $result = $log_DB->query($query);

    if($result->num_rows >= 1){
        $_SESSION['username'] = $name; 

        header("Location: ../home/home.php");
        exit();
    }else{
        header("Location: login.html");
    }
?>