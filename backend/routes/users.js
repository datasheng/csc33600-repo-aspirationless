import express from 'express';
import bcrypt from 'bcrypt';
import db from '../db.js';

const router = express.Router();

// REGISTER (signup)
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json("Please fill in all fields.");
        }

        const checkQuery = "SELECT * FROM user WHERE user_email = ?";
        db.query(checkQuery, [email], async (err, data) => {
            if (err) return res.status(500).json("Database error.");
            if (data.length > 0) return res.status(400).json("User already exists!");

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const insertQuery = `
                INSERT INTO user (user_name, user_email, user_password)
                VALUES (?, ?, ?)
            `;
            db.query(insertQuery, [username, email, hashedPassword], (err, result) => {
                
                if (err) {
                    console.error("Detailed error:", err.message);
                    return res.status(500).json("Error creating user.");
                }

                return res.status(201).json("User has been created successfully!");
            });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json("Server error.");
    }
});

// LOGIN
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const q = "SELECT * FROM user WHERE user_email = ?";
    db.query(q, [email], async (err, data) => {
        if (err) return res.status(500).json("Database error.");
        if (data.length === 0) return res.status(404).json("User not found!");

        const user = data[0];

        const isPasswordCorrect = await bcrypt.compare(password, user.user_password);

        if (!isPasswordCorrect) {
            return res.status(400).json("Wrong password!");
        }

        res.status(200).json({
            message: "Login successful!",
            user: {
                id: user.user_ID,
                name: user.user_name,
                email: user.user_email
            }
        });
    });
});

export default router;