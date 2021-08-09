import Institution from '../schemas/institutionSchema';
import Group from '../schemas/groupSchema';
import type { NextFunction, Request, Response } from 'express';
import { customErrors } from '../config/customErrors';
import mongoose from 'mongoose';

class InstitutionController {
    getAll = async (
        _req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const institutions = await Institution.find();
            if (!institutions) throw customErrors.institutionNotFound;
            res.status(200).json(institutions);
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
            const institution = new Institution(req.body);
            institution.creator = res.locals.userId;
            if (res.locals.avatar) {
                institution.logo = res.locals.avatar.name;
            }
            const data = await institution.save();
            const groupId = data.group;
            const institutionId = data.id;
            await Group.findByIdAndUpdate(
                groupId,
                {
                    $push: { institutions: institutionId },
                },
                { runValidators: true, new: true, useFindAndModify: false },
            );
            res.status(201).json(data);
        } catch (err) {
            next(err);
        }
    };

    getOwnInstitutions = async (
        _req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const institutions = await Institution.find({
                creator: res.locals.userId,
            });
            res.json(institutions);
        } catch (err) {
            next(err);
        }
    };
    update = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        const session = await mongoose.startSession();
        try {
            session.startTransaction();
            const updatedInstitution = { ...req.body };
            if (res.locals.avatar)
                updatedInstitution.logo = res.locals.avatar.name;
            const oldGroup = await Group.findOne({
                institutions: { $in: [req.params.id] },
            });
            const institution = await Institution.findByIdAndUpdate(
                req.params.id,
                updatedInstitution,
                { new: true },
            ).session(session);
            if (!institution) throw customErrors.institutionNotFound;
            if (!oldGroup._id.equals(req.body.group)) {
                await Group.findByIdAndUpdate(oldGroup._id, {
                    $pull: { institutions: req.params.id },
                }).session(session);
                await Group.findByIdAndUpdate(req.body.group, {
                    $push: { institutions: req.params.id },
                }).session(session);
            }
            await session.commitTransaction();
            res.json(institution);
        } catch (err) {
            await session.abortTransaction();
            next(err);
        } finally {
            session.endSession();
        }
    };

    deleteInstitution = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        const session = await mongoose.startSession();
        try {
            await session.startTransaction();
            const institution = await Institution.findOneAndRemove(
                {
                    _id: req.params.id,
                    creator: res.locals.userId,
                },
                { runValidators: true, new: true, useFindAndModify: false },
            ).session(session);
            if (!institution) throw customErrors.institutionNotFound;
            const group = await Group.updateOne(
                { _id: institution.group },
                {
                    $pull: { institutions: req.params.id },
                },
                { multi: true },
            ).session(session);
            if (group.nModified === 0) {
                throw customErrors.institutionNotFound;
            }
            await session.commitTransaction();
            res.json({ success: true });
        } catch (err) {
            await session.abortTransaction();
            next(err);
        } finally {
            session.endSession();
        }
    };

    getSingle = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const institution = await Institution.findById(req.params.id);
            if (!institution) throw customErrors.institutionNotFound;
            res.json(institution);
        } catch (err) {
            next(err);
        }
    };
}
export default new InstitutionController();
