<?php

$data = file_get_contents("php://input");

$file = __DIR__ . "/data/json/map.json";

file_put_contents($file, $data);

echo json_encode([
    "status" => "ok"
]);