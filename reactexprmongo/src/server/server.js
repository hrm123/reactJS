import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as admin from 'firebase-admin';
const fs = require('fs');
require('dotenv').config();

var serviceAccountFileName =  process.env.CERT_FILE;
// console.log('serviceAccountFileName -',serviceAccountFileName);

let certJson = null;
try {
    certJson = fs.readFileSync(serviceAccountFileName, 'utf8')
    // console.log(certJson)
  } catch (err) {
    console.error(err)
  }

admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(certJson)), // admin.credential.applicationDefault(),
    databaseURL: 'https://mytasks-2df8e.firebaseio.com'
  }); // have to set env param GOOGLE_APPLICATION_CREDENTIALS="C:\Users\username\Downloads\service-account-file.json"

 
  console.log(admin.app().name);  // '[DEFAULT]'
    
  // Use the shorthand notation to retrieve the default app's services
  var defaultAuth = admin.auth();
  var defaultDatabase = admin.database();


let port = 7777;
let app = express();

app.listen(port, console.log("server listening on port ", port));


/*
app.get('/', (req, res) => {
    res.send("hello world");
})
*/


app.use(
    cors(),
    bodyParser.urlencoded({extended: true}),
    bodyParser.json()
);

export const addNewTask = async task => {

}

app.post('/task/new', async (req, res) => {
    let task = req.body.task;

})