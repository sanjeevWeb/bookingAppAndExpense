import mysql from 'mysql2'


const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'root123',
    database:'bookingApointment'
}).promise()

export async function getAllUsers() {
    const [result, _ ] = await pool.query('SELECT * FROM users');
    return result;
}

export async function getUserById(id){
    const [result] = await pool.query(`SELECT * FROM users WHERE id = ?`,[id]);
    return result;
}

export async function createNewUser(username, phone, email){
    const [result] = await pool.query(`INSERT INTO users (username,phone,email) VALUES (?,?,?)`,[username,phone,email]);
    const id = result.insertId;
    const data = await getUserById(id);
    return data[0];
}

export async function deleteUser (id){
    const result = pool.query(`DELETE FROM users WHERE id = ?`,[id]);
    return result;
}