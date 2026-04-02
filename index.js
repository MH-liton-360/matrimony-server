const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;

// call express 
const app = express();

// middileWare 
app.use(cors());
app.use(express.json());