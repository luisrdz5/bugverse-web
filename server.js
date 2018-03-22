'use strict'

const debug = require('debug')('bugverse:web')
const http = require('http')
const express = require('express')
const chalk = require('chalk')
const path = require('path')
const socketio = require('socket.io')
const BugverseAgent = require('bugverse-agent')
const proxy = require('proxy')
const asycnify = require('express-asyncify')

const port = process.env.PORT || 8080
const app = asycnify(express())
const server = http.createServer(app)
const io = socketio(server)

const agent = new BugverseAgent()
const { pipe } = require('./utils')

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', proxy)

// Socket.io  /Websockets
io.on('connect', socket => {
  debug(`Connected ${socket.id}`)

  pipe(agent, socket)
})

// Express Error handler
app.use((err, req, res, next) => {
  debug(`Error: ${err.message}`)

  if (err.message.match(/not found/)) {
    return res.status(404).send({error: err.message})
  }
  res.status(500).send({ error: err.message })
})
function handleFatalError (err) {
  console.error(`${chalk.red('[Fatal Error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

process.on('uncaughtException', handleFatalError)
process.on('unhandleFatalError', handleFatalError)

server.listen(port, () => {
  console.log(`${chalk.green('[bugverse-web]')} server listenning on port ${port}`)
  agent.connect()
})
