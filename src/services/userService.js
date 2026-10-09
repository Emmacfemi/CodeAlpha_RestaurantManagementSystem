const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");


// Create User
const registerUser = async (userData) => {
    const email = userData.email.toLowerCase().trim();
    const username = userData.username.toLowerCase().trim();

    // Check for existing
    const existingEmail = await UserModel.findOne({
        email
    });

    if(existingEmail){
        throw new Error("Email already in use");
    }

    // check for existing username
    const existingUsername = await UserModel.findOne({
        username
    });

    if(existingUsername){
        throw new Error("Username has already been taken")
    }

    // Generate hash password
    const salt = await bcrypt.genSalt(13);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const newUser = new UserModel({
        email,
        username,
        password: hashedPassword
    });

    await newUser.save();

    return newUser;
}


// Login User 
const loginUser = async (data) => {
    const email = data.email.toLowerCase().trim();

    // find user 
    const user = await UserModel.findOne({
        email
    });

    if(!user){
        throw new Error(`Invalid email or password`);
    }

    // compare password
    const comparePassword = await bcrypt.compare(
        data.password, 
        user.password
    );

    if(!comparePassword){
        throw new Error(`Invalid email or Password`)
    }

    return user;
}


// Get User by Email
const getUserByEmail = async (email) => {
    const normalizedEmail = email.toLowerCase().trim();
    
    const user = await UserModel.findOne({
        email: normalizedEmail
    });

    return user;
}


// Get user By Id
const getUserById = async (id) => {
    const user = await UserModel.findById(
        id
    );

    return user
}


// Get All Users 
const getAllUsers = async (page = 1, limit = 10) => {
    page = Math.max(1, Number(page) || 1);
    limit = Math.min(100, Math.max(1, Number(limit) || 10));

    const skip = (page - 1) * limit;

    const users = await UserModel.find({})
                                .select("-password")
                                .sort({createdAt: -1})
                                .skip(skip)
                                .limit(limit)
            
    return users;

}


// Update User
const updateUserById = async (id, data) => {
    const user = await UserModel.findById(
        id,        
    );

    if(!user){
        return null;
    }

    const updateData = {
        ...data
    }

    // Check email uniqueness
    if(updateData.email){
        updateData.email = updateData.email.toLowerCase().trim()

        const existingEmail = await UserModel.findOne({
            email: updateData.email,
            _id: {
                $ne: id
            }
        });

        if(existingEmail){
            throw new Error(`Email already in use`);
        }

    }

    // Check username uniqueness
    if(updateData.username){
        updateData.username = updateData.username.toLowerCase().trim()

        const existingUsername = await UserModel.findOne({
            username: updateData.username,
            _id: {
                $ne: id
            }

        });

        if(existingUsername){
            throw new Error(`Username already taken`);
        }
    }

    // Hash password if password is updated
    if(updateData.password){
        const salt = await bcrypt.genSalt(13);

        updateData.password = await bcrypt.hash(
            updateData.password,
            salt
        );
    }

    // Not allowing ordincary profile updates to change role
    delete updateData.role;


    const updatedUser = await UserModel.findByIdAndUpdate(
        id,
        data,

        {
            new: true,
            runValidators: true
        }
    ).select("-password");

    return updatedUser;
}


// Delete User
const deleteUserById = async (id) => {
    const user = await UserModel.findById(id);

    const deletedUser = await UserModel.findByIdAndDelete(
        id
    )

    return deletedUser;
}


module.exports = {
    registerUser,
    loginUser,
    getUserById,
    getUserByEmail,
    getAllUsers,
    updateUserById,
    deleteUserById
}