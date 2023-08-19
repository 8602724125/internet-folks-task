const Community = require('../models/community.model')
const Member = require('../models/member.model')
const { validationResult } = require("express-validator");


const CommunityService = {

    getAll: async (req, res) => {
        try {
            let count = await Community.countDocuments();
            let communityData = await Community.find({}).limit(10);
            if (communityData) {
                res.status(200).json({
                    status: true, content: {
                        meta: {
                            total: count,
                            pages: Math.ceil(count/10),
                            pages: 1
                        },
                        data: communityData
                    }})
            }
        } catch (e) {
            res.status(500).json({status: false, Error: e});
        }

    },
   
    create: async (req, res) => {
        let createCommunity = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(500).json({status: false, Error: errors});
        } else {
            try {
                const newCommunity = new Community({
                    name: createCommunity.name,
                    slug: createCommunity.name.toLowerCase().replace(/\s+/g, '-'),
                    owner: req._id
                })
                let savedCommunity = await newCommunity.save();
                if (savedCommunity) {
                    res.status(200).json({status: true, content: {data: savedCommunity}})
                }
            } catch (e) {
                res.status(500).json({status: false, Error: e});
            }
        }
    },

    getAllMembers: async (req, res) => {
        let id = req.params.id
        try {
            let memberData = await Member.find({community: id}).populate('user', {name: 1}).populate('role', {name: 1})
            if (memberData) {
                res.status(200).json({
                    status: true, content: {
                        meta: {
                            total: memberData.length,
                            pages: Math.ceil(memberData.length/10),
                            pages: 1
                        },
                        data: memberData
                    }})
            }
        } catch (e) {
            res.status(500).json({status: false, Error: e});
        }
    },

    getMyOwnedCommunity: async (req, res) => {
        try {
            let ownedData = await Community.find({owner: req._id})
            if (ownedData) {
                res.status(200).json({
                    status: true, content: {
                        meta: {
                            total: ownedData.length,
                            pages: Math.ceil(ownedData.length/10),
                            pages: 1
                        },
                        data: ownedData
                    }})
            }
        } catch (e) {
            res.status(500).json({status: false, Error: e});
        }
    },
    
    getMyJoinedCommunity: async (req, res) => {
        try {
            let joinData = await Member.find({user: req._id})
            if (joinData) {
                res.status(200).json({
                    status: true, content: {
                        meta: {
                            total: joinData.length,
                            pages: Math.ceil(joinData.length/10),
                            pages: 1
                        },
                        data: joinData
                    }})
            }
        } catch (e) {
            res.status(500).json({status: false, Error: e});
        }
    },
}

module.exports = CommunityService;