'use strict'

const express = require('express')
const request = require('request-promise-native')
const asyncify = require('express-asyncify')
// const debug = require('debug')('bugverse:web:proxy')
const {endpoint, apiToken} = require('./config')
const api = asyncify(express.Router())

api.get('/agents', async (req, res, next) => {
  const options = {
    method: 'GET',
    url: `${endpoint}/api/agents`,
    headers: {
      'Authorization': `Bearer ${apiToken}`
    },
    mode: 'no-cors',
    json: true
  }
  let result
  try {
    result = await request(options)
  } catch (e) {
    return next(e)
  }
  res.send(result)
})

api.get('/agent/:uuid', async (req, res, next) => {
  const { uuid } = req.params

  const options = {
    method: 'GET',
    url: `${endpoint}/api/agent/${uuid}`,
    headers: {
      'Authorization': `Bearer ${apiToken}`
    },
    json: true
  }
  let result
  try {
    result = await request(options)
  } catch (e) {
    return next(new Error(e.error.error))
  }
  res.send(result)
})

api.get('/metrics/:uuid', async (req, res, next) => {
  const { uuid } = req.params
  const options = {
    method: 'GET',
    url: `${endpoint}/api/metrics/${uuid}`,
    headers: {
      'Authorization': `Bearer ${apiToken}`
    },
    json: true
  }
  let result
  try {
    result = await request(options)
  } catch (e) {
    return next(new Error(e.error.error))
  }
  res.send(result)
})

api.get('/metrics/:uuid/:type', async (req, res, next) => {
  const { uuid, type } = req.params
  const options = {
    method: 'GET',
    url: `${endpoint}/api/metrics/${uuid}/${type}`,
    headers: {
      'Authorization': `Bearer ${apiToken}`
    },
    json: true
  }
  let result
  try {
    result = await request(options)
  } catch (e) {
    return next(new Error(e.error.error))
  }
  res.send(result)
})

module.exports = api
