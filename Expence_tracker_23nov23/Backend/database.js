import mysql from 'mysql2'

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database:'expense_traker'
}).promise()


export async function getAllData () {
    const [ exp, _ ] = await pool.query('SELECT * FROM exp_record');
    return exp;
}

export async function getSingleData (id) {
    const [ exp, _ ] = await pool.query('SELECT * FROM exp_record WHERE id = ?', [id]);
    return exp;
}

export async function createExpence ( amount, title, category) {
    const [ exp, _ ] = await pool.query('INSERT INTO exp_record ( amount, title, category) VALUES ( ?, ?, ?)', [amount, title,category]);
    const id = exp.insertId;
    return getSingleData(id);
}
export async function deleteExpence ( id ) {
    const [ exp, _ ] = await pool.query('DELETE FROM exp_record WHERE id = ?', [id]);
    return exp;
}
export async function updateExpence ( id, amount) {
    const [ exp, _ ] = await pool.query('UPDATE exp_record SET amount = ?  WHERE id = ?', [ amount, id ]);
    return getSingleData(id);
}

// const result = await updateExpence( 3, 5000);
// const result = await deleteExpence(2);
// const result = await createExpence( 1000, 'title','cat 6');
// console.log(result)



