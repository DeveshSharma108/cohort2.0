const zod = require('zod')
// look at the index js code to know how to use these error messages
const validateToDo = zod.object({
    title : zod.string().min(1,{message : 'Empty title not allowed'}),
    description : zod.string().min(1,{message : 'Empty description not allowed'})
})

const validateId = zod.object({
    id : zod.string()
})

module.exports = {validateToDo,validateId}