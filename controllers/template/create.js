const Template = require('../../models/template')

async function createOne(req, res){
    const template = new Template({
        name:req.body.name,
        age:req.body.age,
    })
    try{
        const newTemplate = await template.save()
        res.status(201).json(newTemplate)
    } catch (err){
        res.status(400).json({ message: err.message })
    }
}

module.exports = createOne