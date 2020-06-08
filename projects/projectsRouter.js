const express = require('express')
const router = express.Router()
const Projs = require('../data/helpers/projectModel')
//middleware
const validateProj = require('../middleware/validateProj')

router.get('/', (req, res, next) => {
    Projs.get()
    .then(proj => {
        res.status(200).json(proj)
    })
    .catch(next)
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id
    Projs.get(id)
    .then(proj => {
        res.status(200).json(proj)
    })
    .catch(next)
})

router.get('/:id/actions', (req, res, next) => {
    const id = req.params.id
    Projs.get(id)
    .then(proj => {
        if(proj){
            Projs.getProjectActions(id)
            .then(actions => {
                res.status(200).json(actions)
            })
        }
    })
    .catch(next)
})

router.post('/', validateProj(), (req, res, next) => {
    const newProj = req.body
    Projs.insert(newProj)
    .then(proj => {
        res.status(201).json({
            success: `Project '${proj.name}' created`
        })
    })
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
    const id = req.params.id
    Projs.remove(id)
    .then(proj => {
        res.status(200).json({
            success: "Project was deleted"
        })
    })
    .catch(next)
})

router.put('/:id', validateProj(), (req, res, next) => {
    const id = req.params.id
    const editProj = req.body
    Projs.update(id, editProj)
    .then(proj => {
        res.status(200).json(proj)
    })
    .catch(next)
})

module.exports = router;