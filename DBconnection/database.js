const mongoose = require('mongoose');
require('dotenv').config();


const url = process.env.MONGODBURL;


mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => { console.log("coo") }).catch((err) => { console.log("no", err) });

