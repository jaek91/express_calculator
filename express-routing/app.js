const express = require('express')
const {CalculateMean, CalculateMedian, CalculateMode, IsValidNums} = require('./calculations')
const app = express();
const ExpressError = require('./expressError');

app.use(express.json());

//route for returning the mean of a comma separated values 
app.get('/mean', (req,res, next) =>{
    if (!req.query.nums) {
        throw new ExpressError("nums are required to calculate the mean!", 400) 
    }
    let nums = req.query.nums;
    let validNumsorNot = IsValidNums(nums);

    if (validNumsorNot instanceof Error) {
        throw new ExpressError(validNumsorNot.message);
    }
    
    let result = {
        operation: "mean",
        result: CalculateMean(validNumsorNot)
    }
    
    return res.send(result);
}
)

app.get('/median', (req,res, next) =>{
    if (!req.query.nums) {
        throw new ExpressError("nums are required to calculate the median!", 400) 
    }

    let nums = req.query.nums;
    let validNumsorNot = IsValidNums(nums);
    if (validNumsorNot instanceof Error) {
        throw new ExpressError(validNumsorNot.message);
    }

    let result = {
        operation: "median",
        result: CalculateMedian(validNumsorNot)
    }

    return res.send(result)
    
})

app.get('/mode', (req,res, next) =>{
    if (!req.query.nums) {
        throw new ExpressError("nums are required to calculate the mode!", 400) 
    }

    let nums = req.query.nums;
    let validNumsorNot = IsValidNums(nums);
    if (validNumsorNot instanceof Error) {
        throw new ExpressError(validNumsorNot.message);
    }

    let result = {
        operation: "mode",
        result: CalculateMode(validNumsorNot)
    }

    return res.send(result)
})

//general error handlers

app.use(function (req, res, next) {
    const err = new ExpressError("Not Found",404);
  
    // pass the error to the next piece of middleware
    return next(err);
  });

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
  
    return res.json({
      error: err,
      message: err.message
    });
});







app.listen(3000, () => {console.log('App on Port 3000')})