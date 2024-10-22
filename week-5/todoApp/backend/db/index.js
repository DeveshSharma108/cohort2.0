const mongoose = require('mongoose');
DB_NAME = 'ToDoApp'
// Connect to MongoDB
mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);

// Define schemas
const todoSchema = new mongoose.Schema({
    title : String,
    description : String,
    completed : {
        type : Boolean,
        default : false
    }
});

const ToDo = mongoose.model('ToDo', todoSchema);

module.exports = {
    ToDo
}