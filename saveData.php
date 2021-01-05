<?php
$data = json_decode(file_get_contents('php://input'), true);

// !!! Übergebene Daten auf Gültigkeit überprüfen !!!
$id = $data["id"];
$status = $data["status"];
$safe_sendungsnummer = htmlspecialchars(strip_tags($data['sendungsnummer']), ENT_QUOTES);

// Datenbank
include 'db.php';
$db = new db();
$db->query('UPDATE dew21_aktion SET status = ?, sendungsnummer = ? WHERE id = ?', $status, $safe_sendungsnummer, $id);
$db->close();
// Rückmeldung
$result = 'Server meldet: Datensatz gespeichert';
print json_encode($result);
?>