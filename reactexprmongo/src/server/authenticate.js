import { v4 as uuidv4 } from 'uuid';
import md5 from 'md5';
import { connectDB } from '../connect-db';

const authenticateTokens = [];



export const registerUser = async (email, password) => {
    await defaultAuth.createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
}

export const signinUser = async (email, password) => {
    await  defaultAuth.signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
}
