function onEdit(e) {
  // Get the active sheet and edited cell
  var sheet = e.source.getActiveSheet();
  var range = e.range;

  // Get the new value
  var newValue = range.getValue();

  // Send this data to an external API or trigger a database update
  sendToAPI(newValue);
}

function sendToAPI(value) {
  var url = "https://your-server.com/update-db";
  var payload = {
    updated_value: value,
  };
  var options = {
    method: "POST",
    payload: JSON.stringify(payload),
    contentType: "application/json",
  };
  UrlFetchApp.fetch(url, options);
}
