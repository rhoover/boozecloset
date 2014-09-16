<?php

    // For this to work, change ownership of data directory, recursively, to apache for CentOS or www-data for Ubuntu
    header('Content-Type: application/json');
    $incomingBooze = file_get_contents('php://input');
    $file = "data/booze.json";
    file_put_contents($file, $incomingBooze);
?>