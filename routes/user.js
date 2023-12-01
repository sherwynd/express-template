const express = require('express')
const router = express.Router()
const User = require('../models/user')

//Get ALL
router.get('/', async (req, res) => {
    try{
        const user = await Template.find()
        res.json(user)
    } catch (err){
        res.status(500).json({ message: err.message })
    }
})

//Get ids
router.get('/:id', getTemplate, (req, res) => {
    res.send(res.user)
})

//Create
router.post('/', async (req, res) => {
    const user = new Template({
        // name:req.body.name,
        // age:req.body.age,
    })
    try{
        const newTemplate = await user.save()
        res.status(201).json(newTemplate)
    } catch (err){
        res.status(400).json({ message: err.message })
    }
})

//Patch
router.patch('/:id', getTemplate, async (req, res) => {
    // if(req.body.name != null){
    //     res.user.name = req.body.name
    // }
    // if(req.body.age != null){
    //     res.user.age = req.body.age
    // }
    try {
        const updatedTemplate = await res.user.save()
        res.json(updatedTemplate)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//Delete
router.delete('/:id', getTemplate, async (req, res) => {
    try{  
        await res.user.deleteOne()
        res.json({ message: 'Deleted successfully' })
    } catch (err){
        res.status(500).json({ message: err.message })
    }
})

async function getTemplate(req, res, next) {
    let user
    try {   
        user = await Template.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
    
    res.user = user
    next()
}
module.exports = router