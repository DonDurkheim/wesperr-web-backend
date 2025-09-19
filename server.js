import express from "express";
import cors from 'cors';

import waitlistRouter from './routes/waitlist.route.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', waitlistRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error', error: err.message });
});

app.listen(3000, () => {
    console.log('Server listening at port 3000...');
});