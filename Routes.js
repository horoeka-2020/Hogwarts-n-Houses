const fs = require('fs')
const path = require('path')

const express = require('express')
const router = express.Router()

router.use(express.urlencoded({extended: false}))

const filePath = path.join(__dirname, 'names.json')

module.exports = router

router.get('/', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, contents) => {
        if (err) return res.sendStatus(500)
        const names = JSON.parse(contents)
        const viewHouses = {
            houses: names.houses
        }
    })
    res.render('home')
  })
