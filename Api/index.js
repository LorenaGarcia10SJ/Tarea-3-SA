const express = require('express');
const cors = require('cors');
require('dotenv').config();

const tareaRoute = require('./routes/tareaRoute.js');

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/tarea', tareaRoute);

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
