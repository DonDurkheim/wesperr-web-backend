import express from "express";
import cors from 'cors';

import waitlistRouter from './routes/waitlist.route.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', waitlistRouter);
app.use('/db', async (req, res) => {
  await db.exec(`
            CREATE TABLE IF NOT EXISTS waitlist (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
`);
  
})

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error', error: err.message });
});

app.listen(3000, () => {
  
    console.log('Server listening at port 3000...');
});
