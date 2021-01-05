-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Erstellungszeit: 04. Jan 2021 um 18:15
-- Server-Version: 8.0.22-0ubuntu0.20.04.3
-- PHP-Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `dew21_versand`
--
CREATE DATABASE IF NOT EXISTS `dew21_versand` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `dew21_versand`;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `dew21_aktion`
--

CREATE TABLE `dew21_aktion` (
  `id` int NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Angelegt',
  `firma` varchar(255) NOT NULL,
  `vorname` varchar(255) NOT NULL,
  `nachname` varchar(255) NOT NULL,
  `strasse` varchar(255) NOT NULL,
  `plz` varchar(5) NOT NULL,
  `ort` varchar(255) NOT NULL,
  `land` varchar(255) NOT NULL,
  `referenz` varchar(255) NOT NULL,
  `bestelldatum` datetime NOT NULL,
  `erstellungsdatum` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `sendungsnummer` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Daten für Tabelle `dew21_aktion`
--

INSERT INTO `dew21_aktion` (`id`, `status`, `firma`, `vorname`, `nachname`, `strasse`, `plz`, `ort`, `land`, `referenz`, `bestelldatum`, `erstellungsdatum`, `sendungsnummer`) VALUES
(1, 'Angelegt', 'Musterfirma', 'Max', 'Mustermann', 'Musterstrasse 15', '43223', 'Dortmund', 'DE', '234234234', '2020-12-23 19:07:36', '2020-12-20 19:09:46', ''),
(2, 'In Bearbeitung', 'WAK GmbH', 'Markus', 'Knappik', 'Industriestrasse 88', '54321', 'Kassel', 'DE', '6546546456', '2020-12-28 19:28:38', '2020-12-20 19:29:57', ''),
(3, 'Versendet', 'Westfalia AG', 'Anke', 'Müller', 'Hagenerstrasse 56', '34243', 'Dortmund', 'DE', '345345345', '2020-12-30 19:30:02', '2020-12-20 19:30:59', '987654321'),
(4, 'Storniert', '', 'Silke', 'Weber', 'Amselweg 14', '42342', 'Essen', 'DE', '5345345345', '2020-12-29 19:32:56', '2020-12-20 19:33:51', '123456789'),
(5, 'Gelöscht', '', 'Ralf', 'Möller', 'Zufallsallee 43', '54322', 'Schwerte', 'DE', '5345345', '2020-12-22 19:33:54', '2020-12-20 19:34:52', ''),
(6, 'Angelegt', 'Nordrhein AG', 'Fred', 'Feuerstein', 'Iserlohnerstrasse 26', '65423', 'Iserlohn', 'DE', '', '2020-12-30 20:30:02', '2020-12-20 20:30:59', ''),
(7, 'In Bearbeitung', '', 'Thomas', 'Müller', 'Bayernweg 14', '43432', 'München', 'DE', '', '2020-12-31 19:30:02', '2020-12-20 22:30:59', ''),
(8, 'Versendet', '', 'Schrank', 'Wand', 'Ikeaallee 21', '76543', 'Ikeahausen', 'DE', '', '2020-12-28 19:30:02', '2020-12-20 15:30:59', '987654321'),
(9, 'Versendet', 'Computer AG', 'Ben', 'Maus', 'An der Festplatte 12', '54533', 'Itstadt', 'DE', '', '2020-12-30 19:30:02', '2020-12-20 19:30:59', '987654321'),
(10, 'Gelöscht', '', 'Klaus', 'Meier', 'Stuttgarter Allee 65', '78723', 'Stuttgart', 'DE', '2121-12312', '2021-01-02 19:30:02', '2020-12-20 19:30:59', '');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
