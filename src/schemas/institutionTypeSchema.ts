import mongoose, { Schema } from 'mongoose';
import type { IInstitutionType } from '../types/model';

const InstitutionTypeSchema = new Schema<IInstitutionType>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
});
export default mongoose.model<IInstitutionType>(
    'InstitutionType',
    InstitutionTypeSchema,
);
