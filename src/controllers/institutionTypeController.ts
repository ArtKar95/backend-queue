import InstitutionType from '../schemas/institutionTypeSchema';
import type { NextFunction, Request, Response } from 'express';

class InstitutionTypeController {
    getAll = async (
        _req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const institutionTypes = await InstitutionType.find();
            res.status(200).json(institutionTypes);
        } catch (err) {
            next(err);
        }
    };
}
export default new InstitutionTypeController();
