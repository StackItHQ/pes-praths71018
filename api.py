import gspread
from google.oauth2.service_account import Credentials

# Define the scope for Google Sheets and Google Drive
scope = ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive"]

# Load credentials from the JSON file
creds = Credentials.from_service_account_file("superjoin-435701-770bc42ee446.json", scopes=scope)

# Authorize the client with the credentials
client = gspread.authorize(creds)

# Open the Google Sheet
sheet = client.open("Sheet1").sheet1

# Get data from Google Sheets
data = sheet.get_all_records()
print(data)

# Get a specific row or update a row
row_data = sheet.row_values(1)
sheet.update_cell(1, 1, "Updated Value")
