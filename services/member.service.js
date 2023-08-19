const Member = require('../models/member.model');
const { validationResult } = require("express-validator");

const MemberService = {

  addMember: async (req, res) => {
    let createMember = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(500).json({Error: errors});
    } else {
        try {
            const newMember = new Member({
                community: createMember.community,
                role: createMember.role,
                user: createMember.user,
            });
            let savedMember = await newMember.save();
            if (savedMember) {
                res.status(200).json({status: true, content: {data: savedMember}})
            }
        } catch (e) {
            res.status(200).json({Error: e})
        }
    }
  },
  
  removeMember: async (req, res) => {
    let id = req.params.id;
    try {
        let authUsers = await Member.findOne({user: req._id}).populate('role', {name: 1})
        if (authUsers.role.name === "Community Admin" || authUsers.role.name === "Community Moderator") {
            let memberData = await Member.deleteOne({_id: id})
            if (memberData) {
                res.status(200).json({status: true})
            }
        } else {
            res.status(200).json({status: false, message: "User does not have a permission to delete."})
        }
    } catch (e) {
        res.status(200).json({status: false, Error: e})
    }
  }
}

module.exports = MemberService;