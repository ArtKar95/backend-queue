module.exports = {
    async up(db) {
        try {
            console.log('Migration started....');
            await db
                .collection('divisions')
                .insertMany([
                    { name: 'Allergy' },
                    { name: 'Audiology' },
                    { name: 'Cardiology' },
                    { name: 'Contact Lens' },
                    { name: 'Dermatology' },
                    { name: 'Endocrinology & Diabetes' },
                    { name: 'Gastroenterology' },
                    { name: 'General Surgery' },
                    { name: 'Internal Medicine – General & Geriatrics' },
                    { name: 'Laboratory' },
                    { name: 'Neurology' },
                    { name: 'Obstetrics and Gynecology' },
                    { name: 'Ophthalmology' },
                    { name: 'Orthopedics' },
                    { name: 'Otolaryngology (ENT)' },
                    { name: 'Pediatrics' },
                    { name: 'Physiatry' },
                    { name: 'Physical Therapy' },
                    { name: 'Podiatry' },
                    { name: 'Radiology' },
                    { name: 'Rheumatology' },
                    { name: 'Urgent Care' },
                    { name: 'Urology' },
                ]);
            console.log('Migration completed successfully');
        } catch (err) {
            console.log('Migration failed:', err.message);
        }
    },
};
