import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as admin from 'firebase-admin';
import Firebase from 'firebase';
// import {Observable} from 'rxjs/Observable';
const io = require('socket.io')();
//import * as firebase from 'firebase';
const fs = require('fs');
require('dotenv').config();


let certJson = null;
let fbJson = null;

    certJson = fs.readFileSync(process.env.CERT_FILE, 'utf8');
    fbJson = fs.readFileSync(process.env.FIREBASE_CONFIG_FILE, 'utf8');
  

  io.on('connection', (client) => {
    client.on('createDrawing', ({ name }) => {
      createDrawing({ connection, name });
    });

    client.on('subscribeAuthStatusChange', () => subscribeToAuthStatusChange({
      client,
      connection,
    }));
});

admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(certJson)), // admin.credential.applicationDefault(),
    databaseURL: 'https://mytasks-2df8e.firebaseio.com'
  }); // have to set env param GOOGLE_APPLICATION_CREDENTIALS="C:\Users\username\Downloads\service-account-file.json"

  Firebase.initializeApp(JSON.parse(fbJson));
 
  console.log('firebase app name', admin.app().name);  // '[DEFAULT]'
    
  // Use the shorthand notation to retrieve the default app's services
  var defaultAuth = Firebase.auth();
  var todosRef = admin.database().ref().child("todos");
  let userAuthenticated = false;


  Firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      userAuthenticated = true;
    } else {
      // No user is signed in.
      userAuthenticated = false;
    }
    console.log('userAuthenticated : ', userAuthenticated);
  });

let port = 7777;
let app = express();

let portSock = 7775;
io.listen(portSock);
console.log('socket listening on port ', portSock);

app.listen(port, console.log("server listening on port ", port));

app.use(
    cors(),
    bodyParser.urlencoded({extended: true}),
    bodyParser.json()
);

export const addNewTask = async task => {
    // console.log('task', task);
    await todosRef.child(task.id).set(task);
}

export const updateTask = async task => {
    await todosRef.child(task.id).update(task);
}

export const registerUser = async (email, password) => {
    await defaultAuth.createUserWithEmailAndPassword(email, password);
}

export const signonUser = async (email, password) => {
    return  defaultAuth.signInWithEmailAndPassword(email, password);
}

export const signoutUser = async (email, password) => {
    return  defaultAuth.signOut();
}




    app.post('/authenticate', async (req, res) => {
        let {username, password} = req.body;
        console.log('username',username);
        try{
            const resp = await signonUser(username, password);
            // console.log('authenticateres', resp);
            res.status(200).send(resp);
        }
        catch(e){
            console.log(e);
            if(e.code === 'auth/user-not-found'){
                res.status(401).send("User not found");
            } else {
                res.status(500).send("server error");
            }
        }
    });


app.post('/signout', async (req, res) => {
    let {username, password} = req.body;
    console.log('username',username);
    try{
        const res = await signoutUser(username, password);
        console.log('authenticateres', res);
        res.status(200).send();
    }
    catch(e){
        console.log(e);
        res.status(500).send("User not found");
    }
});

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
    if(!userAuthenticated){
        res.status(401).send("Please signon");
        return;
    }
    let task = req.body.task;
    await addNewTask(task);
    res.status(200).send();
});



app.post('/task/update', async (req, res) => {
    if(!userAuthenticated){
        res.status(401).send("Please signon");
        return;
    }

    let task = req.body.task;
    await updateTask(task);
    res.status(200).send();
});