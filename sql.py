import mysql.connector

# Connect to the MySQL database
db = mysql.connector.connect(
    host="your_host",
    user="your_username",
    password="your_password",
    database="your_database"
)

cursor = db.cursor()

# Query the database
cursor.execute("SELECT * FROM your_table")
rows = cursor.fetchall()

# Update a record in the database
cursor.execute("UPDATE your_table SET column_name = %s WHERE id = %s", ("New Value", 1))
db.commit()

cursor.close()
db.close()
