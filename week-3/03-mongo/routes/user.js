const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { Course,User } = require("../db/index");

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
    // finding and storing the document having username and password same as given
    // same mistake as above
    // const user = await new User.findOne({username:req.headers.username,password:req.headers.password})
    const user = await User.findOne({username:req.headers.username,password:req.headers.password})
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
    // finding and storing the document having username and password same as given
    // const user = await User.findOne({username:req.headers.username,password:req.headers.password})
    //const purchasedCourses = user.purchasedCourses   // this will only return the id of purchased courses we want actual data for that we will have to use populate method
    // no need to check if array is empty or not becaue if array is empty it will not get populated by actual data and will remain [] if it has id's then it will get populated by actual courses
    // if(!purchasedCourses){
    //     res.json({courses:[]})
    // }else{
    //     res.json({purchasedCourses})
    // }

    // the above approach is suitable only if we needed the id's 
    const user = await User.findOne({username:req.headers.username,password:req.headers.password}).populate('purchasedCourses')
    res.json({courses:user.purchasedCourses})
});

module.exports = router