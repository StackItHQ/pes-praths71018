// This is for Google AppScript to be opened in Google Sheets
function onOpen() {
  updateDatabaseWithSheetContent();
}

function updateDatabaseWithSheetContent() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 2).getValues(); // Fetches slno and name columns, starting from row 2 (excluding header)
  var url =
    "https://0808-2406-7400-94-2326-dd10-6df7-1622-5da6.ngrok-free.app/update-database"; // Replace with your ngrok URL

  // Construct the request payload (sheet data)
  var payload = {
    data: data,
  };

  // Define request options
  var options = {
    method: "POST",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  };

  try {
    // Send data to the server (API)
    var response = UrlFetchApp.fetch(url, options);
    Logger.log(response.getContentText());
  } catch (error) {
    Logger.log("Error updating database: " + error.message);
  }
}

function onEdit(e) {
  if (!e) {
    Logger.log("Event object is undefined.");
    return;
  }

  // Get the active sheet and edited cell
  var sheet = e.source.getActiveSheet();
  var range = e.range;
  var rowNumber = range.getRow();
  var editedColumn = range.getColumn();

  // Assuming slno is in the first column
  var slnoColumn = 1;

  // Fetch the entire row data
  var rowValues = sheet
    .getRange(rowNumber, 1, 1, sheet.getLastColumn())
    .getValues()[0];

  // Capture slno and name (assuming second column is 'name')
  var slno = rowValues[0]; // First column for slno (ID)
  var name = rowValues[1]; // Second column for name

  // Get the old and new values of the edited cell
  var oldValue = e.oldValue || "";
  var newValue = range.getValue();

  // Determine the action
  var action = "";

  // If the edited column is slno and slno is cleared, treat as DELETE
  if (editedColumn === slnoColumn && !newValue && oldValue) {
    slno = oldValue; // Use the old slno value for DELETE
    action = "DELETE";
  } else if (!oldValue && newValue) {
    action = "CREATE";
  } else if (oldValue !== newValue) {
    action = "UPDATE";
  } else {
    Logger.log("No changes detected for action.");
    return;
  }

  // Prepare the payload for the API request
  var payload = {
    slno: slno,
    name: name,
    action: action,
  };

  // Send the data to the API
  sendToAPI(payload);
}

function sendToAPI(payload) {
  var url =
    "https://0808-2406-7400-94-2326-dd10-6df7-1622-5da6.ngrok-free.app/crud-operation"; 
  var options = {
    method: "POST",
    contentType: "application/json",
    payload: JSON.stringify(payload),
  };

  // Send the data
  UrlFetchApp.fetch(url, options);
}
