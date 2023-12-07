const express = require('express')
const router = express.Router()
const { getTareas, setTareas, updateTareas, deleteTareas } = require('../controllers/tareasController')
const{protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getTareas).post(protect, setTareas)
//router.get('/', getTareas)
//router.post('/', setTareas)

//router.route('/:id').delete(deleteTareas).put(updateTareas)
router.put('/:id', protect, updateTareas)
router.delete('/:id', protect, deleteTareas)

module.exports = router
