const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const router = express.Router();
const {User} = require('../models/user');
const Joi = require('joi');

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({email : req.body.email});
  if(user) return res.status(400).send('User already registered.');

    user = new User(_.pick(req.body, ['name','email','password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

  res.send(_.pick(user, ['_id','name','email']));
});


function validate(req) {
    const schema = {
      name: Joi.string().min(3).max(50).required(),
      email: Joi.string().min(3).max(255).required().email(),
      password: Joi.string().min(3).max(255).required()
    };
  
    return Joi.validate(req, schema);
}

module.exports = router;