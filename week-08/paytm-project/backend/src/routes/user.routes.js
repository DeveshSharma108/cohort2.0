import { Router} from "express";
import { z } from "zod";
import { User } from "../models/user.model.js";
import { Account } from "../models/accounts.model.js"
import jwt from 'jsonwebtoken'
import authMiddleware from '../middleware/user.middleware.js'
const userRouter = Router()

const signupSchema = z.object({
    username: z.string()
        .email({ message: "Invalid email format" })
        .max(30, { message: "Username cannot exceed 30 characters" }),

    firstname: z.string()
        .trim()
        .min(1, { message: "First name is required" })
        .max(15, { message: "First name cannot exceed 15 characters" }),

    password: z.string()
        .min(6, { message: "Password must be at least 6 characters long" }),

    lastname: z.string()
        .trim()
        .max(15, { message: "Last name cannot exceed 15 characters" })
});


// POST has req body 
userRouter.post('/signup',async(req,res)=>{
    
    try {
        const {username,password,firstname,lastname} = req.body
        const zodValidationResult = signupSchema.safeParse(req.body)
        
        if (!zodValidationResult.success) {
            res.status(411).json({
                message: "Validation failed",
                errors: zodValidationResult.error.errors
            })
            return
        }
    
        const existingUser = await User.findOne({username})
        if (existingUser) {
            return res.status(411).json({
                message: "Email already taken"
            })
        }
    
        const newUser = await User.create({
            username,
            password,
            firstname,
            lastname
        })
        
        const token = jwt.sign({userId: newUser._id }, process.env.JWT_SECRET);

        // giving users random balance 
        const account = await Account.create({
            userId:newUser._id,
            balance:1 + Math.round(Math.random()*10000)
        })
    
        res.json({
            message: "User created successfully",
            token: token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
})


const signinSchema = z.object({
    username: z.string()
        .email({ message: "Invalid email format" })
        .max(30, { message: "Username cannot exceed 30 characters" }),

    password: z.string()
        .min(6, { message: "Password must be at least 6 characters long" })
});


userRouter.post('/signin',async(req,res)=>{
    
    try {
        const {username,password} = req.body
        const zodValidationResult = signinSchema.safeParse(req.body)
        
        if (!zodValidationResult.success) {
            return res.status(411).json({
                message: "Validation failed !",
                errors:zodValidationResult.error.errors
            })
        }
    
        const existingUser = await User.findOne({username})
        if (!existingUser) {
            return res.status(411).json({
                message: "New user! signup first .."
            })
        }
    
        if (password !== existingUser.password) {
            return res.status(411).json({
                message: "Invalid Password!"
            })
        }

    
        const token = jwt.sign({userId:existingUser._id}, process.env.JWT_SECRET);
    
        res.json({
            token: token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
})

const updateSchema = z.object({
    
    firstname: z.string()
        .trim()
        .min(1, { message: "First name is required" })
        .max(15, { message: "First name cannot exceed 15 characters" }),

    password: z.string()
        .min(6, { message: "Password must be at least 6 characters long" }),

    lastname: z.string()
        .trim()
        .max(15, { message: "Last name cannot exceed 15 characters" })
}).partial();

userRouter.put('/',authMiddleware,async(req,res)=>{
    try {
        const zodValidationResult = updateSchema.safeParse(req.body)
        if (!zodValidationResult.success) {
            return res.status(411).json({
                message: "Invalid input!",
                errors:zodValidationResult.error.errors
            })
        }
        // console.log(req.body)
        // console.log(req.userId)
        // req.userId 😡😡❌❌  
        const result = await User.updateOne({_id:req.body.userId},req.body)
        console.log(result)
        res.json({
            message: "Updated successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
})

userRouter.get('/bulk', authMiddleware, async (req, res) => {
    try {
        const filter = req.query.filter || ''  // if two falsy value then or operator chooses last one in javascript 
        const users = await User.find({
            $or: [
                { firstname: { '$regex': filter, '$options': 'i' } }, // Case-insensitive search
                { lastname: { '$regex': filter, '$options': 'i' } }
            ]
        });

        res.status(200).json({
            users: users.map((user) => ({
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                _id: user._id
            }))
        }); 

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
});


export default userRouter;

// Extra

// // 🔹 `z.optional()` - Makes a schema property optional (can be omitted or undefined)
// const userSchema = z.object({
//     username: z.string().min(3),  // Required
//     email: z.string().email().optional(),  // Optional
// });
// /*
// ✔ Works: { username: "John" }
// ✔ Works: { username: "John", email: "john@example.com" }
// ❌ Error: {} (username is required)
// */

// // 🔹 `z.partial()` - Makes all schema properties optional (useful for partial updates)
// const updateUserSchema = z.object({
//     username: z.string().min(3),
//     email: z.string().email(),
//     password: z.string().min(6),
// }).partial();
// /*
// ✔ Works: {} (Valid because all fields are optional)
// ✔ Works: { username: "Alice" }
// ✔ Works: { email: "alice@example.com" }
// */

// // 🔹 Mongoose Update - Updates only provided fields, keeping others unchanged
// const updatedUser = await User.findByIdAndUpdate(
//     req.user.id, 
//     { $set: req.body }, // Only updates provided fields
//     { new: true, runValidators: true } // Returns updated user & validates input
// );
// /*
// - If req.body = { username: "NewName" }, only 'username' updates, other fields remain unchanged.
// */

// // 🔹 Object Rest Operator (...) - Extract known properties & capture remaining properties
// const user = {
//     id: 1,
//     name: "John Doe",
//     email: "john@example.com",
//     age: 25,
//     country: "USA"
// };

// const processUser = ({ name, email, ...rest }) => {
//     console.log("Name:", name);      // Extracted Property
//     console.log("Email:", email);    // Extracted Property
//     console.log("Other Properties:", rest); // Captures remaining properties
// };

// processUser(user);
// /*
// ✔ Output:
// Name: John Doe
// Email: john@example.com
// Other Properties: { id: 1, age: 25, country: 'USA' }
// */

// // 🔹 `Object.entries()` - Looping over all object properties dynamically
// const processObject = (obj) => {
//     for (const [key, value] of Object.entries(obj)) {
//         console.log(`${key}: ${value}`);
//     }
// };

// processObject(user);
// /*
// ✔ Output:
// id: 1
// name: John Doe
// email: john@example.com
// age: 25
// country: USA
//

