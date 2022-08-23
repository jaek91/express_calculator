const {
    CalculateMean,
    CalculateMedian,
    CalculateMode,
} = require("./calculations");

describe("CalculateMean tests", function(){
  test("We find the mean of four numbers", 
  function() {expect(CalculateMean("1,2,3,4")).toEqual(2.5)})   
  test("We find the mean of empty string which gets parsed into an empty array", 
  function() {expect(CalculateMean(" ")).toEqual(0)})  
})

describe("CalculateMedian tests", function(){
    test("We find the median of five numbers (an odd set)", 
    function() {expect(CalculateMedian("1,2,3,4,5")).toEqual(3)}) 
    test("We find the median of six numbers (an even set)", 
    function() {expect(CalculateMedian("1,2,3,4,5,6")).toEqual(3.5)})
})

describe("CalculateMode tests", function(){
    test("We find the mode of five numbers", 
    function() {expect(CalculateMode("1,2,2,4,5")).toEqual(2)}) 
    test("We find the mode of seven numbers", 
    function() {expect(CalculateMode("1,1,1,4,5,6,7")).toEqual(1)})
})