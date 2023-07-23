const fetch = require('node-fetch')

exports.handler = async function() {

    const url = process.env.ASTRA_GRAPHQL_ENDPOINT
    
    const query  = `
        query getAllGenres{
        reference_list (
          value: {label: "genre"}
          ){
            values {
              value
            }
          }
      }
    `

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-cassandra-token": process.env.ASTRA_APPLN_TOKEN
        },
        body: JSON.stringify({query})
    })

    try{
        const responseBody = await response.json()
        return {
            statusCode: 200,
            body: JSON.stringify(responseBody)
        }
    }
    catch(err){
        console.log(err)
        return {
            statusCode: 500,
            body: JSON.stringify
        }
    }

}