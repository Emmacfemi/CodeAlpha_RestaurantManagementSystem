
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        // Get the authorization header
        const authHeader = req.headers.authorization;

        // Check whether the token exists and uses Bearer format
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Access denied. No token provided."
            });
        }

        // Extract the token
        const token = authHeader.split(" ")[1];

        // Verify the token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Attach the authenticated user's ID to the request
        req.user = {
            Id: decoded.userId
        };

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token."
        });
    }
};

module.exports = authMiddleware;