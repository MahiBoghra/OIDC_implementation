// Path: src\app.js
import express from 'express';
import authRouter from './auth/auth.routes.js';
import OIDCRouter from './OIDC/OIDC_route.js';
import { authMiddleware } from './auth/auth.middleware.js';
import { getUserInfo } from './auth/auth.service.js';

const app = express();

// Middleware to parse JSON payloads
app.use(express.json());

// Register Auth Routes
app.use('/auth', authRouter);

// Root level /getme route to support direct http://localhost:3000/getme userinfo requests
app.get('/getme', authMiddleware, async (req, res) => {
    try {
        const userInfo = await getUserInfo(req.user.id);
        return res.status(200).json(userInfo);
    } catch (err) {
        console.error('Error in root-level getme route:', err);
        if (err.message === 'User not found') {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(500).json({ error: 'Internal server error' });
    }
});

app.use('/' , OIDCRouter);

export default app;
