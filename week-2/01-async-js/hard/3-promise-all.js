/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Return a promise.all which return the time in milliseconds it takes to complete the entire operation.
 */

function wait1(t) {
    return new Promise(function (resolve){
        setTimeout(() => {
            resolve()
        }, t);
    })

}

function wait2(t) {
    return new Promise(function (resolve){
        setTimeout(() => {
            resolve()
        }, t);
    })
}

function wait3(t) {
    return new Promise(function (resolve){
        setTimeout(() => {
            resolve()
        }, t);
    })
}

async function calculateTime(t1, t2, t3) {
    let start = Date.now()
    await Promise.all([wait1(t1*1000),wait2(t2*1000),wait3(t3*1000)])
    return new Promise(function(resolve){
        resolve((Date.now()-start))
    })
}

// what was the silly mistake that you were doing ??
module.exports = calculateTime;