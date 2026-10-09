const UserService = require("../services/userService");
const jwt = require("jsonwebtoken");


// Register User 
const registerUser = async (req, res, next) => {
    try{
        const {
            username,
            email,
            password,
            role
        } = req.body;

        const newUser = await UserService.registerUser({
            username, 
            email,
            password,
            role,
        });

        const userResponse = newUser.toObject();
        delete userResponse.password;

        return res.status(201).json({
            message: `User Created successfully`,
            user: userResponse
        });

    }catch(error){
        next(error);

    }
}


// Login User 
const loginUser = async ( req, res, next ) => {
    try{
        const user = await UserService.loginUser(
            {
                email: req.body.email,
                password: req.body.password
            }
        );

         // Generate JWT
        const token = jwt.sign(
            {
                userId: user._id
            },
                
            process.env.JWT_SECRET,
    
            {
                expiresIn: "7d"
            }
        );

        const userResponse = user.toObject();
        delete userResponse.password;

        return res.status(200).json({
            message: `Login successfull`,
            token,
            user: userResponse
        });

    }catch(error){
        next(error);
    }
}


// Get All user
const getAllUsers = async (req, res, next) => {
    try{
        const users = await UserService.getAllUsers();

        const userResponse = users.map((user) => {
            const userObject = user.toObject();
            delete userObject.password;

            return userObject;
        });

        return res.status(200).json({
            message: `All Users fetched successfully`,
            user: userResponse
        });

    }catch(error){
        next(error);

    }
}


// Get User BY ID
const getUserById = async (req, res, next) => {
    try{
        const user = await UserService.getUserById(
            req.params.id
        );

        if(!user){
            return res.status(404).json({
                message: `User not found`
            });
        }

        const userResponse = user.toObject();
        delete userResponse.password;

        return res.status(200).json({
            message: `User fetched successfully`,
            user: userResponse
        });

    }catch(error){
        next(error);

    }
}


// Update User
const updateUser = async (req, res, next) => {
    try{
        const updatedUser = await UserService.updateUserById(
            req.params.id,
            req.body,
        );

        if(!updatedUser){
            return res.status(404).json({
                message: `User not found`
            });
        }

        const userResponse = updatedUser.toObject();
        delete userResponse.password;

        return res.status(200).json({
            message: `User updated successfully`,
            user: userResponse
        });

    }catch(error){
        next(error);

    }
}


// Delete User 
const deleteUser = async (req, res, next) => {
    try{
        const deletedUser = await UserService.deleteUserById(
            req.params.id,
            
        );

         if(!deletedUser){
            return res.status(404).json({
                message: `User not found`
            });
        }

        const userResponse = deletedUser.toObject();
        delete userResponse.password;

        return res.status(200).json({
            message: `User Deleted successfully`,
            user: userResponse
        });

    }catch(error){
        next(error);

    }
}


module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}