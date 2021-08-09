import mongoose, { Schema } from 'mongoose';
import type { IDivision } from '../types/model';

const divisionSchema = new Schema<IDivision>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
});
export default mongoose.model<IDivision>('Division', divisionSchema);
