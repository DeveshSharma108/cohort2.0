const mongoose = require('mongoose');
DB_NAME = 'CourseAppWithJWT'
// Connect to MongoDB
mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);

// Define schemas
const AdminSchema = new mongoose.Schema({
    username : String,
    password : String,
    createdCourses : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Course'
    }]
});

const UserSchema = new mongoose.Schema({
    username : String,
    password : String,
    purchasedCourses : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Course'
    }]
});

const CourseSchema = new mongoose.Schema({
    title : String,
    description : String,
    price : Number,
    imageLink : String,
    published : { type: Boolean, default: false}
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}