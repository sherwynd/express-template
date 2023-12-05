async function remove(req, res){
    try{  
        await res.template.deleteOne()
        res.json({ message: 'Deleted successfully' })
    } catch (err){
        res.status(500).json({ message: err.message })
    }
}

module.exports = remove