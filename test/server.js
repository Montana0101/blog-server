/**
 * @description jest server
 * @author montana
 */

const request = require('supertest')
const server = require('../src/app').callback()

module.exports = request(server)
