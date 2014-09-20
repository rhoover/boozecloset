<?php

    // For this to work, change owner:group of data directory, recursively, to apache:apache for CentOS or www-data:www-data for Ubuntu
    header('Content-Type: application/json');
    $incomingBooze = file_get_contents('php://input');
    $file = "data/booze.json";
    file_put_contents($file, $incomingBooze);
?>