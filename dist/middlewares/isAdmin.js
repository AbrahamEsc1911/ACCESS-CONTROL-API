"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const isAdmin = (req, res, next) => {
    try {
        if (req.tokenData.role !== 'admin') {
            return res.status(400).json({
                success: false,
                message: 'you are not allowed'
            });
        }
        next();
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'You are not allowed'
        });
    }
};
exports.isAdmin = isAdmin;
