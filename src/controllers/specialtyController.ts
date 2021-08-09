import type { NextFunction, Request, Response } from 'express';
import Specialty from '../schemas/specialtySchema';

class SpecialtyController {
    getSpecialties = async (
        _req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const specialties = await Specialty.find({});
            res.json(specialties);
        } catch (err) {
            next(err);
        }
    };
}

export default new SpecialtyController();
