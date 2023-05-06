module.exports = function (req, res, next) {
    
    if (req.employee.role !== 'super admin' || req.employee.role !== 'hr' ) return res.status(403).send('Access denied.');
  
    next();
  }