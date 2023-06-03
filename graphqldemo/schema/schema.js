const graphql = require('graphql')
// const _ = require('lodash')
const axios = require('axios')

const { GraphQLInputObjectType, GraphQLSchema} = graphql

const CompanyType =  new graphql.GraphQLObjectType({
    name: 'Company', // ususallly same as the Type which is being defined
    fields: () => ({ // since this is closure context UserType will already be defined earlier .. else UserType had to be defined above 
        id: {type:  graphql.GraphQLString },
        name: {type: graphql.GraphQLString },
        description: {type: graphql.GraphQLString},
        users: {
            type: new graphql.GraphQLList(UserType),
            resolve(parentValue, args){
                console.log({parentValue})
                return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`).then(res => res.data)
            }
        }
    })
})



const UserType =  new graphql.GraphQLObjectType({
    name: 'User', // usually same as the Type which is being defined
    fields: () => ({
        id: {type:  graphql.GraphQLString },
        firstName: {type: graphql.GraphQLString },
        age: {type: graphql.GraphQLInt},
        company: {
            type: CompanyType,
            resolve(parentValue, args){
                return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`).then(res => res.data)
            }
        }
    })
})

// root query - entry point for graphql
const rootQuery = new graphql.GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        user:{ // if you are looking for UserType give me ID, then I will return 'UserType' object
            type: UserType,
            args: { id: {type: graphql.GraphQLString}},
            async resolve(parentValue, args){
                // this function is one which actually reaches out to grab data queried by user.. rest of code jsut describes shape of data
                // args is whatever is passed into original query
                // return _.find(users, { id: args.id})
                return await axios.get(`http://localhost:3000/users/${args.id}`).then( resp => resp.data)
            }
        },
        company: {
            type: CompanyType,
            args: { id: {type: graphql.GraphQLString}},
            async resolve(parentValue, args){
                return await axios.get(`http://localhost:3000/companies/${args.id}`).then( resp => resp.data)
            }
        }
    }
})


module.exports =  new GraphQLSchema({
    query: rootQuery,

})


/*
sample query
{
  user(id:"2"){
    id,
    firstName,
    age
  }
}

{
  user(id:"2"){
    id,
    firstName,
    age,
    company {
      id, name, description
    }
  }
}

{
  company(id:"2"){
    id,name, description
  }
}

{
  company(id:"2"){
    id,name, description, users {
      id,firstName
    }
  }
}


//circular nesting
{
  company(id:"2"){
    id,name, description, users {
      id,firstName,company {name}
    }
  }
}
*/