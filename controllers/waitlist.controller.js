import db from '../config/db.js';

async function addToWaitlist(req, res) {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: 'Name and Email are required' });
    }
    try {
        try {
            await db.run('INSERT INTO waitlist (name, email) VALUES (?, ?)', [name, email]);
            res.status(201).json({ message: 'Successfully joined the waitlist' });
        } catch (error) {
            if (error.message.includes('UNIQUE constraint failed')) {
                return res.status(400).json({ message: 'This email is already on the waitlist' });
            }
            console.error('Database insertion error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    } catch (error) {
        console.error('Database operation error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

async function getWaitlist(req, res) {
    try {
        const waitlist = await db.all('SELECT * FROM waitlist');
        res.status(200).json(waitlist);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function deleteFromWaitlist(req, res) {
    const { id } = req.params;
    try {
        await db.run('DELETE FROM waitlist WHERE id = ?', [id]);
        res.status(200).json({ message: 'Email removed from waitlist' });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

export { addToWaitlist, getWaitlist, deleteFromWaitlist };
