const express = require('express')
const hbs = require('express-handlebars')

const server = express()
const routes = require('./Routes')

server.use(express.static('public'))
server.use(express.urlencoded({extended: false}))


server.engine('hbs', hbs({extname: 'hbs'}))
server.set('view engine', 'hbs')


server.use('/', routes)
module.exports = server