const express = require('express');
const { insertData, createTable, getTableData, getAllTables, deleteTableData } = require('../controllers/routeController');

const route = express.Router();

route.post('/api/createTable', createTable)

route.post('/api/insertData', insertData);

route.get('/getAllData/:tableName', getTableData)

route.get('/getTables', getAllTables)

route.delete('/deleteEntry/:tableName/:id', deleteTableData)

module.exports = route;