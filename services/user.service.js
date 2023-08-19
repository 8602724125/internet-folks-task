const User = require('../models/user.model');
const { validationResult } = require("express-validator");
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

let saltRounds = 10;

const UserService = {
  
    signup: async (req, res) => {
        let createUser = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(500).json({status: false, Error: errors});
        } else {
            try {
              let hashPwd = await bcrypt.hash(createUser.password, saltRounds)
              if (hashPwd) {
                const newUser = new User({
                    name: createUser.name,
                    email: createUser.email,
                    password: hashPwd,
                });
                  
                let savedUser = await newUser.save();
                if (savedUser) {
                  let access_token = jwt.sign({ _id: savedUser._id }, process.env.ACCESSTOKENSECRETKEY, { expiresIn: process.env.ACCESSTOKENTIME });
                  res.status(200).json({status: true, content: {
                    data: savedUser,
                    meta: {
                      access_token: access_token
                    }
                  }})
                }
              }
            } catch (e) {
              res.status(500).json({status: false, Error: e});
            }
        }
    },

    signin: async (req, res) => {
        let userAuth = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(500).json({status: false, Error: errors});
        } else {
            try {
              let userData = await User.findOne({email: userAuth.email})
              if (userData) {
                let comparePwd = await bcrypt.compare(userAuth.password, userData.password);
                if (comparePwd) {
                    let access_token = jwt.sign({ _id: userData._id }, process.env.ACCESSTOKENSECRETKEY, { expiresIn: process.env.ACCESSTOKENTIME });
                    let savedData = {
                      _id: userData._id,
                      name: userData.name,
                      email: userData.email,
                      created_at: userData.created_at
                    } 
                    res.status(200).json({status: true, content: {
                      data: savedData,
                      meta: {
                        access_token: access_token
                      }
                    }})
                } else {
                  res.status(200).json({status: false, message: "Incorrect password"})
                }
              } else {
                res.status(200).json({status: false, message: "User does not exist"});
              }
            } catch (e) {
              res.status(500).json({status: false, Error: e});
            }
          }
    },

    getMe: async (req, res) => {
      try {
        let userData = await User.findOne({_id: req._id});
        if (userData) {
          let savedData = {
            _id: userData._id,
            name: userData.name,
            email: userData.email,
            created_at: userData.created_at
          } 
          res.status(200).json({status: true, content: { data: savedData }})
        }
      } catch (e) {
        res.status(500).json({status: false, Error: e})
      }
    }
}

module.exports = UserService;