'use strict'

const express = require('express')
const request = require('request')
const asycnify = require('express-asyncify')

const {endpoint, apiToken} = require('./config')
const api = asycnify(express.Router())

api.get('/agents', async (req, res, next) => {
  const options = {
    method: 'GET',
    url: `${endpoint}/api/agents`,
    headers: {
      'Authorization': `Bearer ${apiToken}`
    },
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

// api.get('/agent/:uuid', (req, res) = {})

// api.get('/metrics/:uuid', (req, res) = {})

// api.get('/metrics/:uuid/:type', (req, res) = {})

module.exports = api
