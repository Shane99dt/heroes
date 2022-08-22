const heroes = require('../heroes')

const verifyHero = (req, res, next) => {
  const {slug} = req.params
  const hero = heroes.find(hero => {
    return hero.slug === slug
  })

  const heroIndex = heroes.findIndex(hero => {
    return hero.slug === slug
  })

  if(!hero){
    res.status(404).json('Hero not found!')
  }else{
    req.hero = hero
    req.heroIndex = heroIndex
    next()
  }
}

const checkIfHeroExists = (req, res, next) => {
  const bodySlug = req.body.name.toLowerCase().replaceAll(' ', '-')
  const hero = heroes.find(hero => {
    return hero.slug === bodySlug
  })

  if(!hero){
    next()
  }else{
    res.status(409).json('Hero already exists')
  }
}

const verifyHeroEdit = (req, res, next) => {

  const bodyKeys = Object.keys(req.body)
  const modelKeys = Object.keys(heroes[0])
  modelKeys.shift()
  const wrongKey = bodyKeys.find(key => {
    return !modelKeys.includes(key)
  })

  if( wrongKey || bodyKeys.length !== modelKeys.length){
    res.status(400).json('Bad request')
  }else{
    next()
  }
}

const verifyPower = (req, res, next) => {
  const {slug, power} = req.params
  const hero = heroes.find(hero => {
    return hero.slug === slug
  })

  const choosenPower = hero.power.find(item => {
    return item === power
  })

  const powerIndex = hero.power.findIndex(item => {
    return item === power
  })

  if(!choosenPower){
    res.status(404).json('Not Found!')
  }else{
    req.choosenPower = choosenPower
    req.powerIndex = powerIndex
    next()
  }
}

module.exports = {verifyHero, verifyPower, checkIfHeroExists, verifyHeroEdit}