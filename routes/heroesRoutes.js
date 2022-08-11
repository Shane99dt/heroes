const express = require('express')
const app = express()
const heroes = require('../heroes')
const { verifyHero, verifyPower } = require('../middlewares/heroesMW')


app.get('/', (req, res) => {
  res.json(heroes)
})

app.get('/:slug', verifyHero, (req, res) => {

  const {slug} = req.params

  const findHero = heroes.find(hero => {
    return hero.slug === slug
  })

  res.json(findHero)
})


app.get('/:slug/powers', verifyHero, (req, res) => {
  const {slug} = req.params

  const findHero = heroes.find(hero => {
    return hero.slug === slug
  })

  res.json(findHero.power)
})


// post
app.post('/', (req, res) => {

  const {slug, name, power, color, isAlive, age, image} = req.body

  const hero = {
    slug : slug,
    name : name,
    power: power,
    color: color,
    isAlive: isAlive,
    age: age,
    image: image
  }

  const existingHero = heroes.find(hero => {
    return hero.slug === slug
  })

  if(!existingHero){
    heroes.push(hero)
    res.status(201).json(hero)
  }else{
    res.status(409).json('Hero already exists')
  }
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
  const {editedHero} = req.body
  heroes[req.heroIndex] = editedHero
  res.status(201).json(`${editedHero.name} edited successfully`)
})


// delete
// delete hero
app.delete('/:slug', verifyHero, (req, res) => {

  heroes.splice(req.heroIndex, 1)
  res.json(`${req.hero.name} has been deleted`)
})

// delete a power
app.delete('/:slug/power/:power', verifyHero, verifyPower, (req, res) => {
  const {power, name} = req.hero
  power.splice(req.powerIndex, 1)
  res.json(`The power ${req.params.power} has been successfully erased from ${name}`)
})









module.exports = app