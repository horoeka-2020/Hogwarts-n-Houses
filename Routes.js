const fs = require('fs')
const path = require('path')

const express = require('express')
const router = express.Router()

router.use(express.urlencoded({ extended: false }))

const filePath = path.join(__dirname, 'names.json')

module.exports = router

router.get('/', (req, res) => {
    // fs.readFile(filePath, 'utf8', (err, contents) => {
    //     if (err) return res.sendStatus(500)
    //     const names = JSON.parse(contents)
    //     const viewHouses = {
    //         houses: names.houses
    //     }
    // })
    res.render('home')
})
router.get('/:id', (req, res) => {
    const houseId = Number(req.params.id)
    //   console.log(houseId)
    fs.readFile(filePath, 'utf8', (err, contents) => {

        if (err) return res.sendStatus(500)

        const names = JSON.parse(contents)
        const houseNames = names.Houses.find(({ id }) => id === houseId)
        // console.log(houseNames)
        const viewHouse = {

            id: houseNames.id,
            image: houseNames.image
        }
        res.render('houses', viewHouse)
    })

})



router.post('/:id', (req, res) => {
    const addName = req.body.name
    console.log(req.body.name)
    const houseId = Number(req.params.id)
    fs.readFile(filePath, 'utf8', (err, contents) => {
        if (err) return res.sendStatus(500)
        const moreNames = JSON.parse(contents)
        const houseNames = moreNames.Houses.find(({ id }) => id === houseId)
        houseNames.name.push(addName)

        const newContents = JSON.stringify(moreNames, null, 2)
        fs.writeFile(filePath, newContents, 'utf8', (err) => {
            if (err) return res.sendStatus(500)
            res.redirect('/display/display')
        })
    })
})
router.get('/display/display', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, contents) => {
        if (err) return res.sendStatus(500)
        const data = JSON.parse(contents)


        // const viewHouse = {
        //     name: houseNames.name

        // }
        res.render('display')
    })

})
