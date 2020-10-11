import express from 'express';
import insurerRouter from './routes/insurer';
import policyRouter from './routes/policy';
import policyTypeRouter from './routes/policyType';
import bodyParser = require('body-parser');

const app = express();

//request/response settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//routing
app.use('/', (_req, res) => {
    console.log('App started');
    res.send('OK');
})
app.use('/insurer', insurerRouter);
app.use('/policy', policyRouter);
app.use('/policy-type', policyTypeRouter);
        
export default app;