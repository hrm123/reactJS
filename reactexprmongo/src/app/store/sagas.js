import {take, put,select} from 'redux-saga/effects';
import * as mutations from './mutations';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';


const url = "http://localhost:7777";




export function* taskCreationSaga(){
    while(true){
        const {groupID} = yield take(mutations.REQUEST_TASK_CREATION); // listen for action
        const ownerID = "u1";
        const taskID = uuidv4();
        yield put(mutations.createTask(taskID, groupID, ownerID)); // send action to store
        const {res} = yield axios.post(url + `/task/new`, {
            task: {
                id: taskID,
                group: groupID,
                owner: ownerID,
                isComplete: false,
                name: "new task"
            }
        });
        console.log("got response", res);
    }
}



export function* taskModificationSaga(){
    while(true){
        const task = yield take([mutations.SET_TASK_GROUP, mutations.SET_TASK_NAME, mutations.SET_TASK_COMPLETE])
       
        const {res} = yield axios.post(url + `/task/update`, {
            task: {
                id: task.taskID,
                group: task.groupID,
                isComplete: task.isComplete,
                name: task.name
            }
        });
        console.log("got response", res);
    }
}



export function* userAuthenticationSaga(){
    while(true){
        const {username, password} = yield take([mutations.REQUEST_AUTHENTICATE_USER])
       
        try{
            const {data} = yield axios.post(url + `/authenticate`, 
                {username, password}
            );
            console.log("Authenticated!")
            if(!data){
                throw new Error();
            }
        }
        catch(e){
            console.log("auth failed" + e);
            yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED_USER))
        }
        
    }
}


export function* userRegistrationSaga(){
    while(true){
        const {username, password} = yield take([mutations.REQUEST_REGISTER_USER])
       
        try{
            const {data} = yield axios.post(url + `/authenticate`, 
                {username, password}
            );
            console.log("Authenticated!")
            if(!data){
                throw new Error();
            }
        }
        catch(e){
            console.log("auth failed" + e);
            yield put(mutations.processRegisterUser(mutations.REGISTER_USER_FAIL))
        }
        
    }
}


