const fs = require('fs')
fs.writeFile('/home/devesh/Desktop/fsWrite/a.txt','chello',(err)=>{
    if(err){
        console.error("Error")
        return  
    }
    console.log("Done")
})

for (let i = 0; i < 1000; i++) {
    console.log("Very Expensive Operation")
}