const express = require('express')
server = express()

module.exports = () => {
    return(req, res, next) => {
        const post = req.body
        if(!post.name || !post.description){
            res.status(400).json({
                message: "Missing required name or description field."
            })
        } else {
            next()
        }
    }
}