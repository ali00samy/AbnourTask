const express = require('express');
const employeeRoute = require('./routes/Employee');
const taskRoute = require('./routes/Task');
const app = express();

app.use(express.json());
app.use('/api/employee', employeeRoute)
app.use('/api/task', taskRoute)

const port = 8080;
app.listen(port, ()=> {console.log('listening on port 8080')});
