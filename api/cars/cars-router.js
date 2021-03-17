// DO YOUR MAGIC
const express = require('express')
const router = express.Router()
const Cars = require('./cars-model')
const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require('./cars-middleware')

router.get('/' , async (req, res, next) => {
    try{
        const data = await Cars.getAll()
        res.json(data)
    } catch (err){
        next(err)
    }
})

router.get('/:id', checkCarId, async(req, res, next) => {
    try{
        const car = await Cars.getById(req.params.id)
        res.status(200).json(car);
    } catch (err){
        next(err)
    }
})

router.post('/', checkCarPayload, checkVinNumberUnique, checkVinNumberValid, async(req, res, next) =>{
    try{
        const data = await Cars.create(req.body)
        res.json(data)
    } catch (err){
        next()
    }
})

module.exports = router;