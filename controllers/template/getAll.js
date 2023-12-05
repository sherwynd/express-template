const Template = require('../../models/template')

async function getAllList(req, res){
    try{
        const template = await Template.find()
        res.json(template)
    } catch (err){
        res.status(500).json({ message: err.message })
    }
}

module.exports = getAllList