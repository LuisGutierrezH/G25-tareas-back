const asyncHandler = require('express-async-handler')
const Tarea = require('../model/tareasModel')

const getTareas = asyncHandler(async (req, res) => {
    const tareas = await Tarea.find({user: req.user.id})
    res.status(200).json(tareas)
})

const setTareas= asyncHandler(async (req, res) => {
    if(!req.body.texto) {
        res.status(400)
        throw new Error("Por favor teclea uan descripcion")

    }
    const tarea = await Tarea.create({
        texto: req.body.texto, 
        user: req.user.id

    })
    res.status(201).json({ tarea })
})

const updateTareas = asyncHandler(async (req, res) => {
    const tarea = await Tarea.findbyId(req.params.id)
    if(!tarea) {
    res.status(400)
    throw new Error('La tarea no fue encontrada')
    }
    if (tarea.user.ToString() !== req.user.id) {
res.status(401)
throw new Error('Acceso no auth')
    } else {
        const tareaUpdated = await Tarea.findbyIdAndUpdate(req.params.id, req.body, {new: true})

        res.status(200).json(tareaUpdated)

    }
   
})

const deleteTareas = asyncHandler(async (req, res) => {
    const tarea = await Tarea.findbyId(req.params.id)
    if(!tarea) {
    res.status(400)
    throw new Error('La tarea no fue encontrada')
    }
    if (tarea.user.ToString() !== req.user.id) {
        res.status(401)
        throw new Error('Acceso no auth')
            } else {
                await Tarea.deleteOne(tarea)
                //await Tarea.findbyIdAndDelete(req.params.id)
                res.status(200).json({ id: req.params.id})
        
            }
   
})

module.exports = {
    getTareas,
    setTareas,
    updateTareas,
    deleteTareas
}
