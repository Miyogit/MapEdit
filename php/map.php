<?php

header("Content-Type: application/json");

$csv = __DIR__."/../data/map.csv";

$rows = array_map("str_getcsv",file($csv));

$header = array_shift($rows);

$data = [];

foreach($rows as $row)
{
    $data[] = array_combine($header,$row);
}

echo json_encode($data);