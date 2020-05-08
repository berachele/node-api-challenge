const express = require('express')
const server = express()
const port = 5000
const projectsRouter = require('./projects/projectsRouter')
const actionsRouter = require('./actions/actionsRouter')

server.use(express.json())

server.get('/', (req, res) => {
    res.json({message: "Successfully compiled!"})
})

server.use('api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)

//error middleware
server.use((err, req, res, next) => {
    console.log({err})
    res.status(500).json({
        error: "There was an error retrieving this data."
    })
})

server.listen(port, () => {
    console.log(`\n Server is Running on http://localhost:${port} \n`)
})