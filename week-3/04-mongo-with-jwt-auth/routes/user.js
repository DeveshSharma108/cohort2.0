const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { Course,User } = require("../db/index");
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET
// User Routes
router.post('/signup', async (req, res) => {
    // object destructuring
    // getting the details of new User from the request body
    const {username,password} = req.body
    // creating a new User document
    const newUser = new User({username,password})
    // saving the document in the database's collection
    await newUser.save()
    res.json({ message: 'User created successfully' })
});

// sign a user and return the token
router.post('/signin', async (req, res) => {
    // object destructuring
    // getting the details of new admin from the request body
    const {username,password} = req.body
    // find if a admin with same username and password exists in our database
    const user = await User.findOne({username,password})

    if (user){
        const token = jwt.sign({username},secret)
        res.status(200).json({token})
    }else{
        res.send('Invalid details!')
    }
 
});

router.get('/courses', async(req, res) => {
    // find method returns an array
    // const courses = await new Course.find()   // XXX why you are using new ?? we are not creating a document
    const courses = await Course.find()
    if(!courses){
        res.json({courses:[]})
    }else{
        res.json({courses})
    }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {

    const user = await User.findOne({username:req.username})
    const id = req.params.courseId
    // finding the course for the given id
    const course = await Course.findOne({_id:id})
    // push the course id to user's purchased course array
    user.purchasedCourses.push(course._id)
    // do not forget to save updated user 🫤🫤🫤
    await user.save()
    res.json({ message: 'Course purchased successfully' })
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {

    const user = await User.findOne({username:req.username}).populate('purchasedCourses')
    res.json({courses:user.purchasedCourses})
});

module.exports = router