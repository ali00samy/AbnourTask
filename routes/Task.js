const express = require('express');
const jwt = require('jsonwebtoken');
const prisma = require('../client');
const auth = require('../middleware/auth');
const admin = require ('../middleware/admin')
const router = express.Router();

router.post('/addTask', async (req, res) => {
    const {
        name,
        deadline,
        task_status,
        task_salary,
        employeeId
    } = req.body

    const dealineDate = new Date(deadline);

    const task = await prisma.task.create({
        data : {
            name,
            deadline : dealineDate,
            task_status,
            task_salary,
            employeeId
        }
    });

    res.status(200).send(task);
})


module.exports = router;