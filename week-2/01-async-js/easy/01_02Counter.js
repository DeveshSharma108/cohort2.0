// timer with setInterval function
// let i = 0
// setInterval(()=>{
//     // let i = 0 // mistake
//     console.log(i)
//     i = i + 1
// },1000)

// timer without setInterval function
let j = 0
timer = function(){

    console.log(j)
    j = j + 1
    setTimeout(()=>{timer()},1000)
    // timer()  // why was it wrong??   How javascript code get executed ??
}

timer()