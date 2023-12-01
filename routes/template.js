const express = require('express')
const router = express.Router()
const Template = require('../models/template')

//Get ALL
router.get('/', async (req, res) => {
    try{
        const template = await Template.find()
        res.json(template)
    } catch (err){
        res.status(500).json({ message: err.message })
    }
})

//Get ids
router.get('/:id', getTemplate, (req, res) => {
    res.send(res.template)
})

//Create
router.post('/', async (req, res) => {
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
})

//Patch
router.patch('/:id', getTemplate, async (req, res) => {
    if(req.body.name != null){
        res.template.name = req.body.name
    }
    if(req.body.age != null){
        res.template.age = req.body.age
    }
    try {
        const updatedTemplate = await res.template.save()
        res.json(updatedTemplate)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//Delete
router.delete('/:id', getTemplate, async (req, res) => {
    try{  
        await res.template.deleteOne()
        res.json({ message: 'Deleted successfully' })
    } catch (err){
        res.status(500).json({ message: err.message })
    }
})

async function getTemplate(req, res, next) {
    let template
    try {   
        template = await Template.findById(req.params.id)
        if (template == null) {
            return res.status(404).json({ message: 'Cannot find template' })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
    
    res.template = template
    next()
}
module.exports = router