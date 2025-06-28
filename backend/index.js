import app from './app.js';
import db from './db/db.config.js';

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        // 🔍 Test DB connection
        await db.raw('SELECT 1+1 AS result');
        console.log('✅ Connected to database');

        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });

    } catch (err) {
        console.error('❌ Failed to connect to database:', err.message);
        process.exit(1); // Exit process if DB connection fails
    }
}

startServer();
