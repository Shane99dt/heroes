const express = require('express')
const app = express()
const heroes = require('../heroes')
const { verifyHero } = require('../middlewares/heroesMW')


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
    power: [power],
    color: color,
    isAlive: isAlive,
    age: age,
    image: image
  }

  const existingHero = heroes.find(hero => {
    return hero.slug === req.params.slug
  })

  if(!existingHero){
    heroes.push(hero)

    res.status(201).json(hero)
  }else{
    res.status(409).json('Hero already exists')
  }
})







module.exports = app