CREATE TRIGGER update_google_sheet AFTER UPDATE ON your_table
FOR EACH ROW
BEGIN
  -- Call an external service or webhook to notify the Google Sheet
  CALL your_stored_procedure();
END;
