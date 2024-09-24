/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module
  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files
  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt
    - For any other route not defined in the server return 404
    Testing the server - run `npm run test-fileServer` command in terminal
 */
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000

// filesDir store the path as a path object we can convert it into string by path.format() whenever needed
const filesDirPathObj = path.parse('/home/devesh/Desktop/assignments-master/week-2/02-nodejs/files')
//console.log(path.format(filesDirPathObj))
//console.log(filesDirPathObj)

// console.log(__dirname) gives current directory name this can be used in alternative method that will use path.join but now I am using path.parse and path.format

const pathStr = path.format(filesDirPathObj)
app.get('/files',(req,res)=>{
  fs.readdir(pathStr,(err,files)=>{
    if(err){
      res.status(500).send("Can not read files please try again later")
    }else{
      res.status(200).json(files)
    }
  })
})

app.get('/file/:filename',(req,res)=>{

  fs.readdir(pathStr,(err,files)=>{
    if(err){
      res.status(500).send("Can not read files please try again later")
    }else{
      let index = files.findIndex((file)=>file === req.params.filename)
      if (index !== -1){
        fs.readFile(pathStr+'/'+req.params.filename,'utf-8',(err,data)=>{
          if (err) {
            console.log(err)
            res.status(501).send("Issue while reading file please try again later")
          }else{
            res.status(200).send(data)
          }
        })
      }else{
        res.status(404).send('File not found')
      }
    }
  })

})

app.use((req,res)=>res.status(404).send("Route not found"))

if (require.main === module) {
  app.listen(port,()=>console.log("Server Running........"))
}

module.exports = app;