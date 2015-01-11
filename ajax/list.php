<?php
    $page = isset($_POST["page"]) ? intval($_POST["page"], 10) : 1;
    echo "{ \"ok\": true, \"page\": { \"pagenum\": ".$page.", \"pagesize\": 15, \"totalnum\": 1500, \"totalpage\": 100 }, \"list\": [ ] }";
?>