import express from 'express';
import router from './routes/whomtocall.web.route.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/web', router);

export default app;