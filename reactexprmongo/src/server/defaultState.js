import md5 from 'md5';

export const defaultState = {
    session:{
        authenticated: false
    },
    users: [{
        id:"u1",
        name:"dev",
        passswordHash: md5("mypassword")
    }],
    groups:[{
        name:"to do",
        id:"g1",
        owner:"u1"
    },
    {
        name:"doing",
        id:"g2",
        owner:"u1"
    },
    {
        name:"done",
        id:"g3",
        owner:"u1"
    }],
    tasks:[{
        name:"task3",
        id:"t3",
        group:"g3",
        owner:"u1",
        isComplete: true
    },
    {
        name:"task2",
        id:"t2",
        group:"g2",
        owner:"u1",
        isComplete: false
    },
    {
        name:"task1",
        id:"t1",
        group:"g1",
        owner:"u1",
        isComplete: false
    }],
    notes:[{
        owner:"u1",
        id:"n1",
        task:"ut1",
        content:"Great Work!!!"
    }]
}