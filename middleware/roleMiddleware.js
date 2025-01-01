const User = require('../model/User');

const requireRole = (roleName) => async (req, res, next) => {
  const { userId } = req.headers; 
  if (!userId) {
    return res.status(401).send('Unauthorized');
  }
  
  const user = await User.findById(userId).populate('roles');
  if (!user) {
    return res.status(401).send('Unauthorized');
  }

  const hasRole = user.roles.some((role) => role.name === roleName);
  return hasRole ? next() : res.status(403).send('Forbidden');
};

module.exports = requireRole;
