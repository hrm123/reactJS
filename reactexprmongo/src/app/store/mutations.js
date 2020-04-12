export const REQUEST_TASK_CREATION = 'REQUEST_TASK_CREATION';
export const CREATE_TASK = 'CREATE_TASK';
export const SET_TASK_COMPLETE = 'SET_TASK_COMPLETE';
export const SET_TASK_GROUP = 'SET_TASK_GROUP';
export const SET_TASK_NAME = 'SET_TASK_NAME';
export const REQUEST_AUTHENTICATE_USER = 'REQUEST_AUTHENTICATE_USER';
export const AUTHENTICATED_USER = 'AUTHENTICATED_USER';
export const AUTHENTICATING_USER = 'AUTHENTICATING_USER';
export const NOT_AUTHENTICATED_USER = 'NOT_AUTHENTICATED_USER';
export const PROCESSING_AUTHENTICATE_USER = 'PROCESSING_AUTHENTICATE_USER';
export const REQUEST_REGISTER_USER = 'REQUEST_REGISTER_USER';
export const PROCESSING_REGISTER_USER = 'REQUEST_REGISTER_USER';
export const REGISTER_USER_FAIL = 'REGISTER_USER_FAIL';

export const requestTaskCreation = (groupID) => ({
    type: REQUEST_TASK_CREATION,
    groupID
});

export const createTask = (taskID, groupID, ownerID) => ({
    type: CREATE_TASK,
    taskID,
    groupID,
    ownerID
});


export const setTaskCompletion = (id, isComplete) => ({
    type: SET_TASK_COMPLETE,
    taskID: id,
    isComplete
});


export const setTaskName = (id, name) => ({
    type: SET_TASK_NAME,
    taskID: id,
    name
});


export const setTaskGroup = (id, groupID) => ({
    type: SET_TASK_GROUP,
    taskID: id,
    groupID
});



export const requestAuthenticateUser = (username, password) => ({
    type: REQUEST_AUTHENTICATE_USER,
    username,
    password
});


export const requestRegisterUser = (username, password) => ({
    type: REQUEST_REGISTER_USER,
    username,
    password
});


export const processRegisterUser = (status= AUTHENTICATING_USER, session = null) => ({
    type: PROCESSING_REGISTER_USER,
    session,
    authenticated: status
});



export const processAuthenticateUser = (status= AUTHENTICATING_USER, session = null) => ({
    type: PROCESSING_AUTHENTICATE_USER,
    session,
    authenticated: status
});