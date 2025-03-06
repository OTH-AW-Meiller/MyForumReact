
<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
$data = [
    "message" => "Hello from PHP Backend!42"
];
echo json_encode($data);