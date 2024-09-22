// setInterval(()=>{
//     let a = new Date()
//     console.log(`${a.getHours()}:${a.getMinutes()}:${a.getSeconds()}`);
// },1000)

setInterval(()=>{
    let a = new Date()
    let hours = a.getHours()
    let minutes = a.getMinutes()
    let seconds = a.getSeconds()
    let meridian = 'AM'

    meridian = (hours>12)? 'PM' : "AM"
    hours = (hours>12)? hours%12 : hours
    
    console.log(`${hours}:${minutes}:${seconds}  ${meridian}`)
},1000)
