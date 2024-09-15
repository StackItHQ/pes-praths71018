import gspread
from oauth2client.service_account import ServiceAccountCredentials

# Use OAuth2 credentials for Google Sheets API
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
creds = ServiceAccountCredentials.from_json_keyfile_name("path_to_credentials.json", scope)
client = gspread.authorize(creds)

# Open the Google Sheet
sheet = client.open("Sheet Name").sheet1

# Get data from Google Sheets
data = sheet.get_all_records()

# Get a specific row or update a row
row_data = sheet.row_values(1)
sheet.update_cell(1, 1, "Updated Value")
