const express = require('express');
const User = require('./Router/UserRouter');
require('dotenv').config();
require('./DBconnection/database');
const cors = require('cors')

const app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors({
    origin: '*'
}))




app.use(bodyParser.json())



app.use("/user", User);





const port = process.env.port || 5000;


app.listen(port, () => { console.log(`server running on port ====>>> ${port}`) })