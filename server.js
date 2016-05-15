const express = require('express')  
const app = express()  
const port = process.env.PORT || 5000

app.get('/', (request, response) => {
  
  response.sendfile('index.html')
})

app.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
