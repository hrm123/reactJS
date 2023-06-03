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


const mutation = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType, // data that we will return from resovle function
            args:{
                firstName: {type: new graphql.GraphQLNonNull( graphql.GraphQLString )},
                age: {type: new graphql.GraphQLNonNull(graphql.GraphQLInt)},
                companyId: {type: graphql.GraphQLString},
            },
            resolve(parentValue, {firstName, age} ){
                return axios.post(`http://localhost:3000/users`, {firstName, age}).then(res => res.data)
            }
        },
        deleteUser: {
            type: UserType, // data that we will return from resovle function
            args:{
                id: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
            },
            resolve(parentValue, {id} ){
                return axios.delete(`http://localhost:3000/users/${id}`).then(res => res.data)
            }
        },
        editUser: {
            type: UserType, // data that we will return from resovle function
            args:{
                firstName: {type:  graphql.GraphQLString },
                age: {type: graphql.GraphQLInt},
                companyId: {type: graphql.GraphQLString},
                id: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
            },
            resolve(parentValue, args ){
                return axios.patch(`http://localhost:3000/users/${args.id}`, args).then(res => res.data)
            }
        },
    }
})

module.exports =  new GraphQLSchema({
    query: rootQuery,
    mutation: mutation

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

//named query
query fetchCompany{
  company(id:"2"){
    id,name, description
  }
}

//multiple records of same type in single query
query fetchTop2Company{
  two:company(id:"2"){
    id,name, description
  }
  one:company(id:"1"){
    id,name, description
  }
}

// fragments - DRY
query fetchTop2Company{
  two:company(id:"2"){
    ...companyDetails
  }
  one:company(id:"1"){
    ...companyDetails
  }
}
fragment companyDetails on Company {
  id, name, description
}

//mutations - delte / update / create new graphql records

mutation {
  addUser(firstName: "avh", age:10){
    id, firstName, age
  }
}

mutation {
  editUser(id: "3", firstName: "Natashah"){
    id, firstName, age
  }
}

*/