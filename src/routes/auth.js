const express = require('express');
const router = express.Router();
const Admin = require('../classes/AdminClass');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const User = require('../classes/UserClass');



router.post('/admin/sign-in', async (req, res) => {
  try {
      const { email, password } = req.body;
      const admin = await Admin.findByEmail(email);
  
      if (!admin) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      const isValidPassword = await bcrypt.compare(password, admin.password)
  
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      const token = jwt.sign(admin.toJSON(), process.env.TOKEN_SECRET_KEY);
  
      res.json({ token, admin });
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
});

router.post('/superviseur/sign-in', async (req, res) => {
    try {
        const { email, password } = req.body;
        const superviseur = await User.findByEmail(email);
    
        if (!superviseur) {
          return res.status(401).json({ message: 'Invalid username or password' });
        }
    
        const isValidPassword = await bcrypt.compare(password, superviseur.password)
    
        if (!isValidPassword) {
          return res.status(401).json({ message: 'Invalid username or password' });
        }
    
        const token = jwt.sign(superviseur.toJSON(), process.env.TOKEN_SECRET_KEY);
    
        res.json({ token, superviseur });
      } catch (error) {
        console.log(error)
        res.status(500).send(error)
      }
});

router.post('/enq/sign-in', async (req, res) => {
  try {
    const { email, password } = req.body;
    const enq = await User.findByEmail(email);

    if (!enq) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isValidPassword = await bcrypt.compare(password, enq.password);
    console.log(password)

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(enq.toJSON(), process.env.TOKEN_SECRET_KEY);

    res.json({ token, enq });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});


module.exports = router;