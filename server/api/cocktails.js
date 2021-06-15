const router = require('express').Router()
const { models: { Cocktail }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    // const api_url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail'
    // const fetch_res = await fetch(api_url)
    // const json = await fetch_res.json()
    // res.json(json)
    const cocktails = await Cocktail.findAll()
    res.json(cocktails)
  } catch (err) {
    next(err)
  }
})
