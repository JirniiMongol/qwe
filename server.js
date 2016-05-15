const express = require('express')  
const app = express()  

app.get('/', (request, response) => {
  
  response.sendfile('index.html')
})

app.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
