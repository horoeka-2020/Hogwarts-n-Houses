const express = require('express')
const hbs = require('express-handlebars')

const server = express()

server.use(express.static('public'))
server.use(express.urlencoded({extended: false}))

server.engine('hbs', hbs({extname: 'hbs'}))
server.set('view engin', 'hbs')

module.exports = server