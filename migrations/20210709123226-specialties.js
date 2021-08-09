module.exports = {
    async up(db) {
        try {
            console.log('Migration started....');

            await db
                .collection('specialties')
                .insertMany([
                    { name: 'Anesthesiologist' },
                    { name: 'Allergist' },
                    { name: 'Cardiologist' },
                    { name: 'Dermatologist' },
                    { name: 'Endocrinologist' },
                    { name: 'Gastroenterologist' },
                    { name: 'Hematologist' },
                    { name: 'Gynecologist' },
                    { name: 'Neurologist' },
                    { name: 'Oncologist' },
                    { name: 'Ophthalmologist' },
                    { name: 'Pathologist' },
                    { name: 'Pediatrician' },
                    { name: 'Physiatrist' },
                    { name: 'Plastic Surgeon' },
                    { name: 'Radiologist' },
                    { name: 'Rheumatologist' },
                    { name: 'Pulmonologist' },
                    { name: 'Urologist' },
                    { name: 'Dentist' },
                    { name: 'Bacteriologist' },
                    { name: 'Endoscopist' },
                    { name: 'Geneticist' },
                    { name: 'Hepatologist' },
                    { name: 'Infectionist' },
                    { name: 'Kinesiologist' },
                    { name: 'Therapeutist' },
                    { name: 'Logopedist' },
                    { name: 'Psychologist' },
                    { name: 'Laboratory assistant' },
                    { name: 'Medical sexologist' },
                    { name: 'Narcologist' },
                    { name: 'Neonatologist' },
                    { name: 'Pediatric Surgeon' },
                    { name: 'Maxillofacial Surgeon' },
                    { name: 'Traumatologist-orthopedist' },
                    { name: 'Obstetrician' },
                    { name: 'Sonographer' },
                    { name: 'Geneticist' },
                ]);
            console.log('Migration completed successfully');
        } catch (err) {
            console.log('Migration failed:', err.message);
        }
    },
};
