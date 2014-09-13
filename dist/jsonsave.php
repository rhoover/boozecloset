<?

    header('Content-Type: application/json');
    $incomingBooze = json_encode($_POST);
    // $originalBooze = dirname(__FILE__)."/data/booze.json";
    // file_put_contents($originalBooze, $incomingBooze);
    file_put_contents('/data/booze.json', $incomingBooze);
?>

<!-- http://stackoverflow.com/questions/3921520/writing-json-object-to-json-file-on-server -->
<!-- http://www.cleverweb.nl/javascript/a-simple-search-with-angularjs-and-php/ -->
<!--
    // The request is a JSON request.
    // We must read the input.
    // $_POST or $_GET will not work!

    // $data = file_get_contents("php://input");
    // $objData = json_decode($data);
    // $saveData = json_encode($objData, JSON_FORCE_OBJECT);
    // $json = $_POST['json'];

    // if (json_decode($json) != null) {
    // $file = fopen('/data/booze.json', 'w+');
        // fwrite($file, $json);
    // fwrite($file, $saveData);
    // fclose($file);
    // echo "Responding";
    // }
-->