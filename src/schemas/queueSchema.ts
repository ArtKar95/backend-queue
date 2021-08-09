import mongoose, { Schema } from 'mongoose';
import type { IQueue } from './../types/model';

const QueueSchema = new Schema<IQueue>({
    code: {
        type: String,
        required: true,
    },
    institution: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Institution',
    },
    status: {
        type: String,
        enum: ['pending', 'ready', 'completed'],
        default: 'pending',
        required: true,
    },
});
export default mongoose.model<IQueue>('Queue', QueueSchema);
