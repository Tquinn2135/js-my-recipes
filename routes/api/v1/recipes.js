
const {response} = require('express')

const router = require('express').Router()
const recipes = require('../../../data/recipes.json')

router.get('/', (req, res = response) => {
     const description = recipes.map( recipe => {
          const { id, title, image, prepTime,difficulty } = recipe
          return { id, title, image, prepTime,difficulty }
     })
     res.send(description)
})

router.get('/recipe/:id', (req, res = response) => {
     const { id } = req.params
     const found = recipes.find(recipe => recipe.id.toString() === id)
     if(found) return res.send(found)

     res.status(400).send({error: `couldn't find recipe ${recipes}`})
})

router.post('/recipe/add', (req,res) => {
     const id = recipes.length + 1
     const recipe = req.body
     const newRecipe = {id, ...recipe}
     recipes.push(newRecipe)
     res.send(newRecipe)
})

module.exports = router