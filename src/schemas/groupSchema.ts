import mongoose, { Schema } from 'mongoose';
import type { IGroup } from '../types/model';
import beautifyUnique from 'mongoose-beautiful-unique-validation';

const { ObjectId } = Schema.Types;
const GroupSchema = new Schema<IGroup>({
    name: {
        type: String,
        required: true,
        unique: 'An organization called ({VALUE}) already exists',
    },
    institutions: [{ type: ObjectId, ref: 'Institution' }],
    logo: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    creator: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
});

GroupSchema.plugin(beautifyUnique);

export default mongoose.model('Group', GroupSchema);
