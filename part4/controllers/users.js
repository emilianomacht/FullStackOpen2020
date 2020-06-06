const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1 ,author: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    const usernameExists = Object.prototype.hasOwnProperty.call(body, 'username')
    const passwordExists = Object.prototype.hasOwnProperty.call(body, 'password')

    if (!usernameExists) {
      throw new Error('Username required')
    } else if (!passwordExists) {
      throw new Error('Password required')
    } else if (body.password.length < 3) {
      throw new Error('Password must be at least 3 characters long')
    } else if (body.username.length < 3) {
      throw new Error('Username must be at least 3 characters long')
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (error) {
    // console.log('error', error)
    response.status(400).json({ error: error.message })
  }

})

module.exports = usersRouter