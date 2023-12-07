const express = require('express')
const router = express.Router()
const {registrarUser,loginUser,misDatos} = require('../controllers/usersController')
const {protect} = require('../middleware/authMiddleware')

// publico
router.post('/', registrarUser)
router.post('/login', loginUser)

//privado
router.get('/data', protect, misDatos)


module.exports = router
