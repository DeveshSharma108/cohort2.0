// let str1 = "hello     world    my    name   is       raman"
// let str2 = "hello world my name is raman"
// console.log(str1.split(" "))
// console.log(str2.split(" "))


/*
Code:
const fs = require('fs')
let dirtyData = fs.readFile("/home/devesh/Desktop/fsWrite/a.txt",(error,data)=>{

    if (error) {
        console.error("Error!!")
    }
    return data.toString()
})

console.log(dirtyData)

I want to store the dirty data of the file in the dirtyData variable but when I am trying to output its value it is showing undefined instead of the data in the file ??
*/


const fs = require('fs').promises;

async function fileCleaner(path) {
    try {
        let dirtyData = await fs.readFile(path);
        dirtyData = dirtyData.toString()
        cleanData = dirtyData.replaceAll(/\s+/g," ")
        try {
            await fs.writeFile(path,cleanData)
            console.log("Done.........")
        } catch (error) {
            console.error("Error while writing in the file", error);
        throw error;
        }

        
    } catch (error) {
        console.error("Error while reading the file", error);
        throw error;
    }
}


fileCleaner('/home/devesh/Desktop/fsWrite/a.txt')

