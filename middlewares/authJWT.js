require('dotenv').config();
const jwt = require('jsonwebtoken')
const accessSecretKey = process.env.ACCESS_SECRET_KEY;

//generate token
exports.generateToken = (user) => {
    return jwt.sign(
        {id:user.id, role:user.role},
        accessSecretKey,
        {expiresIn: '60m'}
    )
}

// function check user auth
exports.verifyToken = (req, res, next) => {
    const headersToken = req.headers.authorization;
    if(!headersToken) return res.status(401).send({message:'No access token sended'})

    const token = headersToken.split(' ')[1]

    //verify sended token
    jwt.verify(token,accessSecretKey,(err, payload) => {
        if(err) res.status(403).send({message: 'You are not authorized'})

            req.payload = payload;
            req.role = payload.role;
            console.log("Payload after verify:", payload);  
            console.log("User Role:", req.role); 
            next()
    })
}
exports.authorizeRole = (role) => {

    return (req,res,next) => {
      if (req.role !== role) {
        return res.status(403).send({ message: 'You do not have permission to access this resource.'});
      }
      next();
    };
  };

  exports.authorizeAllRole = (role1,role2) => {
    return (req,res,next) => {
        if (req.role !== role1 && req.role !== role2) {
        return res.status(403).send({ message: 'You do not have permission to access this resource.'});
      }
      next();
    };
  };