const express = require('express');
const cors = require('cors');
const routes = require('./routes'); 

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(8080,()=>{
   console.log('Local: http://localhost:8080');
});