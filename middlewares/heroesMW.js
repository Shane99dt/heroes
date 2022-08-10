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

module.exports = {verifyHero}