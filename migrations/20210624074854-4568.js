require('dotenv').config();
const bcrypt = require('bcrypt');

const SUPER_ADMIN_PASSWORD = 'Secret123!';
module.exports = {
    async up(db) {
        try {
            console.log('Migration started....');
            const pass = await bcrypt.hash(
                process.env.AUTH_PASS_PREFIX + SUPER_ADMIN_PASSWORD,
                +process.env.AUTH_PASS_SALT_ROUNDS,
            );
            await db.collection('users').insertOne({
                firstName: 'super',
                lastName: 'admin',
                email: 'super-admin@gmail.com',
                role: 'super-admin',
                password: pass,
            });
            console.log('Migration completed successfully');
        } catch (err) {
            console.log('Migration failed:', err.message);
        }
    },
};
