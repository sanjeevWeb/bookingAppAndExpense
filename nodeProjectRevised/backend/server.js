const express = require('express');
const cors = require('cors')
const route = require('./routes/allRoutes.js')

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// database


app.use('/',route);

app.listen(5000, () => {
    console.log('server is listening at 5000');
})