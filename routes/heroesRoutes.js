const express = require('express')
const app = express()
const heroes = require('../heroes')
const { verifyHero, verifyPower, checkIfHeroExists, verifyHeroEdit } = require('../middlewares/heroesMW')


app.get('/', (req, res) => {
  res.json(heroes)
})

app.get('/:slug', verifyHero, (req, res) => {
  res.json(req.hero)
})


app.get('/:slug/powers', verifyHero, (req, res) => {
  res.json(req.hero.power)
})


// post
app.post('/',verifyHeroEdit, checkIfHeroExists, (req, res) => {

  const hero = {
    ...req.body,
    slug: req.body.name.toLowerCase().replaceAll(' ', '-')
  }

  heroes.push(hero)
  res.status(201).json(hero)

})

// Put
app.put('/:slug/powers', verifyHero, (req, res) => {
  const {newPower} = req.body
  const {power} = req.hero

  const existingPower = power.find(item => {
    return item === newPower
  })

  if(!existingPower){
    power.push(newPower)
    res.status(201).json(power)
  }else{
    res.status(409).json('Power already exists')
  }
})

// put edit hero
app.put('/:slug', verifyHero, (req, res) =>{

  const sluglow = req.body.name.toLowerCase().replaceAll(' ', '-')

  const editedHero = {
    ...req.hero,
    ...req.body,
    slug : sluglow
  }

  heroes[req.heroIndex] = editedHero
  res.status(201).json(`${editedHero.name} edited successfully`)
})


// delete
// delete hero
app.delete('/:slug', verifyHero, (req, res) => {

  heroes.splice(req.heroIndex, 1)
  res.json(`${req.hero.name} has been deleted`).status(204)
})

// delete a power
app.delete('/:slug/power/:power', verifyHero, verifyPower, (req, res) => {
  const {power, name} = req.hero
  power.splice(req.powerIndex, 1)
  res.json(`The power ${req.params.power} has been successfully erased from ${name}`)
})









module.exports = app