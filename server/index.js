import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import User from './models/User.js';
import FoodItem from './models/FoodItem.js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL, () => {
    console.log('Connected to MongoDB');
})

// api routes starts here

app.post('/signup', async (req, res) => {
    const { name, phone, email, password, role } = req.body;

    // validation to check if all fields are filled starts here
    const emptyFields = [];

    if (!name) emptyFields.push('name');
    if (!phone) emptyFields.push('phone');
    if (!email) emptyFields.push('email');
    if (!password) emptyFields.push('password');
    if (!role) emptyFields.push('role');

    if (emptyFields.length > 0) {
        return res.json({
            success: false,
            message: `${emptyFields.join(', ')} are required`
        })
    }
    // validation to check if all fields are filled ends here

    // validation to check if email already exists starts here
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        return res.json({
            success: false,
            message: "Email already exists"
        })
    }
    // validation to check if email already exists ends here

    // validation to check if phone already exists starts here
    const existingUserPhone = await User.findOne({ phone: phone });
    if (existingUserPhone) {
        return res.json({
            success: false,
            message: "Phone already exists"
        })
    }
    // validation to check if phone already exists ends here

    const user = new User({
        name: name,
        phone: phone,
        email: email,
        password: password,
        role: role
    })

    const savedUser = await user.save();

    res.json({
        success: true,
        message: "User created successfully",
        data: savedUser
    })
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.json({
            success: false,
            message: "Email and password are required"
        })
    }

    const existingUser = await User.findOne({ email: email, password: password });

    if(existingUser){
        return res.json({
            success: true,
            message: "Login successful",
            data: existingUser
        })
    }
    else
    {
        return res.json({
            success: false,
            message: "Invalid email or password"
        })
    }
})

app.post("/createFoodItem", async(req, res)=>{
    const {title, description, imgUrl, price, category} = req.body;

    const foodItem = new FoodItem({
        title: title,
        description: description,
        imgUrl: imgUrl,
        price: price,
        category: category
    })

    const savedFoodItem = await foodItem.save();

    res.json({
        success: true,
        message: "Food Item created successfully",
        data: savedFoodItem
    })
})

// http://localhost:5000/foodItemsByCategory?category=pizz
app.get("/foodItemsByCategory", async(req, res)=>{
  const {category} = req.query;

  const foodItems = await FoodItem.find({
    category: {$regex: category, $options: 'i'}
  })

    res.json({
        success: true,
        message: "Food Items fetched successfully",
        data: foodItems
    })
})

// http://localhost:5000/foodItems?title=pizza

app.get("/foodItems", async(req, res)=>{
    const {title} = req.query;

    const foodItems = await FoodItem.find({
        title: {$regex: title, $options: 'i'}
    })

    res.json({
        success: true,
        message: "Food Items fetched successfully",
        data: foodItems
    })
})

// api routes ends here

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

