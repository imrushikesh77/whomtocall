import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import router from './routes/whomtocall.web.route.js';

const app = express();

// rate limiter middleware
const limiter = rateLimit({
    windowMs: 30 * 1000, // 30 seconds
    max: 5, // limit each IP to 5 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    keyGenerator: (req) => {
        return req.ip + (req.body?.user_id || ''); // custom logic: IP + user
    },
    message: {
        status: 429,
        error: 'Too many requests, please try again later.',
    }
});

app.use(limiter);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/web', router);

export default app;