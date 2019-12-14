const path = require('path');
const env = path.join(__dirname, '..', '.env.local')
//import environment configuration 
require('dotenv').config({path:env});
const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser');
const api = require('./api')
const cors = require('cors'); 
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 4000; 



/* ===========================
|| CONNECT TO MONGODB SERVER ||
=============================*/
mongoose.Promise = global.Promise;
mongoose.connect(process.env.REMOTE_MONGODB_URI, {useNewUrlParser : true,  useUnifiedTopology: true});
const db = mongoose.connection;
db.once('open', ()=>{
  console.log("DB Connected !!");
});
db.on("error", (err)=>{
  console.log("DB ERROR :", err);
});




/* ========================
||       MIDDLEWARE      ||
==========================*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cors()); 
app.use(cookieParser());
app.use('/api', api);

/* ========================
||     SERVER LISTEN      ||
==========================*/
const server=app.listen(port, err =>{
   if(err) {
    console.log(err);
    return;
  } else {
    console.log("server is listening on port " + port);
  }
});




process.on('SIGINT', function () {
  console.log('DAPP SERVER IS CLOSED BY <Ctrl + c> !! ');
   gracefulCleanJob().then(() => {
    process.exit();
  })
});

process.on('SIGTERM', function () {
  console.log(' SERVER IS NOMALLY CLOSED!! ');
  gracefulCleanJob().then(() => {
    process.exit();
  })
});

process.on('exit', function (code) {
  console.log(` SERVER IS CLOSED WITH CODE:${code}`);
});


const gracefulCleanJob = function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 500);  
  });
};
