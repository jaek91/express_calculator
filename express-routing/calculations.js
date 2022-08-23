//given an array of numbers, this function calculates the mean

function CalculateMean(str) {
    let nums = str.split(',').map(Number)
    let numCount = nums.length;
    let sum = 0;

    for (let i in nums) {
        sum += nums[i] 
    }

    let mean = sum / numCount
    return mean
}

function CalculateMedian(str) {
    let nums = str.split(',').map(Number)
    nums = nums.sort(function(a,b) {
        return a - b})

    let numsCount = nums.length;
    //treat odd length arrays
    if (numsCount % 2 == 1) { 
        return nums[Math.floor(numsCount / 2)]
    }

    else {
        //our nums array has an even number of numbers
        return (nums[numsCount / 2] + nums[(numsCount / 2) - 1]) / 2;
    }
}

function CalculateMode(str) {
    let nums = str.split(',').map(Number)
    let obj = {};
    let topFreq = 0;
    let mode;

    nums.forEach((num) => {
        obj[num] = (obj[num] || 0 ) + 1;

        if (topFreq < obj[num]) {
            topFreq = obj[num];
            mode = num;
        }
    })
    return mode;
}

function IsValidNums(str) {
    let arr = str.split(',').map(Number)
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        let parsedNum = arr[i];
        if (Number.isNaN(parsedNum)) {
           return new Error(`The value ${result} of the nums array at the ${i}th index is not a valid number`);
        }
        result.push(parsedNum)
    }
    return result
}


module.exports = {CalculateMean, CalculateMedian, CalculateMode, IsValidNums}