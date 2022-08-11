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

module.exports = {verifyHero, verifyPower}