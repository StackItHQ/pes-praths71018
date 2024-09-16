const express = require("express");
const mysql = require("mysql2");
const app = express();
app.use(express.json());

// Connect to the MySQL database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "**********",
  database: "SuperJoin",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to database");
});

// Handle CRUD operations
app.post("/crud-operation", (req, res) => {
  const { slno, name, action } = req.body;

  if (!slno || !action) {
    return res.status(400).send("Both 'slno' and 'action' are required.");
  }

  let query = "";

  // CRUD operation logic based on action
  switch (action.toUpperCase()) {
    case "CREATE":
      query =
        "INSERT INTO my_table (slno, name) VALUES (?, ?) ON DUPLICATE KEY UPDATE name = ?";
      db.query(query, [slno, name, name], (err, result) => {
        if (err) {
          console.error("Error creating record:", err);
          return res.status(500).send("Error creating record");
        }
        res.send("Record created successfully");
      });
      break;

    case "UPDATE":
      query = "UPDATE my_table SET name = ? WHERE slno = ?";
      db.query(query, [name, slno], (err, result) => {
        if (err) {
          console.error("Error updating record:", err);
          return res.status(500).send("Error updating record");
        }
        res.send("Record updated successfully");
      });
      break;

    case "DELETE":
      query = "DELETE FROM my_table WHERE slno = ?";
      db.query(query, [slno], (err, result) => {
        if (err) {
          console.error("Error deleting record:", err);
          return res.status(500).send("Error deleting record");
        }
        res.send("Record deleted successfully");
      });
      break;

    default:
      res.status(400).send("Invalid action specified");
  }
});

// Fetch all records from the database
app.get("/fetch-records", (req, res) => {
  const query = "SELECT * FROM my_table";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching records:", err);
      return res.status(500).send("Error fetching records");
    }

    res.json(results);
  });
});

// Route to update the database with Google Sheets content
app.post("/update-database", (req, res) => {
  const sheetData = req.body.data;

  if (!sheetData || sheetData.length === 0) {
    return res.status(400).send("No data provided");
  }

  // Extract `slno` values from the sheet data for comparison
  const sheetSlno = sheetData.map((row) => row[0]);

  // First, find the records in the database that are not in the Google Sheets data and delete them
  const deleteQuery = "DELETE FROM my_table WHERE slno NOT IN (?)";

  db.query(deleteQuery, [sheetSlno], (deleteErr) => {
    if (deleteErr) {
      console.error("Error deleting records:", deleteErr);
      return res.status(500).send("Error deleting records");
    }

    // Then, find rows that are in the sheet but not in the database and insert them
    const selectQuery = "SELECT slno FROM my_table WHERE slno IN (?)";

    db.query(selectQuery, [sheetSlno], (selectErr, existingRows) => {
      if (selectErr) {
        console.error("Error selecting records:", selectErr);
        return res.status(500).send("Error selecting records");
      }

      // Find rows in the sheet that are not in the existing database rows
      const existingSlno = existingRows.map((row) => row.slno);
      const newRows = sheetData.filter((row) => !existingSlno.includes(row[0]));

      if (newRows.length > 0) {
        // Insert the new rows into the database
        const insertQuery = "INSERT INTO my_table (slno, name) VALUES ?";

        const values = newRows.map((row) => [row[0], row[1]]);

        db.query(insertQuery, [values], (insertErr) => {
          if (insertErr) {
            console.error("Error inserting records:", insertErr);
            return res.status(500).send("Error inserting records");
          }

          res.send("Database updated successfully");
        });
      } else {
        res.send("Database updated successfully with no new records added.");
      }
    });
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
