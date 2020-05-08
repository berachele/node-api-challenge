const express = require('express')
server = express()

module.exports = () => {
    return(req, res, next) => {
        const post = req.body
        if(post.description.length > 128){
            req.status(400).json({
                error: "Description must be no longer than 128 characters"
            })
        }else if(!post.description || !post.notes){
            req.status(400).json({
                message: "Missing required description and/or notes field"
            })
        }else{
            next()
        }
    }
}