const jwt = require("jsonwebtoken");
require("dotenv").config();

// Token Creation upon Login
module.exports.createAccessToken = (user) => {
    const data = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
    }

    return jwt.sign(data, process.env.JWT_SECRET_KEY, {});
}

module.exports.verify = (req, res, next) => {
    let token = req.headers.authorization;

    if(typeof token === "undefined"){
        return res.send({
            code: "TOKEN-NOT-DETECTED",
            message: "Please login to do this action."
        })
    }else{
        console.log(token);
        token = token.slice(7, token.length);

        jwt.verify(token, process.env.JWT_SECRET_KEY, 
            function(err, decodedToken){
                if(err){
                    return res.send({
                        auth: "Authentication Failed!",
                        message: err.message
                    })
                }else{
                    req.user = decodedToken;
                    next();
                }
            }
        );
    }
}

// Middleware to verify the token
module.exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get the token from the Authorization header

    if (!token) {
        return res.status(401).send({
            code: "UNAUTHORIZED",
            message: "No token provided. Please log in."
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({
                code: "FORBIDDEN",
                message: "Failed to authenticate token."
            });
        }

        req.user = decoded;  // Attach the user info to the request object
        next();  // Proceed to the next middleware or route handler
    });
};