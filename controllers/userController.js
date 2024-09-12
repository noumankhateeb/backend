const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//signup user
const signupUser = async (req, res) => {
    const { firstname, lastname, email, password, retypePassword, dob, phone } = req.body

    // check if all fields are provided
    if (!firstname || !lastname || !email || !password || !retypePassword || !dob || !phone) {
        return res.status(400).json({ error: 'All fields are required' })
    }

    // check if password and retypePassword match
    if (password !== retypePassword) {
        return res.status(400).json({ error: 'Passwords do not match' })
    }

    // check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
        return res.status(400).json({ error: 'User already exists' })
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // create and save user
    try {
        const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            dob,
            phone
        })

        // generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

        // Remove password before sending the response
        const userWithoutPassword = user.toObject()
        delete userWithoutPassword.password

        res.status(201).json({ message: 'User created successfully', token, user: userWithoutPassword })
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' })
    }

}

//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required' })
    }

    // check if user exists
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' })
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return res.status(400).json({ error: 'Invalid email or password' })
    }

    // generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

    // Remove password before sending the response
    const userWithoutPassword = user.toObject()
    delete userWithoutPassword.password

    res.status(200).json({ message: 'Login successful', token, user: userWithoutPassword })
}


// edit user profile
const editUserProfile = async (req, res) => {
    const { id } = req.user;  // Assumes JWT middleware sets req.user
    const { firstname, lastname, email, dob, phone } = req.body;

    if (!firstname && !lastname && !email && !dob && !phone) {
        return res.status(400).json({ error: 'At least one field is required to update' });
    }

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'Email is already in use' });
            }
            user.email = email;
        }

        if (firstname) user.firstname = firstname;
        if (lastname) user.lastname = lastname;
        if (dob) user.dob = dob;
        if (phone) user.phone = phone;

        const updatedUser = await user.save();

        const userWithoutPassword = updatedUser.toObject();
        delete userWithoutPassword.password;

        res.status(200).json({ message: 'Profile updated successfully', user: userWithoutPassword });
    } catch (error) {
        res.status(500).json({ error: 'Error updating profile' });
    }
};

module.exports = { signupUser, loginUser, editUserProfile }