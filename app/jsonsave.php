<?
    $json = $_POST['json'];

    // if (json_decode($json) != null) {
        $file = fopen('/data/booze.json', 'w+');
        fwrite($file, $json);
        fclose($file);
        echo "Responding";
    // }
?>

<!-- http://stackoverflow.com/questions/3921520/writing-json-object-to-json-file-on-server -->