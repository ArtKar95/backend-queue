import Group from '../schemas/groupSchema';
import mongoose from 'mongoose';
import Institution from '../schemas/institutionSchema';
import type { NextFunction, Request, Response } from 'express';
import { customErrors } from '../config/customErrors';

class GroupController {
    getAllGroups = async (
        _req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const groups = await Group.find();
            res.json(groups);
        } catch (err) {
            next(err);
        }
    };

    deleteGroup = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        const session = await mongoose.startSession();
        await session.startTransaction();
        try {
            const { id } = req.params;
            const group = await Group.findById(id).session(session);
            await Institution.deleteMany({
                _id: { $in: group.institutions },
            }).session(session);
            await Group.findByIdAndDelete(id).session(session);
            if (!group) throw customErrors.groupNotFound;
            await session.commitTransaction();
            res.json({ success: true });
        } catch (err) {
            await session.abortTransaction();
            next(err);
        } finally {
            session.endSession();
        }
    };
    update = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const group = await Group.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true },
            );
            if (!group) throw customErrors.groupNotFound;
            await group.save();
            res.json(group.toObject());
        } catch (err) {
            next(err);
        }
    };
    getOwnGroups = async (
        _req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const groups = await Group.find({
                creator: res.locals.userId,
            }).populate({
                path: 'institutions',
            });
            res.json(groups);
        } catch (err) {
            next(err);
        }
    };
    getSingleGroup = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const group = await Group.findById(req.params.id).populate({
                path: 'institutions',
            });
            if (!group) throw customErrors.groupNotFound;
            res.json(group);
        } catch (err) {
            next(err);
        }
    };
    create = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const group = new Group(req.body);
            group.creator = res.locals.userId;
            if (res.locals.avatar) {
                group.logo = res.locals.avatar.name;
            }
            await group.save();
            res.status(201).json(group);
        } catch (err) {
            next(err);
        }
    };
}
export default new GroupController();
