const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'mydatabase',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.post('/api/createTable', (req, res) => {
  const { tableName, fields } = req.body;

  // Build the SQL query to create the table
  const createTableQuery = `CREATE TABLE ${tableName} (id INT UNIQUE PRIMARY KEY AUTO_INCREMENT,${fields.map(field => `${field.name} ${field.type}`).join(', ')})`;

  db.query(createTableQuery, (err) => {
    if (err) {
      console.error('Error creating table:', err);
      res.status(500).json({ error: 'Error creating table' });
    } else {
      res.json({ message: 'Table created successfully' });
    }
  });
});

app.post('/api/insertData', (req, res) => {
  const { tableName, data } = req.body;

  // Build the SQL query to insert data into the table
  const insertDataQuery = `INSERT INTO ${tableName} SET ?`;

  db.query(insertDataQuery, data, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ error: 'Error inserting data' });
    } else {
      res.json({ id: result.insertId, ...data });
    }
  });
});

app.get('/api/getAllData/:tableName', (req, res) => {
  const tableName = req.params.tableName;

  // Build the SQL query to get all data from the table
  const getAllDataQuery = `SELECT * FROM ${tableName}`;

  db.query(getAllDataQuery, (err, results) => {
    if (err) {
      console.error('Error getting data:', err);
      res.status(500).json({ error: 'Error getting data' });
    } else {
      res.json(results);
    }
  });
});

app.delete('/api/deleteData/:tableName/:id', (req, res) => {
  const tableName = req.params.tableName;
  const id = req.params.id;

  // Build the SQL query to delete data from the table
  const deleteDataQuery = `DELETE FROM ${tableName} WHERE id = ?`;

  db.query(deleteDataQuery, [id], (err) => {
    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).json({ error: 'Error deleting data' });
    } else {
      res.json({ id });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
