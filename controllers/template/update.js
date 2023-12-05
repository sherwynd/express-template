async function update(req, res){
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
}

module.exports = update