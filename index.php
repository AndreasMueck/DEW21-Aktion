<!DOCTYPE html>
<html lang="de">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DEW21 Aktion</title>
    <link href="dist/css/tabulator.css" rel="stylesheet">
    <link href="dist/css/btn.style.css" rel="stylesheet">
    <link href="dist/css/all.css" rel="stylesheet"> <!--load all styles -->
    <script type="text/javascript" src="dist/js/tabulator.js"></script>
    <style>
        * {
            font-family: Verdana, Geneva, sans-serif;
        }

        /* Tabulator CSS Defaults überschreiben, bzw. ergänzen */
        .tabulator {
            background-color: #FFFFFF;
            /* resize: vertical;
            overflow: hidden;
            min-height: 550px; */
        }

        .blue-background {
            background-color: #0000CC;
            /* added with cssClass in column */
        }
    </style>
</head>

<body>
    <!-- Button Bar für die Interaktion mit der Tabelle -->
    <div>
        <button id='download-csv' class='small button'><i class="fas fa-download"></i>&nbsp;Download CSV</button>
        <button id='group' class='small button'><i class="fas fa-object-group"></i>&nbsp;Nach Status gruppieren</button>
        <button id='ungroup' class='small button'><i class="fas fa-object-ungroup"></i>&nbsp;Gruppierung aufheben</button>
        <label for="fTxtSuche">Suchen</label>&nbsp;<i class="fas fa-search"></i>
        <input type="text" id="fTxtSuche" name="fTxtSuche">
    </div><br>

    <!-- // WICHTIG! DIV mit ID "tabelle" Element für das virtuelle DOM, hierüber wird programmatisch die Tabelle erstellt -->
    <div id="tabelle"></div>
    <!-- // WICHTIG -->

    <!-- Im Javascript erfolgt die Programmlogik -->
    <script type="text/javascript" src="dist/js/processing.js">
    </script>

    <!-- Kommentar -->
    <p>Funktionsbeschreibung der Tabelle:</p>
    <ul>
        <li>
            <p>Daten Export: Der Export erfolgt über den Button <i>Download CSV</i>. Die Checkboxen sind nur als Selektionshilfe für den Daten-Export gedacht. Über die Checkbox im Header können alle Datensätze ausgewählt werden.</p>
        </li>
        <li>
            <p>Die Bearbeitung der Datensätzen geschieht ausschließlich über die Buttons: [Bearbeiten], [Abbrechen], [Sichern]</p>
            <p>Nach Klick auf [Bearbeiten] werden die Spalten <i>Status</i> und <i>Sendungsnummer</i> zum Editieren freigegeben und die Buttons: [Abbrechen], [Sichern] erscheinen.</p>
        </li>
        <li>
            <p>Das Löschen eines Vorgangs wird durch die Wahl des Status "Gelöscht" für den jeweiligen Datensatz durchgeführt</p>
        </li>
        <li>
            <p>In der Gesamtübersicht erfolgt die Gruppierung aller Vorgänge mit den Schaltflächen: <i>Nach Status gruppieren</i> und <i>Gruppierung aufheben</i>. Standardmäßig ist ungruppiert eingestellt.</p>
            <p>Wenn die Gesamtübersicht gruppiert ist und der Status eines Datensatzes wird verändert, dann wird dieser automatisch in der neuen Gruppen eingeordnet.</p>
            <p>Die Einzelgruppierung je Status erfolgt über das Selektionsfeld im <i>Status</i> Spaltenkopf.</p>
        </li>
        <li>
            <p>Die Freitextsuche über das Feld <i>Suchen</i> erfolgt über alle Tabellenspalten. Gross-/Kleinschreibung wird ignoriert und es ist eine Teilsuche möglich, so werden z.B. Isernhagen und Iserlohn gefunden bei der Eingabe von "Iser"</p>
        </li>
    </ul>
</body>

</html>
