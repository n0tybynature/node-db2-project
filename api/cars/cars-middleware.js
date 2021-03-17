const Cars = require('./cars-model');
const vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const checkCar = await Cars.getById(req.params.id)
    checkCar ? next () : res.status(400).json({message: `car with id ${req.params.id} is not found` })
  } catch (err) {
    next(err)
  }
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  try{
    !req.body.vin || !req.body.make || !req.body.model || !req.body.mileage ?
    res.status(400).json({message: `VIN, make, model, and mileage is missing`})
  }

}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
    const validateVin = vinValidator.validate(req.body.vin);
    if(validateVin){
      next()
    } else {
      res.status(400),json({ message: `vin ${req.body.vin} is invalid` })
    }
}

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const cars = await Cars.getAll();
    const carVin = req.body.vin.trim();

    const results = cars.filter( car => {
      return car === carVin
    })

    results.length > 0 ? res.status(400).json({ message: `vin ${req.body.vin} already exists` }) : next()
  } catch (err) {
    next(err)
  }
}
