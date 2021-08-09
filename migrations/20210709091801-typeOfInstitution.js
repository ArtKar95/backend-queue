module.exports = {
    async up(db) {
        try {
            console.log('Migration started....');
            await db
                .collection('institutiontypes')
                .insertMany([
                    { name: 'Polyclinic' },
                    { name: 'Clinic' },
                    { name: 'Dental Clinic' },
                    { name: 'Medical Center' },
                    { name: 'Ophtalmological Center' },
                    { name: 'Oncological Center' },
                    { name: 'Psychological Center' },
                    { name: 'Diagnostic Center' },
                    { name: 'Medical Aesthetic Center' },
                    { name: "Children's Rehabilitation Center" },
                    { name: 'Care center' },
                    { name: 'Hospital' },
                    { name: 'Maternity Hospital' },
                    { name: 'Psychiatric Hospital' },
                    { name: 'Laboratory' },
                ]);
            console.log('Migration completed successfully');
        } catch (err) {
            console.log('Migration failed:', err.message);
        }
    },
};
