const fetch = require('node-fetch')

exports.handler = async function(event) {

    const url = process.env.ASTRA_GRAPHQL_ENDPOINT
    const body = JSON.parse(event.body)
    const query  = `
    query {
        movies_by_genre(
                  value: {genre: ${JSON.stringify(body.genre)}},
                  orderBy: [year_DESC]
              ){
                  values {
                    year,
                    title,
                    duration,
                    synopsis,
                    thumbnail
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