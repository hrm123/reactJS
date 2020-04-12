import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as admin from 'firebase-admin';
import Firebase from 'firebase';
//import * as firebase from 'firebase';
const fs = require('fs');
require('dotenv').config();


let certJson = null;
let fbJson = null;
try {
    certJson = fs.readFileSync(process.env.CERT_FILE, 'utf8');
    fbJson = fs.readFileSync(process.env.FIREBASE_CONFIG_FILE, 'utf8');
  } catch (err) {
    console.error(err)
  }

admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(certJson)), // admin.credential.applicationDefault(),
    databaseURL: 'https://mytasks-2df8e.firebaseio.com'
  }); // have to set env param GOOGLE_APPLICATION_CREDENTIALS="C:\Users\username\Downloads\service-account-file.json"

  Firebase.initializeApp(JSON.parse(fbJson));
 
  console.log('firebase app name', admin.app().name);  // '[DEFAULT]'
    
  // Use the shorthand notation to retrieve the default app's services
  var defaultAuth = Firebase.auth();
  var todosRef = admin.database().ref().child("todos");


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
    //todosRef.push().set(task);
    console.log('task', task);
    await todosRef.child(task.id).set(task);
}

export const updateTask = async task => {
    await todosRef.child(task.id).update(task);
}

export const registerUser = async (email, password) => {
    await defaultAuth.createUserWithEmailAndPassword(email, password);
}

export const signinUser = async (email, password) => {
    return  defaultAuth.signInWithEmailAndPassword(email, password);
    /*
    .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
  */
}


// export const authenticateRoute = app => {
    app.post('/authenticate', async (req, res) => {
        let {username, password} = req.body;
        console.log('username',username);
        try{
            const res = await signinUser(username, password);
            console.log('authenticateres', res);
            res.status(200).send();
        }
        catch(e){
            console.log(e);
            res.status(500).send("User not found");
        }
    });
// };

app.post('/register', async (req, res) => {
    let {username, password} = req.body;
    console.log('username',username);
    try{
        const res = await registerUser(username, password);
        console.log('registerres', res);
        res.status(200).send();
    }
    catch(e){
        console.log(e);
        res.status(500).send("User not found");
    }
});

app.post('/task/new', async (req, res) => {
    let task = req.body.task;
    await addNewTask(task);
    res.status(200).send();
});



app.post('/task/update', async (req, res) => {
    let task = req.body.task;
    await updateTask(task);
    res.status(200).send();
})