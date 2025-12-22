const { check, validationResult } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
exports.postLogin = async(req, res) => {
    console.log("login request received");
    const {email, password} = req.body;
    console.log("email",email)
    const user=await User.findOne({email:email});
    console.log("user",user)
     if(!user){
        return res.status(422).json({
            message: "User not found",})
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(422).json({
            message: "Invalid credentials",
            isLoggedIn: false})
    }
    req.session.isLoggedIn = true;
    req.session.user = {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
    };
    console.log('Session data:', req.session);
    await req.session.save();
    console.log('Session saved with ID:', req.session.id);
    return res.status(200).json({
        message: "Login successful",
        user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }
    });
}
exports.postLogout = (req, res) => {
    req.session.destroy((err)=>{
        if(err){
            return res.status(500).json({ message: "Logout failed" });
        }
        res.status(200).json({
        message: "Logout successful"
        })
    });
}
exports.postsignup =[
    check('firstName')
    .trim()
    .isLength({min:2})
    .withMessage("first name must be 2 length long ")
    .matches(/^[A-Za-z]+$/)
    .withMessage("first name contains only alphabets "),

    check('lastName')
    .matches(/^[A-Za-z]*$/)
    .withMessage("second name must contains alphabets "),

    check('email')
    .isEmail()
    .withMessage("enter valid email ")
    .normalizeEmail(),

    check('password')
    .isLength({min:8})
    .withMessage("Passwaord must be 8 character long ")
    .matches(/[A-Z]/)
    .withMessage('password must contain atleast one upper case ')
    .matches(/[a-z]/)
    .withMessage('password must contain atleast one lower case ')
    .matches(/[0-9]/)
    .withMessage('password must contain atleast one alphabet ')
    .trim(),

    check('confirmPassword')
    .trim()
    .custom((value,{req})=>{
        if(value!== req.body.password){
            throw new Error("password donot match ")
        }
        return true
    }),
    (req, res) => {
        const { firstName, lastName, email, password } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ message: errors.array().map(err => err.msg) });
        }
        else{
            User.findOne({ email: email })
                .then(existingUser => {
                if (existingUser)  return res.status(422).json({ message: ["Email already exists" ]});
                
                return bcrypt.hash(password, 12)
                    .then(hashedPassword => {
                        const user = new User({
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            password: hashedPassword,
                    });
                return user.save().then(() => {
                        return res.status(200).json({ message: "signup successful" ,
                        user: {
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email
                        }
                    });
                })
                .catch(err => {
                    console.error('Error saving user:', err);
                    res.status(500).json({ error: 'Internal server error' });
                });
            
                })
                
            })
            .catch(err => {
                console.error('Error finding user:', err);
                res.status(500).json({ error: 'Internal server error' });
            });
        }
    }
]