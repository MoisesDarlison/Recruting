const express = require('express');
require('dotenv').config();
const app = express();
const { PORT = 3333 } = process.env;

app.listen(PORT, () => {
    console.log(`Listen in port ${PORT}`);
});