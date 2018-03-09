const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname +'./../../'));

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, './../../index.html'))
});

app.listen(5000, () => {
  console.log('SERVER HAS STARTED ON PORT 5000');
});
