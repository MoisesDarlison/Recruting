const express = require('express');
require('dotenv').config();
const app = express();

const { PORT = 3333 } = process.env;

const companyRoutes = require('./Routes/Companies');
const OpportunityRoutes = require('./Routes/Opportunities');

app.use(express.json());
app.use('/company', companyRoutes);
app.use('/Opportunities', OpportunityRoutes);

app.listen(PORT, () => {
    console.log(`Listen in port ${PORT}`);
});
