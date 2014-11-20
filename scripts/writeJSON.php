<?php


$file = "../data/hs-data.json";
$data = file_get_contents('php://input');

file_put_contents($file, $data);