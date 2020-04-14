import {createStore, applyMiddleware, combineReducers} from 'redux';
import {defaultState} from '../../server/defaultState';
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import * as mutations from './mutations';

const sagaMiddleware = createSagaMiddleware();
// import * as sagas from './sagas.mock';
import * as sagas from './sagas';

export const store = createStore(
    combineReducers({
        session: (userSession = defaultState.session || {}, action) => {
            let {type,authenticated,session} = action;
            switch(type){
                case mutations.SET_STATE:
                    return {...userSession, id: action.state.session.id};
                case mutations.REQUEST_AUTHENTICATE_USER:
                    return {...userSession, authenticated:mutations.AUTHENTICATING_USER};
                case mutations.PROCESSING_AUTHENTICATE_USER:
                    return {...userSession, authenticated};
                default:
                    return userSession;
            }
        },
        tasks: (tasks = defaultState.tasks, action) => {
            switch(action.type) {
                case mutations.SET_STATE:
                    return action.state.tasks;
                case mutations.CREATE_TASK:
                    return [...tasks, { 
                        id: action.taskID, 
                        name: "new task", 
                        isComplete: false,
                        group: action.groupID,
                        owner: action.ownerID
                        }
                    ];
                case mutations.SET_TASK_COMPLETE:
                    return tasks.map(task => {
                        return (task.id === action.taskID) ? {...task, isComplete: action.isComplete} : task
                    });
                case mutations.SET_TASK_NAME:
                    return tasks.map(task => {
                        return (task.id === action.taskID) ? {...task, name: action.name} : task
                    });
                case mutations.SET_TASK_GROUP:
                    return tasks.map(task => {
                        return (task.id === action.taskID) ? {...task, group: action.groupID} : task
                    });
                default:
                    return tasks;
            }
        },

        notes: (notes = defaultState.notes, action) => {
            switch(action.type) {
                case mutations.SET_STATE:
                    return action.state.comments;
                default:
                    return notes;
            }
        },

        groups: (groups = defaultState.groups, action) => {
            switch(action.type) {
                case mutations.SET_STATE:
                    return action.state.groups;
                default:
                    console.log(groups);
                    return groups;
            }
        }
    }),
    applyMiddleware(createLogger(), sagaMiddleware)
)

for(let saga in sagas){
    console.log(saga);
    sagaMiddleware.run(sagas[saga]);
}