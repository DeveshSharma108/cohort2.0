const fs = require('fs')
fs.readFile('/home/devesh/Desktop/shell-lesson-data/exercise-data/animal-counts/final.txt',(error,data)=>{

    if (error) {
        console.error("Error!!")
    }

    //console.log(data)
    console.log(data.toString())
})


for (let i = 0; i < 1000; i++) {
    console.log("Very Expensive Operation")
}