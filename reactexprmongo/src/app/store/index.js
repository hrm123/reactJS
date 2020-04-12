import {createStore, applyMiddleware, combineReducers} from 'redux';
import {defaultState} from '../../server/defaultState';
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import * as mutations from './mutations';

const sagaMiddleware = createSagaMiddleware();
import * as sagas from './sagas.mock';

export const store = createStore(
    combineReducers({

        tasks: (tasks = defaultState.tasks, action) => {
            switch(action.type) {
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
                default:
                    return notes;
            }
        },

        groups: (groups = defaultState.groups, action) => {
            switch(action.type) {
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