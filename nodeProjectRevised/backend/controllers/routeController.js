const mysql = require('mysql2');

//database
const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'mydatabase'
});

pool.connect((err) => {
    if (err) throw err;
    else console.log('database connected successfully');
});

const createTable = (req, res) => {
    const tableName = req.body.tableName;
    const fields = req.body.fields;

    const db_query = `CREATE TABLE IF NOT EXISTS ${tableName} (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, ${fields.map(field => `${field.name} ${field.type}`).join(', ')})`
    pool.execute(db_query, (err, result) => {
        if (err) {
            console.log('error', err);
            res.status(500).json({ error: 'sorry, something broke' })
        }
        else {
            res.json({ message: 'table created successfully' });
        }
    })
}

const insertData = (req, res) => {
    const { tableName, fields, values } = req.body;

    // const db_query = `INSERT INTO ${tableName} SET ?`;
    const insertDataQuery = `INSERT INTO ${tableName} (${fields.join(', ')}) VALUES (?)`;

    pool.query(insertDataQuery, [values], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ error: 'Error inserting data' });
            return;
        } else {
            res.json({ id: result.insertId, ...result });
        }
    });
}

const getTableData = (req,res) => {
    const tableName = req.params.tableName;
    const db_query = `SELECT * FROM ${tableName}`;

    pool.query(db_query, (err, result) => {
        if(err){
            console.log('Error: ', err);
            res.status(500).json({ error: 'something broke'});
        }
        else{
            console.log(result);
            if(result.length === 0){
                return res.json({message: 'No data inserted'})
            }
            const fields = Object.keys(result[0]);
            console.log(fields);
            const data = result.map(element => Object.values(element));
            console.log(data)
            
            res.json({ fields, data });
        }
    })
}

const getAllTables = (req,res) => {
    const db_query = `SHOW TABLES`;
    pool.query(db_query, (err,result) => {
        if(err) throw err;
        console.log(result);
        const tableNames = result.map(element => Object.values(element)[0]);
        res.json({ tableNames });
    })
}

const deleteTableData = (req,res) => {
    const {tableName, id} = req.params;
    const db_query = `DELETE FROM ${tableName} WHERE id = ?`;
    pool.query(db_query, [id], (err,result) => {
        if(err){
            console.log(err);
            res.status(500).json({error: 'somthing broke, sorry'});
            return;
        }
        else{
            res.json({message: `id ${id} is deleted`});
        }
    })
}
module.exports = {
    createTable,
    insertData,
    getTableData,
    getAllTables,
    deleteTableData
}