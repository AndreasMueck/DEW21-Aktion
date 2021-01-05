//
// Buttons für die Datensatz Bearbeitung
//

function formatter_EditButton(cell, formatterParams, onRendered) {
    return "<button class='small button'>Bearbeiten</button>";
}

function formatter_CancelButton(cell, formatterParams, onRendered) {
    return "<button class='small blue button'>Abbrechen</button>";
}

function formatter_SaveButton(cell, formatterParams, onRendered) {
    return "<button class='small green button'>Speichern</button>";
}

//
// Erzeuge Bearbeitungsmodus in Zeile für Felder "STATUS" und "SENDUNGSNUMMER"
//

function cellClick_EditButton(e, cell) {
    currentRow = cell.getRow()
    currentTable = cell.getTable()
    selectedRows = currentTable.getSelectedRows()
    if ((selectedRows.length == 0) || (selectedRows.length == 1)) {
        for (i = 0; i < selectedRows.length; i++) {
            selectedRows[i].deselect()
            selectedRows[i].reformat()
        }
        currentTable.deselectRow()
        currentRow.select()
        currentRow.reformat()

        cells = currentRow.getCells()
        for (i = 0; i < cells.length; i++) {
            cells[i].setValue(cells[i].getValue())
        }
        currentTable.hideColumn("EditButton")
        currentTable.showColumn("CancelButton")
        currentTable.showColumn("SaveButton")
    } else {
        alert('Bitte nur eine Zeile markieren.');
        return
    }
}

//
// Bearbeitungsmodus abbrechen
//

function cellClick_CancelButton(e, cell) {
    if (!cell.getRow().isSelected()) {
        return
    }
    currentRow = cell.getRow()
    currentTable = cell.getTable()
    if (cell.getRow().isSelected()) {
        // Abbrechen
        cells = currentRow.getCells()
        for (i = 0; i < cells.length; i++) {
            cells[i].restoreOldValue();
        }
        stopEditing(cell)
    }
}

//
// Daten speichern
//

function cellClick_SaveButton(e, cell) {
    if (!cell.getRow().isSelected()) {
        return
    }
    //Speichern bestätigen
    if (window.confirm("Änderungen speichern? ID: " + cell.getData().id + " Status: " + cell.getData().status + "?")) {
        stopEditing(cell);

        //Status nur neu gruppieren, wenn die Tabellenansicht gruppiert war
        groupComponents = table.getGroups()
        if (groupComponents.length != 0) {
            updateGroups();
        }

        //AJAX Aufurf zum Speichern der Daten: ID, STATUS, SENDUNGSNUMMER
        //ARRAY!!!
        var id = cell.getData().id;
        var status = cell.getData().status;
        var sendungsnummer = cell.getData().sendungsnummer;
        var data = JSON.stringify({ "id": id, "status": status, "sendungsnummer": sendungsnummer });
        makeRequest('saveData.php', data);
    }
}

//
// Hilfsfunktionen für den "Bearbeitungsmodus"
//

function stopEditing(cell) {
    currentRow = cell.getRow()
    currentTable = cell.getTable()
    currentTable.deselectRow()
    currentTable.showColumn("EditButton")
    currentTable.hideColumn("CancelButton")
    currentTable.hideColumn("SaveButton")
    currentRow.reformat()
}

function isRowSelected(cell) {
    return cell.getRow().isSelected()
}

//
//Neue Gruppierung nach Status Änderung und Speichern: Aufruf in cellClick_SaveButton()...
//

function updateGroups() {
    table.setGroupBy("status");
}

//
//Erzeuge Hyperlink für die Sendungsnummer
//

function createHyperLink(cellComp, formatterParams, onRendered) {
    var cellValue = cellComp.getValue();
    if (cellValue != 0) {
        var hrefString = "http://pfad_zum_DHL_link?parameter_sendungsnumemr=" + cellValue;
        return "<a href='" + hrefString + "' target='_blank'>" + cellValue + "</a>";
    } else {
        return cellValue;
    }
}

//
// AJAX Call
// function makeRequest -> Aufruf erfolgt in: cellClick_SaveButton()...
// function alertContents: Ausgabe der Servermeldung -> Aufruf erfolgt in makeRequest() ...
//

function alertContents() {
    try {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                //Hier erfolgt die Rückmeldung des AJAX Calls
                alert(httpRequest.responseText);
            } else {
                alert('Server meldet ein Problem mit der Anfrage.');
            }
        }
    } catch (e) {
        alert('Fehler: ' + e.description);
    }
}

function makeRequest(url, data) {
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
        alert('Kann keine XmlHttp Instanz erstellen');
        return false;
    }

    httpRequest.onreadystatechange = alertContents;
    httpRequest.open('POST', url);
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    httpRequest.send(data);
}

//
//  Suchfeld - Eigene Suchroutine
//

function matchAny(data, filterParams) {
    //data - Daten die für die Suche gefiltert werden
    //filterParams - Parameter Objekt für den Filter
    //RegExp ermöglicht Filter über alle Tabellenspalten: Suche Teilwörter, Gross/Klein wird ignoriert -> 'i' modifier

    var match = false;
    const regex = RegExp(filterParams.value, 'i');

    for (var key in data) {
        if (regex.test(data[key]) == true) {
            match = true;
        }
    }
    return match;
}


// ************************************************************************************
// Erstelle EventListener für die Buttons und Input
// 1) Buttons
// 2) Input
//

//
// Button Trigger für Download der CSV Datei
//

var d = new Date();
var tag = d.getDate();
var monat = d.getMonth();
var monat = monat + 1; // Javascript 0=Januar, 1=Februar
var jahr = d.getFullYear();
var stunde = d.getHours();
var minute = d.getMinutes();
var filename = 'DEW21 Aktionsliste vom ' + tag + '.' + monat + '.' + jahr + '-' + stunde + minute + '.csv';

document.getElementById("download-csv").addEventListener("click", function() {
    table.download("csv", filename); //filename ist ein concated string aus variablen deklarationen
});

//
// Button Trigger Daten gruppieren / nicht gruppieren
//

document.getElementById("group").addEventListener("click", function() {
    table.setGroupBy("status");
});

document.getElementById("ungroup").addEventListener("click", function() {
    table.setGroupBy();
});

//
// Input Feld für die Freitext Suche
//

const input = document.getElementById("fTxtSuche");
input.addEventListener("keyup", function() {
    table.setFilter(matchAny, { value: input.value });
    if (input.value == " ") {
        table.clearFilter()
    }
});

// ************************************************************************************
// Erstelle die Tabelle im DOM Element mit id "tabelle" --> Hier: HTML mit DIV-ELement und ID "tabelle"
// 1) Tabellendefinition
// 2) Spaltendefinition
//

var table = new Tabulator("#tabelle", {
    height: 550, // Setze die Höhe der Tabelle (in CSS oder hier), das erstellt das Virtual DOM verbessert den Render Speed dramatisch (jeder gültige CSS Wert möglich)
    ajaxURL: "getData.php", //Füge die Daten der Tabelle hinzu
    layout: "fitColumns", //Passe die Tabellenspalten an (optional) fitColumns, fitData
    downloadRowRange: "selected", //Ausgewählte Daten exportieren
    columns: [ //Definiere die Tabellenspalten
        {
            // Spalte: Selektion Checkbox
            formatter: "rowSelection",
            titleFormatter: "rowSelection",
            hozAlign: "left",
            width: 50,
            download: false,
            headerSort: false,
        }, {
            // Spalte: ID
            title: "ID",
            field: "id",
            width: 50,
            headerSort: false,
        }, {
            //Spalte: Status
            title: "Status",
            field: "status",
            width: 180,
            // Die Spalte "Status" ist editierbar
            editable: isRowSelected,
            editor: "select",
            editorParams: {
                "Angelegt": "Angelegt",
                "In Bearbeitung": "In Bearbeitung",
                "Versendet": "Versendet",
                "Storniert": "Storniert",
                "Gelöscht": "Gelöscht",
            },
            // Die Spalte "Status" ist filterbar
            headerFilter: true,
            headerFilterParams: {
                "": "Alle anzeigen",
                "Angelegt": "Angelegt",
                "In Bearbeitung": "In Bearbeitung",
                "Versendet": "Versendet",
                "Storniert": "Storniert",
                "Gelöscht": "Gelöscht",
            },
            // STATUSFARBEN: Initialisiere Statusfarben bei Tabellenerstellung und Statusänderung
            formatter: function(cell) {
                var status = cell.getValue();
                switch (status) {
                    case 'Angelegt':
                        cell.getElement().style.background = "#5384CF";
                        cell.getElement().style.color = "white";
                        break;
                    case 'In Bearbeitung':
                        cell.getElement().style.background = "#97B492";
                        cell.getElement().style.color = "white";
                        break;
                    case 'Versendet':
                        cell.getElement().style.background = "#37545C";
                        cell.getElement().style.color = "white";
                        break;
                    case 'Storniert':
                        cell.getElement().style.background = "#EC5B25";
                        cell.getElement().style.color = "white";
                        break;
                    case 'Gelöscht':
                        cell.getElement().style.background = "#D72E3A";
                        cell.getElement().style.color = "white";
                        break;
                    default:
                        // irgendwas, falls Status nicht in der Liste
                }
                // !!! Rückgabe des Texts in der Tabellenzelle
                return status;
            }
        }, {
            // Spalte: Firma
            title: "Firma",
            field: "firma",
            headerSort: false,
            width: 100,
        }, {
            // Spalte: Vorname
            title: "Vorname",
            field: "vorname",
            headerSort: false,
            width: 100,
        }, {
            // Spalte: Nachname
            title: "Nachname",
            field: "nachname",
            headerSort: false,
            width: 100,
        }, {
            // Spalte: Strasse
            title: "Strasse",
            field: "strasse",
            headerSort: false,
            width: 150,
        }, {
            // Spalte: PLZ
            title: "PLZ",
            field: "plz",
            headerSort: false,
            width: 50,
        }, {
            // Spalte: Ort
            title: "Ort",
            field: "ort",
            headerSort: false,
            width: 100,
        }, {
            // Spalte: Land
            title: "Land",
            field: "land",
            headerSort: false,
            width: 100,
        }, {
            // Spalte: Referenz
            title: "Referenz",
            field: "referenz",
            headerSort: false,
            width: 100,
        }, {
            // Spalte: bestelldatum
            title: "Bestelldatum",
            field: "bestelldatum",
            //headerSort: false,
            width: 150,
        }, {
            // Spalte: erstellungsdatum
            title: "Erstellungsdatum",
            field: "erstellungsdatum",
            //headerSort: false,
            width: 150,
        }, {
            // Spalte: Sendungsnummer
            title: "Sendungsnummer",
            field: "sendungsnummer",
            headerSort: false,
            width: 200,
            // Die Spalte "Sendungsnummer" ist editierbar
            editable: isRowSelected,
            editor: "input",
            // Erzeuge Hyperlink in Zelle
            formatter: createHyperLink,
        },
        // Buttons
        {
            field: "EditButton",
            formatter: formatter_EditButton,
            cellClick: cellClick_EditButton,
            headerSort: false,
            width: 110,
            align: "center",
            resizable: false
        }, {
            field: "CancelButton",
            formatter: formatter_CancelButton,
            cellClick: cellClick_CancelButton,
            headerSort: false,
            width: 110,
            align: "center",
            resizable: false,
            visible: false
        }, {
            field: "SaveButton",
            formatter: formatter_SaveButton,
            cellClick: cellClick_SaveButton,
            headerSort: false,
            width: 110,
            align: "center",
            resizable: false,
            visible: false
        },
    ],
});