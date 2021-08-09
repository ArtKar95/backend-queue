import mongoose, { Schema } from 'mongoose';
import type { ISpecialty } from '../types/model';

const specialtySchema = new Schema<ISpecialty>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
});

export default mongoose.model<ISpecialty>('Specialty', specialtySchema);
