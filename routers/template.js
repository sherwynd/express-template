const express = require('express')
const router = express.Router()
const Template = require('../models/template')

//Controller
const templateController = require('../controllers/template')


router.get('/', templateController.getAll) //Get ALL
router.get('/:id', getTemplate, templateController.getId) //Get ids
router.post('/', templateController.create) //Create
router.patch('/:id', getTemplate, templateController.update) //Patch
router.delete('/:id', getTemplate, templateController.delete) //Delete

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