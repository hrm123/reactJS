const express = require('express')
var { graphqlHTTP}  = require('express-graphql')
const app = express()
const schema = require('./schema/schema')


app.use('/graphql', graphqlHTTP({
    graphiql: true,
    // graphql consider all data of application to be graph and wants to know schema before hand
    schema
}));

app.listen(4000, () => {
    console.log('express started on port 4000');
})


