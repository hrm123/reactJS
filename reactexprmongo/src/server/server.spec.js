import {addNewTask, updateTask} from './server';
import { v4 as uuidv4 } from 'uuid';




(async function func1(){
    const tid = uuidv4();
    await addNewTask({
        name:"todo1",
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        id: tid
    });


    await updateTask({
        name:"todo1 updated",
        updated: new Date().toISOString(),
        id: tid
    });
})();