import {take, put,select} from 'redux-saga/effects';
import * as mutations from './mutations';
import { v4 as uuidv4 } from 'uuid';


export function* taskCreationSaga(){
    while(true){
        const {groupID} = yield take(mutations.REQUEST_TASK_CREATION); // listen for action
        const ownerID = "u1";
        const taskID = uuidv4();
        yield put(mutations.createTask(taskID, groupID, ownerID)); // send action to store
        console.log("got group id" , groupID);
    }
}