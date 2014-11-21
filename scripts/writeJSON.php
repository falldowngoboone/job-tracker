<?php

function file_force_contents($file, $data) {
  if(!is_dir("../data")) {
    mkdir("../data");
  }
  file_put_contents($file, $data);
}

$file = "../data/hs-data.json";
$data = file_get_contents('php://input');

file_force_contents($file, $data);