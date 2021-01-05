<?php
include 'db.php';
$db = new db();
$datasets = $db->query('SELECT * FROM dew21_aktion')->fetchAll();
$db->close();
//schicke JSON enkodierte Daten zurück
header('Content-Type: application/json; charset=UTF-8');
echo(json_encode($datasets));
?>
