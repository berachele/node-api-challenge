const express = require('express')
const router = express.Router()
const Acts = require('../data/helpers/actionModel')
//middleware
const validateAction = require('../middleware/validateAction')


router.get('/', (req, res, next) => {
    Acts.get()
    .then(act => {
        res.status(200).json(act)
    })
    .catch(next)
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id
    Acts.get(id)
    .then(act => {
        res.status(200).json(act)
    })
    .catch(next)
})

router.post('/', validateAction(), (req, res, next) => {
    const newAct = req.body
    Acts.insert(newAct)
    .then(act => {
        res.status(201).json({
            success: `Action '${act.description}' created`
        })
    })
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
    const id = req.params.id
    Acts.remove(id)
    .then(act => {
        res.status(200).json({
            success: "Action was deleted"
        })
    })
    .catch(next)
})

router.put('/:id', validateAction(), (req, res, next) => {
    const id = req.params.id
    const editAct = req.body
    Acts.update(id, editAct)
    .then(act => {
        res.status(200).json(act)
    })
    .catch(next)
})

module.exports = router;
