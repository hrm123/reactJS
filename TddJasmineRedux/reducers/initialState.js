export default {  
    inputValue: "My first todo",
    todos: [{
            "Task": "todo1",
            "Complete": false,
            "taskType": "General",
             "TaskId": 1 // will be updated in tthe action method
        },
        {
            "Task": "todo2",
            "Complete": false,
            "taskType": "General",
             "TaskId": 2 // will be updated in tthe action method
        }],
    taskType: 'General',
    taskStatus:'All',
    maxTodoIndex: 2
}