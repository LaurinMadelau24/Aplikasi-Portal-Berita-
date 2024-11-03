const User = require('../model/main').User;
const bcrypt = require('bcryptjs');

//import the generate function
const { generateToken } = require('../middlewares/authJWT');
const { access } = require('fs');

//register
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send({ message: 'Email and Password are required' });

    await User.create(req.body);
    res.status(200).send({ message: `User ${email} has been created.` });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message || { message: 'Internal server error!' });
  }
};

//login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send({ message: 'Please enter your email and password to connect' });

    //find user
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).send({ message: `User ${email} not exist` });

    //verify password
    const verifyPassword = bcrypt.compareSync(password, user.password);
    if (!verifyPassword) return res.status(401).send({ message: 'wrong password' });

    //generate token

    const token = generateToken(user);


    res.status(200).send({
      id: user.id,
      email: user.email,
      role: user.role,

      //send generate token
      accesstoken: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message || { message: 'Internal server error!' });
  }
};

exports.logout = async (req, res) => {
    try{
        const userId = req.payload.id
        //find user
        const user = User.findByPk(userId)
        
        if(!user) return res.status(404).send({message:'User not exist.'})

            res.status(200).send({
                id:null,
                email:null,
                role:null,
                accesstoken:null,
                message:'Logout success'
            })
    }catch(err){
        console.log(err)
        res.status(500).send(err.message || { message: 'Internal server error!' });
    }
}
