const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require("express-async-handler");
const { getUserByEmail } = require('./user');

const register = async (userData) => {
    const { password, ...rest } = userData;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                ...rest,
                password: hashedPassword
            }
        });
        return newUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

const login = asyncHandler(async (userData) => {
    try {
        if (!userData.email || !userData.password) {
            return { error: 'Email and password are required' };
        }

        const user = await getUserByEmail(userData.email);
        if (!user) {
            return { error: 'Invalid email ' };
        }

        const match = await bcrypt.compare(userData.password, user.password);
        if (!match) {
            return { error: 'Invalid  password' };
        }

        const accessToken = jwt.sign(
            { user: { id: user.id, role: user.role } },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );
        const userInfo = { ...user, password: undefined };
        return { userInfo, accessToken };
    } catch (error) {
        console.error('Error logging in:', error);
        throw new Error('An unexpected error occurred. Please try again later.');
    }
});



module.exports = { register, login };
