const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const jwt = require('jsonwebtoken')
// importing the Admin and Course model 
const {Admin,Course} = require('../db/index')
const secret = process.env.JWT_SECRET

// Admin Routes
// making the route handler/ anonymous function async because we are saving data in database 
router.post('/signup', async (req, res) => {
    // object destructuring
    // getting the details of new admin from the request body
    const {username,password} = req.body
    // creating a new Admin document
    const newAdmin = new Admin({username,password})
    // saving the document in the database's collection
    await newAdmin.save()
    res.json({ message: 'Admin created successfully' })
});

// sign a admin and return the token
router.post('/signin', async (req, res) => {
    // object destructuring
    // getting the details of new admin from the request body
    const {username,password} = req.body
    // find if a admin with same username and password exists in our database
    const admin = await Admin.findOne({username,password})

    if (admin){
        const token = jwt.sign({username},secret)
        res.status(200).json({token})
    }else{
        res.send('Invalid details!')
    }
 
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // getting the details of course from the request body
    const course = {...req.body}
    // creating a new Course document
    const newCourse = new Course(course)
    // finding the admin with the username and password provided
    const admin = await Admin.findOne({username:req.username})
    // now push the course reference id to the array of courses of the admin found
    admin.createdCourses.push(newCourse._id)
    // save the updated admin document
    await admin.save()
    // also save the course in course collection
    await newCourse.save()
    res.json({ message: 'Course created successfully', courseId: course._id })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // finding the admin with the username and password provided
    // const admin = await Admin.findOne({username:req.headers.username,password:req.headers.password})
    // const allCourses = admin.createdCourses
    // res.json({courses:allCourses})

    const admin = await Admin.findOne({username:req.username}).populate('createdCourses')
    res.json({courses:admin.createdCourses})

});

module.exports = router;