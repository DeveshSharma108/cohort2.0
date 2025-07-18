async function wait1(t) {
    setTimeout(() => {
        console.log("wait1")
    },t)
}

async function wait2(t) {
    setTimeout(() => {
        console.log("wait2")
    },t)
}

async function wait3(t) {
    setTimeout(() => {
        console.log("wiat3")
    },t)
}

async function calculateTime(t1,t2,t3){
    let start = Date.now()
    await wait1(t1)
    await wait2(t2)
    await wait3(t3)
    console.log(Date.now()-start)
}

calculateTime(3000,2000,1000)



