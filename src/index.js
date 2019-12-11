//import environment configuration 
require('dotenv').config();

const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser');
const api = require('./api')
const port = process.env.PORT || 4000; 

/* ===========================
|| CONNECT TO MONGODB SERVER ||
=============================*/
console.log(process.env.REMOTE_MONGODB_URI);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.REMOTE_MONGODB_URI, {useNewUrlParser : true});
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
 
    }, 500);  
  });
};
