const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving users' });
    }
};

const getUserByEmail = async (email) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });
        return user;
    } catch (error) {
        throw error;
    }
};
const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id }
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving user' });
    }
};

const createUser = async (req, res) => {
    const { email,  password, role } = req.body;

    try {
        if(email ==="" || password === "" || role === ""){
            return res.status(400).json({ error: 'All fields are required' });
        }
        const existEmail = getUserByEmail(email)
        if(existEmail){
            return res.status(400).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role
            }
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { email, name, password, role } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({
            where: { id }
        });
        if (!existingUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        const updatedData = {};
        if (email) updatedData.email = email;
        if (password) updatedData.password = await bcrypt.hash(password, 10);
        if (role) updatedData.role = role;

        const updatedUser = await prisma.user.update({
            where: { id },
            data: updatedData
        });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Error updating user' });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const existingUser = await prisma.user.findUnique({
            where: { id }
        });
        if (!existingUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        await prisma.user.delete({
            where: { id }
        });
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user' });
    }
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser, getUserByEmail };
