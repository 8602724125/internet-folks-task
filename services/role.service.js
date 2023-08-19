const { validationResult } = require("express-validator");
const Role = require('../models/role.model')

let no_of_documents = 10;

const RoleService = {
    
    getAll: async (req, res) => {
        try {
            let count = await Role.countDocuments();
            let roleData = await Role.find({}).limit(10);
            res.status(200).json({
                status: true, content: {
                    meta: {
                        total: count,
                        pages: Math.ceil(count/10),
                        page: 1
                    },
                    data: roleData
                }})
        } catch (e) {
            res.status(200).json({status: false, Error: e})
        }
    },

    getNextRecords: async (req, res) => {
        const pageNo = req.params.pageNo;
		const skipCount = (pageNo - 1) * no_of_documents;

        try {
            let count = await Role.countDocuments();
            let roleData = await Role.find({}).skip(skipCount).limit(no_of_documents);
            res.status(200).json({
                status: true, content: {
                    meta: {
                        total: count,
                        pages: Math.ceil(count/10),
                        pages: pageNo
                    },
                    data: roleData
                }})
        } catch (e) {
            res.status(200).json({status: false, Error: e})
        }
    },

    create: async (req, res) => {
        const errors = validationResult(req);
        const createRole = req.body;
        if (!errors.isEmpty()) {
            res.status(500).json({status: false, Error: errors});
        } else {
            try {
                const newRole = new Role({
                    name: createRole.name
                })
                let savedRole = await newRole.save();
                if (savedRole) {
                    res.status(200).json({status: true, content: {data: savedRole}})
                }
            } catch (e) {
                res.status(500).json({status: false, Error: e});
            }
        }
    }
}

module.exports = RoleService;