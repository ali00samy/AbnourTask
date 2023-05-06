const express = require('express');
const jwt = require('jsonwebtoken');
const prisma = require('../client');
const auth = require('../middleware/auth');
const admin = require ('../middleware/admin')
const bcrypt = require('bcrypt');
const router = express.Router();

const secret = 'mysecretkey';

router.get('/mine', auth ,async (req, res) => {
  const id = req.employee.Id;
  const employee = await prisma.employee.findFirst({where: { id: id}, include : {tasks:true } });
  console.log(id);
  res.send(employee)
})

router.patch('/TaskStatus/:id', auth , async(req, res) => {
  const empId = req.employee.Id;
  const employeeID = await prisma.employee.findFirst({where: {id: empId}});

  const task_empId = await prisma.task.findFirst({where: {id : parseInt(req.params.id) }})
  console.log(task_empId);
  if (employeeID.id == task_empId.employeeId ) {
    const {task_status} = req.body
    const newStatus = await prisma.task.update({
      where : { id : parseInt(req.params.id) },
      data : {
        task_status 
      }
    })

    if(newStatus.task_status =='completed') {
      const salaryHistory = prisma.employeeSalaryHistory.findFirst({where: {employeeId: empId}})
      // const Month = new Date().getMonth();
      // const Year = new Date().getMonth();
      const salary_history = await prisma.employeeSalaryHistory.create({
        data : {
          employeeId : empId,
          month : new Date().getMonth(),
          year : new Date().getFullYear() ,
          salary_taken : task_empId.task_salary
        }
      })
      console.log(salary_history);
    }
    res.send(newStatus);
  }
  else {
    res.status(401).send('accses denied')
  }
})

router.post('/signup',async (req, res) => {
    const { name ,
          password ,
          role ,
          birth_date,
          profile_P } = req.body;

  
    const birthdate = new Date(birth_date);
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const employee = await prisma.employee.create({
      data: {
        name,
        password: hashedPassword,
        role,
        birth_date: birthdate,
        profile_P
      },
    });
    
    res.status(200).send(employee);
});

router.post('/login', async (req, res) => {
  const { name, password } = req.body;

  const employee = await prisma.employee.findFirst({ where: { name } });

  if (!employee || !(await bcrypt.compare(password, employee.password))) {
    return res.status(401).json({ error: 'Invalid name or password' });
  }

  const token = jwt.sign({ Id: employee.id , role: employee.role }, secret);

  res.json({ token });
});

router.patch ('/changeSalary', [auth, admin], async (req,res) => {
  const id = req.employee.Id;
  const salary = await prisma.employeeSalaryHistory.update({where: {employeeId: req.body.id},
    data : {
      salary_taken : req.body.salary_taken
    }
  })

  res.send(salary);
})

module.exports = router;