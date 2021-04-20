const express = require('express');
require('dotenv').config();
const app = express();

const { PORT = 3333 } = process.env;

const companyRoutes = require('./Routes/Companies');
const OpportunityRoutes = require('./Routes/Opportunities');
const SkillRoutes = require('./Routes/Skills');
const CandidateRoutes = require('./Routes/Candidates');
const SignUpRoutes = require('./Routes/SignUp');

app.use(express.json());
app.use('/companies', companyRoutes);
app.use('/candidates', CandidateRoutes);
app.use('/signup', SignUpRoutes);
app.use('/opportunities', OpportunityRoutes);
app.use('/skills', SkillRoutes);

app.listen(PORT, () => {
    console.log(`Listen in port ${PORT}`);
});
