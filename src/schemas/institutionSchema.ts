import mongoose, { Schema } from 'mongoose';
import type { IInstitution } from '../types/model';
import beautifyUnique from 'mongoose-beautiful-unique-validation';
const { ObjectId } = Schema.Types;
const InstitutionSchema = new Schema<IInstitution>({
    name: {
        type: String,
        required: true,
        unique: 'An institution called ({VALUE}) already exists',
    },
    email: {
        type: String,
        trim: true,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    logo: {
        type: String,
    },
    group: {
        type: ObjectId,
        ref: 'Group',
        required: true,
    },
    creator: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
});

InstitutionSchema.plugin(beautifyUnique);
export default mongoose.model<IInstitution>('Institution', InstitutionSchema);
